import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { sendEmail, sendAdminNotification } from "@/lib/email";
import { forwardToCRM } from "@/lib/crm-webhook";
import { rateLimit } from "@/lib/ratelimit";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  service: z.string().optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const rl = await rateLimit("contact", request, { limit: 5, windowSec: 3600 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const data = contactSchema.parse(body);

    await db.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    });

    await sendEmail(
      data.email,
      "We received your message — Backup Solutions",
      `<h2>Thanks for reaching out, ${data.name}!</h2><p>We've received your message and will get back to you within 24 hours.</p><p>— The Backup Solutions Team</p>`
    );

    await sendAdminNotification("contact", {
      Name: data.name,
      Email: data.email,
      Phone: data.phone || "N/A",
      Company: data.company || "N/A",
      Service: data.service || "N/A",
      Message: data.message,
    });

    // Forward to Alpha CRM (non-blocking, fire-and-forget)
    forwardToCRM({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      service: data.service,
      message: data.message,
      formType: "CONTACT",
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
