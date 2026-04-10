import { NextResponse } from "next/server";
import { z } from "zod";
import { forwardTicketToCRM } from "@/lib/crm-webhook";
import { sendAdminNotification } from "@/lib/email";
import { rateLimit } from "@/lib/ratelimit";

const supportSchema = z.object({
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  priority: z.enum(["Low", "Medium", "High", "Critical"]),
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export async function POST(request: Request) {
  try {
    const rl = await rateLimit("support", request, { limit: 5, windowSec: 3600 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const data = supportSchema.parse(body);

    await sendAdminNotification("support", {
      Subject: data.subject,
      Priority: data.priority,
      Name: data.name,
      Email: data.email,
      Description: data.description,
    });

    // Forward to Alpha CRM tickets webhook (non-blocking)
    forwardTicketToCRM({
      subject: data.subject,
      description: data.description,
      priority: data.priority,
      clientEmail: data.email,
      clientName: data.name,
      channel: "WEBSITE_FORM",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    console.error("Support form error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
