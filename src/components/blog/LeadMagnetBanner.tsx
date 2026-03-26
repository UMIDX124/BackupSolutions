import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function LeadMagnetBanner() {
  return (
    <div className="mt-16 p-8 lg:p-10 bg-gradient-to-br from-surface via-surface-secondary to-surface rounded-2xl border border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-copper/5 rounded-full blur-3xl" />

      <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-amber" />
            <span className="text-xs font-mono uppercase tracking-wider text-amber">
              Free Resource
            </span>
          </div>
          <h3 className="text-2xl font-display font-bold mb-2">
            Get Your Free Technology Assessment
          </h3>
          <p className="text-warm-gray">
            Our founders will personally review your tech stack and provide actionable
            recommendations — completely free.
          </p>
        </div>
        <Link
          href="/free-consultation"
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber to-copper text-background font-semibold rounded-lg hover:brightness-110 transition-all animate-pulse-glow"
        >
          Claim Free Assessment
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
