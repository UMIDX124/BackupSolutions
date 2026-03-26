// In-memory store for form submissions
// Replace with a real database (Neon Postgres, Supabase, etc.) for production persistence

interface AuditSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  createdAt: Date;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

interface NewsletterSubscriber {
  id: string;
  email: string;
  createdAt: Date;
}

class InMemoryDB {
  auditSubmissions: AuditSubmission[] = [];
  contactSubmissions: ContactSubmission[] = [];
  newsletterSubscribers: NewsletterSubscriber[] = [];

  createAuditSubmission(data: Omit<AuditSubmission, "id" | "createdAt">) {
    const submission = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    this.auditSubmissions.push(submission);
    console.log("[DB] Audit submission saved:", submission.email);
    return submission;
  }

  createContactSubmission(data: Omit<ContactSubmission, "id" | "createdAt">) {
    const submission = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    this.contactSubmissions.push(submission);
    console.log("[DB] Contact submission saved:", submission.email);
    return submission;
  }

  createNewsletterSubscriber(email: string) {
    const existing = this.newsletterSubscribers.find((s) => s.email === email);
    if (existing) {
      return existing;
    }
    const subscriber = {
      id: crypto.randomUUID(),
      email,
      createdAt: new Date(),
    };
    this.newsletterSubscribers.push(subscriber);
    console.log("[DB] Newsletter subscriber saved:", email);
    return subscriber;
  }
}

const globalForDB = globalThis as unknown as { db: InMemoryDB | undefined };
export const db = globalForDB.db ?? new InMemoryDB();

if (process.env.NODE_ENV !== "production") {
  globalForDB.db = db;
}
