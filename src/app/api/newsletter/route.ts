import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { sendWelcomeEmail } from "@/lib/email";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

const rateLimit = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const limit = rateLimit.get(ip);

    if (limit && limit.resetAt > now && limit.count >= 10) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    if (!limit || limit.resetAt <= now) {
      rateLimit.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    } else {
      limit.count++;
    }

    const body = await request.json();
    const { email } = schema.parse(body);

    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ success: true, message: "Already subscribed!" });
    }

    await prisma.newsletterSubscriber.create({ data: { email } });
    await sendWelcomeEmail(email);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
