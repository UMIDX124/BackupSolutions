/**
 * Rate limiter with graceful degradation.
 *
 * Uses @upstash/ratelimit over Upstash Redis when env vars are present.
 * Falls back to in-memory Map (best-effort under serverless scaling).
 */

type LimitOptions = { limit: number; windowSec: number };
type LimitResult = { success: boolean; remaining: number; resetAt: number };

let upstashClient: unknown = null;
let upstashTried = false;

async function getUpstash() {
  if (upstashTried) return upstashClient;
  upstashTried = true;
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return null;
  }
  try {
    const { Redis } = await import("@upstash/redis").catch(() => ({
      Redis: null,
    }));
    if (!Redis) return null;
    upstashClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
    return upstashClient;
  } catch {
    return null;
  }
}

const memoryBuckets = new Map<string, { count: number; resetAt: number }>();

function memoryLimit(bucketKey: string, opts: LimitOptions): LimitResult {
  const now = Date.now();
  const windowMs = opts.windowSec * 1000;
  const existing = memoryBuckets.get(bucketKey);

  if (!existing || existing.resetAt < now) {
    const resetAt = now + windowMs;
    memoryBuckets.set(bucketKey, { count: 1, resetAt });
    return { success: true, remaining: opts.limit - 1, resetAt };
  }

  if (existing.count >= opts.limit) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    success: true,
    remaining: opts.limit - existing.count,
    resetAt: existing.resetAt,
  };
}

let lastCleanup = 0;
function maybeCleanupMemory() {
  const now = Date.now();
  if (now - lastCleanup < 60000) return;
  lastCleanup = now;
  for (const [k, v] of memoryBuckets.entries()) {
    if (v.resetAt < now) memoryBuckets.delete(k);
  }
}

export function getClientIp(req: Request): string {
  const fwd =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "anon";
  return fwd.split(",")[0].trim();
}

export async function rateLimit(
  namespace: string,
  req: Request,
  opts: LimitOptions
): Promise<LimitResult> {
  maybeCleanupMemory();
  const bucketKey = `${namespace}:ip:${getClientIp(req)}`;

  const upstash = (await getUpstash()) as {
    incr: (key: string) => Promise<number>;
    expire: (key: string, sec: number) => Promise<unknown>;
    pttl: (key: string) => Promise<number>;
  } | null;

  if (upstash) {
    try {
      const count = await upstash.incr(bucketKey);
      if (count === 1) {
        await upstash.expire(bucketKey, opts.windowSec);
      }
      const ttl = await upstash.pttl(bucketKey);
      const resetAt = Date.now() + (ttl > 0 ? ttl : opts.windowSec * 1000);
      const success = count <= opts.limit;
      return { success, remaining: Math.max(0, opts.limit - count), resetAt };
    } catch {
      // Fall through to memory
    }
  }

  return memoryLimit(bucketKey, opts);
}
