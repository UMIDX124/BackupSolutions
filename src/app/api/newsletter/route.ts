import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { sendWelcomeEmail } from "@/lib/email";
import { forwardToCRM } from "@/lib/crm-webhook";
import { rateLimit } from "@/lib/ratelimit";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(request: Request) {
  try {
    const rl = await rateLimit("newsletter", request, { limit: 10, windowSec: 3600 });
    if (!rl.success) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    const body = await request.json();
    const { email } = schema.parse(body);

    await db.newsletterSubscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });
    await sendWelcomeEmail(email);

    // Forward to Alpha CRM (non-blocking, fire-and-forget)
    forwardToCRM({
      name: "Newsletter Subscriber",
      email,
      formType: "NEWSLETTER",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
