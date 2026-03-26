import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGuideBySlug, getAllGuides } from "@/lib/guides";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSchema from "@/components/seo/FAQSchema";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide Not Found" };
  return {
    title: guide.title,
    description: guide.excerpt,
    openGraph: { title: guide.title, description: guide.excerpt },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <Breadcrumbs
        items={[
          { label: "Guides", href: "/guides" },
          { label: guide.title },
        ]}
      />

      <div className="mt-8 mb-12">
        <span className="text-xs font-mono text-warm-gray">{guide.readTime}</span>
        <h1 className="text-4xl lg:text-5xl font-display font-bold mt-3 mb-4">
          {guide.title}
        </h1>
        <p className="text-lg text-warm-gray">{guide.excerpt}</p>
      </div>

      {/* Table of Contents */}
      <div className="bg-surface rounded-xl border border-border p-6 mb-12">
        <h2 className="text-sm font-mono uppercase tracking-wider text-warm-gray mb-4">
          In This Guide
        </h2>
        <ul className="space-y-2">
          {guide.sections.map((s, i) => (
            <li key={i}>
              <a
                href={`#section-${i}`}
                className="text-amber hover:text-amber-light transition-colors text-sm"
              >
                {i + 1}. {s.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Sections */}
      <div className="space-y-12">
        {guide.sections.map((section, i) => (
          <section key={i} id={`section-${i}`} className="scroll-mt-24">
            <h2 className="text-2xl font-display font-semibold mb-4">
              {section.title}
            </h2>
            <p className="text-warm-gray leading-relaxed">{section.content}</p>
          </section>
        ))}
      </div>

      {/* FAQs */}
      {guide.faqs.length > 0 && (
        <div className="mt-16">
          <FAQSchema faqs={guide.faqs} />
          <h2 className="text-2xl font-display font-semibold mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {guide.faqs.map((faq, i) => (
              <div key={i} className="bg-surface rounded-xl border border-border p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-warm-gray text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 bg-gradient-to-r from-amber/10 to-copper/10 rounded-xl p-8 border border-amber/20 text-center">
        <h2 className="text-2xl font-display font-semibold mb-3">
          Need Help Implementing This?
        </h2>
        <p className="text-warm-gray mb-6">
          Our team can help you put these strategies into action.
        </p>
        <Link
          href="/free-consultation"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber to-copper text-background font-semibold rounded-lg hover:brightness-110 transition-all"
        >
          Get Free Consultation
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
