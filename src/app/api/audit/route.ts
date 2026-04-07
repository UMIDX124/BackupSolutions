import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { sendAuditConfirmation, sendAdminNotification } from "@/lib/email";
import { forwardToCRM } from "@/lib/crm-webhook";

const auditSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

const rateLimit = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const limit = rateLimit.get(ip);

    if (limit && limit.resetAt > now && limit.count >= 3) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    if (!limit || limit.resetAt <= now) {
      rateLimit.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    } else {
      limit.count++;
    }

    const body = await request.json();
    const data = auditSchema.parse(body);

    db.createAuditSubmission(data);
    await sendAuditConfirmation(data.name, data.email);
    await sendAdminNotification("audit", {
      Name: data.name,
      Email: data.email,
      Company: data.company || "N/A",
      Phone: data.phone || "N/A",
      Message: data.message || "N/A",
      Source: data.source || "Direct",
    });

    // Forward to Alpha CRM (non-blocking, fire-and-forget)
    // BSL has in-memory DB only — CRM is the persistent store!
    forwardToCRM({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      message: data.message || "Security audit request",
      service: "Security Audit",
      formType: "audit",
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    console.error("Audit form error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
