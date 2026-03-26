import { Metadata } from "next";
import Link from "next/link";
import { getAllGuides } from "@/lib/guides";
import { Shield, Layers, Brain } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Free Guides",
  description: "In-depth guides on web security, tech stack selection, AI implementation, and more from Backup Solutions.",
};

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-8 h-8" />,
  Layers: <Layers className="w-8 h-8" />,
  Brain: <Brain className="w-8 h-8" />,
};

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <Breadcrumbs items={[{ label: "Guides" }]} />

      <div className="mt-8 mb-16">
        <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">
          Free <span className="text-gradient">Guides</span>
        </h1>
        <p className="text-lg text-warm-gray max-w-2xl">
          Comprehensive, actionable guides from our team. No fluff, no gating — just real knowledge
          from years of building enterprise technology.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group bg-surface rounded-xl border border-border hover:border-amber/30 transition-all p-8"
          >
            <div className="w-14 h-14 rounded-lg bg-amber/10 text-amber flex items-center justify-center mb-6 group-hover:bg-amber/20 transition-colors">
              {iconMap[guide.icon] || <Layers className="w-8 h-8" />}
            </div>
            <h2 className="text-xl font-display font-semibold mb-3 group-hover:text-amber transition-colors">
              {guide.title}
            </h2>
            <p className="text-warm-gray text-sm mb-4 line-clamp-3">{guide.excerpt}</p>
            <span className="text-xs font-mono text-warm-gray">{guide.readTime}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
