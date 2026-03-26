---
title: "Building Secure Authentication Systems: Lessons from the Trenches"
excerpt: "Authentication seems simple until it isn't. After building auth systems for dozens of applications, here are the hard-won lessons about what works, what breaks, and what keeps security engineers up at night."
category: "security-performance"
tags: ["authentication", "security", "OAuth", "JWT", "web security"]
date: "2024-10-22"
author: "faizan-ali-malik"
lastModified: "2024-10-22"
featured: false
---

# Building Secure Authentication Systems: Lessons from the Trenches

Let me tell you about the worst security incident I've ever been involved in. It was 2019, and a client's application was leaking user sessions. Not because of some sophisticated attack — because someone had set the session cookie's `SameSite` attribute to `None` without the `Secure` flag during a "quick fix" three months earlier.

Thousands of sessions exposed. A one-line mistake.

Authentication is one of those areas where the gap between "it works" and "it's secure" can be enormous. And the consequences of getting it wrong? They keep you up at night.

I've built authentication systems for everything from small startups to enterprise platforms. Here's what I've learned the hard way.

## The Fundamentals People Skip

Every time I audit an authentication system, I find the same foundational issues. It's not the fancy stuff that gets people in trouble. It's the basics.

### Password Storage

In 2024, I still encounter applications storing passwords with MD5. MD5! That was considered insecure in 2004. Twenty years ago.

Here's the only acceptable approach:

```
bcrypt (cost factor 12+) or Argon2id
```

That's it. Not SHA-256. Not SHA-512 with a salt. Not your custom hashing scheme. bcrypt or Argon2id. Full stop.

Why? Because these algorithms are intentionally slow. They're designed to make brute-force attacks computationally expensive. SHA-256 is fast by design — great for data integrity, terrible for password storage.

```typescript
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
```

### Session Management

Sessions seem simple. User logs in, gets a token, presents it with each request. What could go wrong?

A lot, actually.

**Session tokens must be:**
- Cryptographically random (not sequential, not UUIDs v1)
- Sufficiently long (at least 128 bits of entropy)
- Transmitted only over HTTPS
- Stored with appropriate cookie flags (`HttpOnly`, `Secure`, `SameSite=Strict`)
- Expired after a reasonable period
- Invalidated on logout (yes, this seems obvious, but I've seen systems that don't do it)

**The cookie flags matter more than you think:**

```
Set-Cookie: session_id=abc123;
  HttpOnly;
  Secure;
  SameSite=Strict;
  Path=/;
  Max-Age=3600
```

- `HttpOnly`: JavaScript can't access the cookie. This prevents XSS attacks from stealing sessions.
- `Secure`: Cookie only sent over HTTPS. Prevents interception on HTTP connections.
- `SameSite=Strict`: Cookie not sent with cross-origin requests. Prevents CSRF attacks.

Every single one of these matters. Skip one, and you've got a vulnerability.

## JWT: The Good, The Bad, and The Misunderstood

JWTs (JSON Web Tokens) are everywhere now, and honestly, they're misused more often than they're used correctly.

### When JWTs Make Sense

- Stateless authentication across microservices
- Short-lived access tokens in OAuth flows
- Single sign-on (SSO) implementations
- When you genuinely need the payload data on the client

### When JWTs Don't Make Sense

- Simple single-server applications (use server-side sessions instead)
- When you need to revoke tokens instantly (JWTs are stateless — you can't invalidate them without adding state back)
- As long-lived session tokens (they can't be revoked!)

### Common JWT Mistakes

**Mistake #1: Storing sensitive data in the payload**

JWTs are encoded, not encrypted. Anyone can decode a JWT and read its contents. Don't put passwords, credit card numbers, or sensitive personal information in there.

**Mistake #2: Not validating the algorithm**

This is a classic vulnerability. Some libraries accept the `alg: "none"` header, which means no signature verification. Always explicitly specify the expected algorithm:

```typescript
import jwt from 'jsonwebtoken';

// BAD — accepts whatever algorithm the token says
const decoded = jwt.verify(token, secret);

// GOOD — explicitly specifies the algorithm
const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
```

**Mistake #3: Excessively long expiration times**

I've seen JWTs with 30-day expiration periods. That's 30 days where a stolen token gives full access with no way to revoke it. Keep access tokens short-lived (15 minutes is a good default) and use refresh tokens for extending sessions.

**Mistake #4: Storing JWTs in localStorage**

localStorage is accessible to any JavaScript running on the page. One XSS vulnerability, and every session token in localStorage is compromised.

Store access tokens in memory (JavaScript variables) and refresh tokens in HttpOnly cookies. It's more complex to implement but significantly more secure.

## OAuth 2.0: The Right Way

OAuth is the standard for third-party authentication, and it's powerful when implemented correctly. But the spec is complex, and I've seen some creative misinterpretations.

### The Authorization Code Flow (with PKCE)

For web and mobile applications, use the Authorization Code flow with PKCE (Proof Key for Code Exchange). Not the Implicit flow. Not the Password Grant. Authorization Code with PKCE.

The Implicit flow was deprecated for good reasons — it exposes tokens in URL fragments. The Password Grant sends credentials directly to your application, which defeats the purpose of OAuth.

Here's the simplified flow:

1. Generate a code verifier and code challenge (PKCE)
2. Redirect user to the authorization server with the code challenge
3. User authenticates and consents
4. Authorization server redirects back with an authorization code
5. Your server exchanges the code + code verifier for tokens
6. The authorization server validates the PKCE and returns tokens

### Token Storage and Refresh

```typescript
interface TokenPair {
  accessToken: string;  // Short-lived, stored in memory
  refreshToken: string; // Long-lived, stored in HttpOnly cookie
}

async function refreshAccessToken(refreshToken: string): Promise<TokenPair> {
  const response = await fetch('/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    // Refresh token is invalid or expired
    // Force re-authentication
    throw new AuthenticationError('Session expired');
  }

  return response.json();
}
```

### Refresh Token Rotation

This is something that should be standard but isn't always implemented. Every time a refresh token is used, issue a new one and invalidate the old one. This way, if a refresh token is stolen and used by an attacker, the legitimate user's next request will fail (because their token was invalidated), alerting them to the compromise.

## Multi-Factor Authentication

MFA isn't optional anymore. It just isn't. Even the best password policy in the world can't protect against credential stuffing attacks when users reuse passwords across services.

### TOTP (Time-Based One-Time Passwords)

This is the standard — apps like Google Authenticator and Authy generate six-digit codes that change every 30 seconds.

Implementation is straightforward:

1. Generate a secret key during MFA setup
2. Share it with the user via QR code
3. Verify TOTP codes against the secret during login
4. Store backup codes for account recovery

**Critical detail**: always allow a time window of +/- 1 step (30 seconds). Clock drift is real, and users shouldn't be locked out because their phone's clock is 15 seconds off.

### WebAuthn / Passkeys

This is the future. Hardware security keys and biometric authentication via WebAuthn are phishing-resistant by design. The private key never leaves the device, and the authentication is tied to the specific domain.

We're seeing rapid adoption of passkeys across major platforms, and I'd strongly recommend supporting them as an MFA option if not a primary authentication method.

## Rate Limiting and Brute Force Protection

Your authentication endpoints are the most attacked surfaces of your application. They need protection beyond just "check the password."

### Login Attempt Throttling

```typescript
interface LoginAttempt {
  count: number;
  lastAttempt: Date;
  lockedUntil?: Date;
}

function shouldAllowLogin(attempts: LoginAttempt): boolean {
  if (attempts.lockedUntil && new Date() < attempts.lockedUntil) {
    return false;
  }

  return true;
}

function getDelayMs(failedAttempts: number): number {
  // Exponential backoff: 0, 1s, 2s, 4s, 8s, 16s...
  if (failedAttempts <= 1) return 0;
  return Math.min(1000 * Math.pow(2, failedAttempts - 2), 30000);
}
```

### Account Lockout Policy

After N failed attempts (we typically use 5), lock the account temporarily. But be careful — account lockout can be abused for denial-of-service attacks. An attacker can intentionally lock out legitimate users.

Mitigation strategies:
- Lock based on IP + username combination, not just username
- Use CAPTCHA after 3 failed attempts instead of immediate lockout
- Implement progressive delays instead of hard lockouts
- Notify the account owner of failed login attempts

## Security Headers

Authentication doesn't exist in isolation. Your security headers form a critical layer of defense:

```
Content-Security-Policy: default-src 'self'; script-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

Each of these headers prevents a specific class of attacks. CSP prevents XSS. X-Frame-Options prevents clickjacking. HSTS enforces HTTPS. They're free to implement and they dramatically reduce your attack surface.

## Logging and Monitoring

You can't detect compromises if you're not watching. Every authentication system should log:

- All login attempts (successful and failed)
- Password changes
- MFA enrollment and removal
- Session creation and termination
- Token refresh events
- Permission changes

And you should have alerts for:
- Spike in failed login attempts
- Login from unusual locations or devices
- Multiple accounts accessed from the same IP
- Password changes followed immediately by data access

## The Checklist

Here's the authentication security checklist we use on every project. It's not exhaustive, but it covers the critical stuff:

- [ ] Passwords hashed with bcrypt (cost 12+) or Argon2id
- [ ] Session tokens are cryptographically random with sufficient entropy
- [ ] All cookies have HttpOnly, Secure, and SameSite flags
- [ ] JWTs have short expiration (15 minutes or less for access tokens)
- [ ] Refresh token rotation is implemented
- [ ] Rate limiting on all authentication endpoints
- [ ] MFA is available and encouraged
- [ ] Password reset tokens are single-use and time-limited
- [ ] All authentication events are logged
- [ ] Security headers are configured
- [ ] HTTPS is enforced everywhere
- [ ] Account lockout with abuse prevention

## Wrapping Up

Authentication is one of those things that seems straightforward until you start thinking about all the ways it can go wrong. The difference between a secure auth system and a vulnerable one often comes down to a handful of implementation details — cookie flags, token expiration, password hashing algorithms.

The good news? The patterns are well-established. You don't need to invent anything new. You just need to implement the known best practices correctly and completely.

That one-line cookie flag mistake I mentioned at the beginning? It took five minutes to fix but could've been prevented entirely if someone had followed a security checklist during the original implementation. Build security into your process, not as an afterthought.

And if you're thinking, "Maybe we should just use a third-party auth provider" — honestly, for most applications, that's a perfectly valid choice. Services like Auth0, Clerk, and Firebase Auth handle the complexity so you don't have to. There's no shame in using them. The goal isn't to build authentication from scratch. The goal is to keep your users safe.
