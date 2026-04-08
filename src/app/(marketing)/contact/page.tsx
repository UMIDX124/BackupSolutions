import { Metadata } from "next";
import { Mail, MapPin, Clock, Users } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Backup Solutions. Reach out for enterprise technology services, consultations, or partnership inquiries. 24/7 support available.",
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@backupsolutions.tech",
    href: "mailto:hello@backupsolutions.tech",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Lahore, Pakistan",
    href: null,
  },
  {
    icon: Clock,
    label: "Availability",
    value: "24/7 Support Available",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-amber mb-6">
            Get in Touch
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-gradient mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-warm-gray max-w-2xl mx-auto">
            Have a project in mind? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="py-12 pb-24 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Contact Form */}
          <div className="bg-surface rounded-xl p-8 border border-border">
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Send Us a Message
            </h2>
            <p className="text-warm-gray mb-8">
              Fill out the form below and we&apos;ll get back to you within 24
              hours.
            </p>
            <ContactForm />
          </div>

          {/* Right - Company Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 bg-surface rounded-xl p-6 border border-border"
                  >
                    <div className="w-12 h-12 rounded-lg bg-surface-secondary flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-amber" />
                    </div>
                    <div>
                      <p className="text-sm text-warm-gray mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-foreground font-medium hover:text-amber transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Founder Direct Contact */}
            <div className="bg-surface rounded-xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-surface-secondary flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Founder Direct Contact
                </h3>
              </div>
              <p className="text-warm-gray mb-6">
                Reach our founders directly for partnership inquiries and
                strategic discussions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-secondary border border-amber/30 flex items-center justify-center shrink-0">
                    <span className="text-amber font-display text-sm font-bold">
                      MF
                    </span>
                  </div>
                  <div>
                    <p className="text-foreground font-medium">
                      M Faizan Rafiq
                    </p>
                    <p className="text-warm-gray text-sm">Co-Founder</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-secondary border border-amber/30 flex items-center justify-center shrink-0">
                    <span className="text-amber font-display text-sm font-bold">
                      FM
                    </span>
                  </div>
                  <div>
                    <p className="text-foreground font-medium">
                      Faizan Ali Malik
                    </p>
                    <p className="text-warm-gray text-sm">Co-Founder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
