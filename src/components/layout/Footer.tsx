import Link from "next/link";
import { Mail, MapPin, ArrowRight } from "lucide-react";

const services = [
  { label: "Web Architecture", href: "/services/web-architecture" },
  { label: "Software Engineering", href: "/services/software-engineering" },
  { label: "AI Modeling", href: "/services/ai-modeling" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Results", href: "/results" },
  { label: "Contact", href: "/contact" },
  { label: "Support", href: "/support" },
];

const resources = [
  { label: "Blog", href: "/blog" },
  { label: "Guides", href: "/guides" },
  { label: "Tools", href: "/tools" },
  { label: "Research", href: "/research" },
];

export default function Footer() {
  return (
    <footer className="bg-warm-dark">
      {/* ── Top Section: Link Columns ── */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-warm-gray transition hover:text-amber"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber">
              Company
            </h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-warm-gray transition hover:text-amber"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber">
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-warm-gray transition hover:text-amber"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber">
              Connect
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@backupsolutions.com"
                  className="inline-flex items-center gap-2 text-sm text-warm-gray transition hover:text-amber"
                >
                  <Mail className="h-4 w-4" />
                  hello@backupsolutions.com
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-sm text-warm-gray">
                <MapPin className="h-4 w-4" />
                Lahore, Pakistan
              </li>
              <li>
                <Link
                  href="/support"
                  className="inline-flex items-center gap-2 text-sm text-warm-gray transition hover:text-amber"
                >
                  Submit a Support Ticket
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Middle Section: Newsletter ── */}
      <div className="border-y border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:justify-between lg:px-8">
          <p className="font-display text-lg font-medium text-warm-white">
            Stay in the loop
          </p>

          <form
            action="/api/newsletter"
            method="POST"
            className="flex w-full max-w-md items-center gap-2"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="h-11 flex-1 rounded-lg border border-border bg-surface px-4 text-sm text-warm-white placeholder:text-warm-gray focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
            />
            <button
              type="submit"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-amber px-5 text-sm font-semibold text-background transition hover:bg-amber/90"
            >
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* ── Bottom Section: Copyright & Legal ── */}
      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-warm-gray">
            &copy; 2026 Backup Solutions LLC. Founded 2018. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-warm-gray">
            <Link
              href="/privacy-policy"
              className="transition hover:text-amber"
            >
              Privacy Policy
            </Link>
            <span className="text-border">|</span>
            <Link
              href="/terms-of-service"
              className="transition hover:text-amber"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
