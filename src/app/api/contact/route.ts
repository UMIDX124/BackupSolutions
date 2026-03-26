import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { sendEmail, sendAdminNotification } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const rateLimit = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const limit = rateLimit.get(ip);

    if (limit && limit.resetAt > now && limit.count >= 5) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    if (!limit || limit.resetAt <= now) {
      rateLimit.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    } else {
      limit.count++;
    }

    const body = await request.json();
    const data = contactSchema.parse(body);

    await prisma.contactSubmission.create({ data });

    await sendEmail(
      data.email,
      "We received your message — Backup Solutions",
      `<h2>Thanks for reaching out, ${data.name}!</h2><p>We've received your message and will get back to you within 24 hours.</p><p>— The Backup Solutions Team</p>`
    );

    await sendAdminNotification("contact", {
      Name: data.name,
      Email: data.email,
      Message: data.message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
