// Forward BSL form submissions to the Alpha CRM webhook.
// Non-blocking — failures must never break the website's own form flow.

const CRM_BASE_URL =
  process.env.CRM_WEBHOOK_URL || "https://fu-corp-crm.vercel.app";
const CRM_SECRET = process.env.CRM_WEBHOOK_SECRET || "";

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

    await fetch(`${CRM_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Secret": CRM_SECRET,
      },
      body: JSON.stringify(body),
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
  await postToCRM("/api/webhook/leads", {
    ...payload,
    source: SOURCE,
    brand: BRAND,
  });
}

export async function forwardTicketToCRM(
  payload: CrmTicketPayload
): Promise<void> {
  await postToCRM("/api/webhook/tickets", {
    ...payload,
    source: SOURCE,
    brand: BRAND,
    channel: payload.channel ?? "WEBSITE_FORM",
  });
}
