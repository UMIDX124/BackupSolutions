// Forward BSL form submissions to the Alpha CRM webhook.
// Non-blocking — failures must never break the website's own form flow.

const CRM_WEBHOOK_URL =
  process.env.CRM_WEBHOOK_URL || "https://fu-corp-crm.vercel.app/api/webhook/lead";

export interface CrmLeadPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
  formType: "chatbot" | "audit" | "contact" | "support" | "newsletter" | "founder" | "consultation" | "ticket";
  qualityScore?: number;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export async function forwardToCRM(payload: CrmLeadPayload): Promise<void> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    await fetch(CRM_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        source: "BSL",
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);
  } catch (err) {
    // Non-blocking — log only, never throw
    console.error("[CRM webhook] forward failed:", err instanceof Error ? err.message : err);
  }
}
