import { Metadata } from "next";
import SupportForm from "./SupportForm";

export const metadata: Metadata = {
  title: "Submit a Support Ticket",
  description:
    "Need help? Open a support ticket with the Backup Solutions team and we'll get back to you as soon as possible.",
  alternates: {
    canonical: "https://backupsolutions.tech/support",
  },
};

export default function SupportPage() {
  return (
    <>
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-amber mb-6">
            Customer Support
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-gradient mb-6">
            Submit a Support Ticket
          </h1>
          <p className="text-xl text-warm-gray max-w-2xl mx-auto">
            Existing customer running into something? Open a ticket and our
            engineering team will pick it up directly.
          </p>
        </div>
      </section>

      <section className="py-12 pb-24 px-4">
        <div className="max-w-2xl mx-auto bg-surface rounded-xl p-8 border border-border">
          <SupportForm />
        </div>
      </section>
    </>
  );
}
