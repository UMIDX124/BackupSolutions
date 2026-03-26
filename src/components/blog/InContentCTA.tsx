import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface InContentCTAProps {
  category?: string;
}

export default function InContentCTA({ category }: InContentCTAProps) {
  const ctaText: Record<string, string> = {
    "web-development": "Need a high-performance website?",
    "software-engineering": "Looking for custom software?",
    "ai-machine-learning": "Ready to integrate AI into your business?",
    "cloud-infrastructure": "Need cloud optimization?",
    "business-strategy": "Want to scale your technology?",
    "security-performance": "Concerned about security?",
  };

  const text = category ? ctaText[category] || "Ready to get started?" : "Ready to get started?";

  return (
    <div className="my-10 p-6 bg-gradient-to-r from-amber/10 to-copper/10 rounded-xl border border-amber/20 not-prose">
      <p className="font-display font-semibold text-lg mb-2">{text}</p>
      <p className="text-warm-gray text-sm mb-4">
        Get a free consultation with our team. No strings attached.
      </p>
      <Link
        href="/free-consultation"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber to-copper text-background text-sm font-semibold rounded-lg hover:brightness-110 transition-all"
      >
        Free Consultation <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
