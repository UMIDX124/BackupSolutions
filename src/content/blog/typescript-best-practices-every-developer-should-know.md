---
title: "TypeScript Best Practices Every Developer Should Know"
excerpt: "After years of writing TypeScript in production, here are the patterns, pitfalls, and practices that separate good TypeScript code from great TypeScript code."
category: "software-engineering"
tags: ["TypeScript", "JavaScript", "best practices", "type safety", "software development"]
date: "2024-10-07"
author: "m-faizan-rafiq"
lastModified: "2024-10-07"
featured: false
faqs:
  - question: "Should I use TypeScript for every project?"
    answer: "For any project that will be maintained long-term or worked on by multiple developers, yes. For quick prototypes or tiny scripts, vanilla JavaScript is fine. The overhead of TypeScript pays for itself the moment another developer (or future you) needs to understand the code."
  - question: "Is TypeScript slower than JavaScript?"
    answer: "At runtime? No. TypeScript compiles to JavaScript, so there's zero runtime performance difference. During development, the TypeScript compiler adds a build step, but modern tools like esbuild and SWC have made this nearly instantaneous. The slight build-time cost is a negligible trade-off for the benefits."
  - question: "How strict should my TypeScript configuration be?"
    answer: "As strict as your team can handle. Start with 'strict: true' in your tsconfig.json and enable 'noUncheckedIndexedAccess' if you can. Strict mode catches more bugs at compile time. Yes, it means more type annotations upfront, but it saves significantly more debugging time later."
---

# TypeScript Best Practices Every Developer Should Know

I remember the first time I tried TypeScript. It was 2017, and I thought it was just JavaScript with extra bureaucracy. "Why do I need to tell the compiler something it should already know?" I grumbled, wrestling with type annotations that felt like unnecessary paperwork.

Then I spent three hours debugging a runtime error in production that TypeScript would've caught in 3 seconds. That changed my perspective real quick.

Fast forward to today, and I can't imagine writing JavaScript without TypeScript. But here's the thing — writing *good* TypeScript is a very different skill from just *using* TypeScript. I see a lot of code that technically compiles but misses the point entirely.

So here's everything I wish someone had told me years ago.

## Stop Using `any` (Yes, Really)

Let's start with the biggest one. If you're using `any` liberally throughout your codebase, you're essentially paying the TypeScript tax without getting the TypeScript benefits. You've added a build step and type annotations but you're still going to get runtime errors.

```typescript
// This defeats the entire purpose of TypeScript
function processData(data: any): any {
  return data.items.map((item: any) => item.name);
}
```

If you genuinely don't know the type, use `unknown` instead:

```typescript
function processData(data: unknown): string[] {
  if (isDataWithItems(data)) {
    return data.items.map(item => item.name);
  }
  throw new Error('Invalid data format');
}

function isDataWithItems(data: unknown): data is DataWithItems {
  return (
    typeof data === 'object' &&
    data !== null &&
    'items' in data &&
    Array.isArray((data as DataWithItems).items)
  );
}
```

Is it more code? Yes. Does it prevent runtime explosions? Also yes. That's the trade-off, and it's worth it every single time.

### The `any` Escape Hatch

Look, I'm not going to pretend there's never a reason to use `any`. Sometimes you're dealing with a third-party library with bad typings, or you're in the middle of a migration, or you're writing a genuinely generic utility. Fine. But mark it:

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const legacyData: any = getLegacyData();
// TODO: Type this properly when we refactor the legacy module
```

At least this way it's intentional and documented, not accidental.

## Embrace Discriminated Unions

This is the TypeScript pattern that I think delivers the most bang for your buck. Discriminated unions make impossible states impossible, and they make your code self-documenting.

```typescript
// Instead of this mess:
interface ApiResponse {
  data?: User[];
  error?: string;
  loading: boolean;
}
// Where nothing prevents { data: [...], error: "oops", loading: true }

// Do this:
type ApiResponse =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User[] }
  | { status: 'error'; error: string };
```

Now every state is explicit and mutually exclusive. You can't accidentally have data AND an error at the same time. And when you handle this in a switch statement, TypeScript will yell at you if you miss a case:

```typescript
function renderResponse(response: ApiResponse) {
  switch (response.status) {
    case 'idle':
      return null;
    case 'loading':
      return <Spinner />;
    case 'success':
      return <UserList users={response.data} />;
    case 'error':
      return <ErrorMessage message={response.error} />;
  }
}
```

Try adding a new status without handling it here. TypeScript won't let you. That's the power of exhaustive checking.

## Use `const` Assertions and Literal Types

This is one of those features that people don't use enough. `as const` narrows types to their literal values, which is incredibly useful:

```typescript
// Without as const
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
};
// Type: { apiUrl: string; timeout: number; retries: number }

// With as const
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
} as const;
// Type: { readonly apiUrl: "https://api.example.com"; readonly timeout: 5000; readonly retries: 3 }
```

This is especially powerful for configuration objects, action types in Redux, and anywhere you want to prevent accidental mutation.

## Generic Constraints: Be Specific

Generics are powerful, but unconstrained generics are just `any` in disguise. Always add constraints:

```typescript
// Too loose — T could be anything
function getProperty<T>(obj: T, key: string): unknown {
  return (obj as Record<string, unknown>)[key];
}

// Better — T is constrained, key must exist on T
function getProperty<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  return obj[key];
}
```

The second version gives you type safety on both the key and the return type. It's more verbose, but the compiler is actually helping you now instead of just going along with whatever you throw at it.

## Utility Types Are Your Friends

TypeScript ships with a bunch of utility types that most developers underuse. Here are the ones I reach for constantly:

### `Partial<T>` and `Required<T>`

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// For update operations where any field is optional
type UserUpdate = Partial<User>;

// When you need to ensure all fields are present
type CompleteUser = Required<User>;
```

### `Pick<T, K>` and `Omit<T, K>`

```typescript
// Only expose what the API consumer needs
type PublicUser = Pick<User, 'id' | 'name' | 'avatar'>;

// Everything except sensitive fields
type SafeUser = Omit<User, 'email' | 'passwordHash'>;
```

### `Record<K, V>`

```typescript
// Type-safe dictionaries
type UserRoles = Record<string, 'admin' | 'editor' | 'viewer'>;

// Instead of: { [key: string]: 'admin' | 'editor' | 'viewer' }
```

### `ReturnType<T>` and `Parameters<T>`

```typescript
function createUser(name: string, email: string): User {
  // ...
}

// Extract the return type without duplicating it
type CreatedUser = ReturnType<typeof createUser>;

// Extract parameter types
type CreateUserParams = Parameters<typeof createUser>;
// [name: string, email: string]
```

These are incredibly useful when you're working with functions from external libraries where you want to derive types from the actual implementation rather than manually duplicating them.

## Type Narrowing: Let the Compiler Help You

TypeScript's control flow analysis is genuinely impressive. Use it:

```typescript
function processValue(value: string | number | null) {
  if (value === null) {
    // TypeScript knows value is null here
    return 'No value';
  }

  if (typeof value === 'string') {
    // TypeScript knows value is string here
    return value.toUpperCase();
  }

  // TypeScript knows value is number here
  return value.toFixed(2);
}
```

Custom type guards take this further:

```typescript
interface Cat {
  meow(): void;
  purr(): void;
}

interface Dog {
  bark(): void;
  fetch(): void;
}

function isCat(animal: Cat | Dog): animal is Cat {
  return 'meow' in animal;
}

function handleAnimal(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.purr(); // TypeScript knows this is safe
  } else {
    animal.fetch(); // TypeScript knows this is a Dog
  }
}
```

## Error Handling in TypeScript

Here's an area where TypeScript is genuinely opinionated, and I think its opinion is right. Create typed errors:

```typescript
class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number,
    public readonly isOperational: boolean = true
  ) {
    super(message);
    this.name = 'AppError';
  }
}

class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super(
      `${resource} with id ${id} not found`,
      'NOT_FOUND',
      404
    );
  }
}

class ValidationError extends AppError {
  constructor(
    message: string,
    public readonly fields: Record<string, string>
  ) {
    super(message, 'VALIDATION_ERROR', 422);
  }
}
```

Now your error handling is typed and predictable:

```typescript
try {
  const user = await findUser(id);
} catch (error) {
  if (error instanceof NotFoundError) {
    // Handle 404
  } else if (error instanceof ValidationError) {
    // Handle validation, access error.fields
  } else {
    // Unexpected error
    throw error;
  }
}
```

## Configuration and Environment Variables

This one bugs me because almost every TypeScript project I review gets it wrong:

```typescript
// Don't do this
const apiUrl = process.env.API_URL; // string | undefined
// Then use apiUrl without checking — runtime bomb

// Do this instead
const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const config = {
  apiUrl: getEnvVar('API_URL'),
  dbHost: getEnvVar('DB_HOST'),
  port: parseInt(getEnvVar('PORT'), 10),
} as const;

export type Config = typeof config;
export default config;
```

Fail fast, fail loudly. If a required environment variable is missing, you want to know at startup, not when a user hits the affected code path at 3 AM.

## Immutability by Default

Make things `readonly` unless they need to be mutable:

```typescript
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
  readonly features: readonly string[];
}
```

Use `ReadonlyArray<T>` or `readonly T[]` for arrays that shouldn't be modified. Use `Readonly<T>` for objects. This prevents entire categories of bugs where something gets accidentally mutated.

## The Pragmatic Approach

I want to be clear about something: TypeScript is a tool, not a religion. The goal isn't to have the most sophisticated type system possible. The goal is to ship reliable software efficiently.

Some practical guidelines:

- **Don't over-type**: If the compiler can infer it, let it infer it.
- **Don't fight the type system**: If you're writing tons of type assertions, something's wrong with your approach.
- **Start strict, relax when needed**: It's easier to loosen types than to tighten them later.
- **Types are documentation**: If your types are clear, you often don't need comments.

TypeScript won't make bad code good. But it will make good code more reliable, more maintainable, and more enjoyable to work with. And honestly? After you've experienced the joy of a compiler catching bugs before they hit production, you won't want to go back.

That 3-hour debugging session I mentioned at the start? Never again. And that alone makes TypeScript worth every extra character of type annotation.
