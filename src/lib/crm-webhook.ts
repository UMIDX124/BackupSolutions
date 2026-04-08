// Forward BSL form submissions to the Alpha CRM webhook.
// Non-blocking — failures must never break the website's own form flow.

import { createHmac } from "crypto";

const CRM_BASE_URL =
  process.env.CRM_WEBHOOK_URL || "https://fu-corp-crm.vercel.app";
// The HMAC signature via LEAD_WEBHOOK_SECRET is the only authentication
// layer the CRM actually verifies. The old X-Webhook-Secret header was
// dead weight (CRM never checked it) — removed.
const LEAD_SIGNING_SECRET = process.env.LEAD_WEBHOOK_SECRET || "";

export interface CrmLeadPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
  formType:
    | "CONTACT"
    | "AUDIT_REQUEST"
    | "NEWSLETTER"
    | "FOUNDER"
    | "CONSULTATION"
    | "CHATBOT";
  qualityScore?: number;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface CrmTicketPayload {
  subject: string;
  description: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  clientEmail: string;
  clientName: string;
  channel?: "WEBSITE_FORM" | "EMAIL" | "PHONE";
}

const SOURCE = "backupsolutions.tech";
const BRAND = "BSL";

async function postToCRM(path: string, body: unknown): Promise<void> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const serialized = JSON.stringify(body);
    const signature = createHmac("sha256", LEAD_SIGNING_SECRET)
      .update(serialized)
      .digest("hex");

    await fetch(`${CRM_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Signature": `sha256=${signature}`,
      },
      body: serialized,
      signal: controller.signal,
    });

    clearTimeout(timeout);
  } catch (err) {
    console.error(
      `[CRM webhook] ${path} forward failed:`,
      err instanceof Error ? err.message : err
    );
  }
}

export async function forwardToCRM(payload: CrmLeadPayload): Promise<void> {
  await postToCRM("/api/webhook/lead", {
    ...payload,
    source: SOURCE,
    brand: BRAND,
  });
}

export async function forwardTicketToCRM(
  payload: CrmTicketPayload
): Promise<void> {
  await postToCRM("/api/webhook/ticket", {
    ...payload,
    source: SOURCE,
    brand: BRAND,
    channel: payload.channel ?? "WEBSITE_FORM",
  });
}
