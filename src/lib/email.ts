import nodemailer from "nodemailer";

const isEmailConfigured =
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

const transporter = isEmailConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

const fromAddress =
  process.env.EMAIL_FROM || "hello@backupsolutions.tech";
const adminEmail =
  process.env.ADMIN_EMAIL || "hello@backupsolutions.tech";

export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<void> {
  if (!transporter) {
    console.warn(
      `[Email] SMTP not configured. Would have sent "${subject}" to ${to}`
    );
    return;
  }
  await transporter.sendMail({ from: fromAddress, to, subject, html });
}

export async function sendWelcomeEmail(email: string): Promise<void> {
  await sendEmail(
    email,
    "Welcome to Backup Solutions!",
    `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0D0D0D; color: #FAF8F5; padding: 40px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="color: #D4A853; font-size: 28px; margin: 0;">Backup Solutions</h1>
        <p style="color: #A39E96; font-size: 14px;">Enterprise Technology That Never Fails</p>
      </div>
      <h2 style="color: #FAF8F5; font-size: 22px;">Welcome aboard!</h2>
      <p style="color: #A39E96; line-height: 1.6;">
        Thank you for subscribing to our newsletter. You'll receive the latest insights on:
      </p>
      <ul style="color: #A39E96; line-height: 2;">
        <li>Enterprise architecture best practices</li>
        <li>Cloud infrastructure and security</li>
        <li>AI and automation trends</li>
        <li>Case studies and real-world results</li>
      </ul>
      <p style="color: #A39E96; line-height: 1.6;">
        In the meantime, check out our <a href="https://backupsolutions.tech/blog" style="color: #D4A853;">latest blog posts</a>.
      </p>
      <div style="border-top: 1px solid #252220; margin-top: 32px; padding-top: 20px; text-align: center;">
        <p style="color: #A39E96; font-size: 12px;">
          Backup Solutions LLC &bull; Lahore, Pakistan<br/>
          <a href="https://backupsolutions.tech" style="color: #D4A853;">backupsolutions.tech</a>
        </p>
      </div>
    </div>
    `
  );
}

export async function sendAuditConfirmation(
  name: string,
  email: string
): Promise<void> {
  await sendEmail(
    email,
    "Your Free Consultation Request — Backup Solutions",
    `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0D0D0D; color: #FAF8F5; padding: 40px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="color: #D4A853; font-size: 28px; margin: 0;">Backup Solutions</h1>
      </div>
      <h2 style="color: #FAF8F5; font-size: 22px;">Thank you, ${name}!</h2>
      <p style="color: #A39E96; line-height: 1.6;">
        We've received your consultation request. One of our co-founders will personally review
        your project details and reach out within <strong style="color: #D4A853;">24 hours</strong>.
      </p>
      <div style="background: #1A1714; border: 1px solid #252220; border-radius: 12px; padding: 24px; margin: 24px 0;">
        <h3 style="color: #D4A853; margin: 0 0 12px 0; font-size: 16px;">What happens next:</h3>
        <ol style="color: #A39E96; line-height: 2; padding-left: 20px; margin: 0;">
          <li>We review your project requirements</li>
          <li>A co-founder reaches out to schedule a call</li>
          <li>You receive a custom strategy and proposal</li>
        </ol>
      </div>
      <p style="color: #A39E96; line-height: 1.6;">
        No strings attached — this consultation is completely free.
      </p>
      <div style="border-top: 1px solid #252220; margin-top: 32px; padding-top: 20px; text-align: center;">
        <p style="color: #A39E96; font-size: 12px;">
          Backup Solutions LLC &bull; Lahore, Pakistan<br/>
          <a href="mailto:hello@backupsolutions.tech" style="color: #D4A853;">hello@backupsolutions.tech</a>
        </p>
      </div>
    </div>
    `
  );
}

export async function sendAdminNotification(
  type: "audit" | "contact" | "newsletter" | "support",
  data: Record<string, string>
): Promise<void> {
  const subjectMap = {
    audit: "New Consultation Request",
    contact: "New Contact Form Submission",
    newsletter: "New Newsletter Subscriber",
    support: "New Support Ticket",
  };

  const emojiMap = {
    audit: "🔔",
    contact: "📩",
    newsletter: "📧",
    support: "🎫",
  };

  const detailRows = Object.entries(data)
    .map(
      ([key, value]) =>
        `<tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #252220; color: #A39E96; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">${key}</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #252220; color: #FAF8F5; font-size: 14px;">${value}</td>
        </tr>`
    )
    .join("");

  await sendEmail(
    adminEmail,
    `${emojiMap[type]} ${subjectMap[type]}`,
    `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0D0D0D; color: #FAF8F5; padding: 40px;">
      <h1 style="color: #D4A853; font-size: 24px; margin: 0 0 24px 0;">
        ${emojiMap[type]} ${subjectMap[type]}
      </h1>
      <table style="width: 100%; border-collapse: collapse; background: #1A1714; border-radius: 8px; overflow: hidden;">
        ${detailRows}
      </table>
      <p style="color: #A39E96; font-size: 12px; margin-top: 24px;">
        Received at ${new Date().toISOString()} via backupsolutions.tech
      </p>
    </div>
    `
  );
}
