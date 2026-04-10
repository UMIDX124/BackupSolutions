import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { sendAuditConfirmation, sendAdminNotification } from "@/lib/email";
import { forwardToCRM } from "@/lib/crm-webhook";
import { rateLimit } from "@/lib/ratelimit";

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

export async function POST(request: Request) {
  try {
    const rl = await rateLimit("audit", request, { limit: 3, windowSec: 3600 });
    if (!rl.success) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    const body = await request.json();
    const data = auditSchema.parse(body);

    await db.auditSubmission.create({ data });
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
    // Forward to Alpha CRM as well
    forwardToCRM({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      message: data.message || "Security audit request",
      service: "Security Audit",
      formType: "AUDIT_REQUEST",
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
