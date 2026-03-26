import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getComparisonBySlug, getAllComparisons } from "@/lib/comparisons";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSchema from "@/components/seo/FAQSchema";

export function generateStaticParams() {
  return getAllComparisons().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return { title: "Comparison Not Found" };
  return {
    title: comparison.title,
    description: comparison.excerpt,
    openGraph: { title: comparison.title, description: comparison.excerpt },
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <Breadcrumbs
        items={[
          { label: "Compare", href: "/research" },
          { label: comparison.title },
        ]}
      />

      <div className="mt-8 mb-12">
        <h1 className="text-3xl lg:text-4xl font-display font-bold mb-4">
          {comparison.title}
        </h1>
        <p className="text-lg text-warm-gray">{comparison.excerpt}</p>
      </div>

      {/* Side by side comparison */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {[comparison.optionA, comparison.optionB].map((option, idx) => (
          <div key={idx} className="bg-surface rounded-xl border border-border p-8">
            <h2 className="text-2xl font-display font-semibold mb-6 text-amber">
              {option.name}
            </h2>

            <div className="mb-6">
              <h3 className="text-sm font-mono uppercase tracking-wider text-sage mb-3">
                Pros
              </h3>
              <ul className="space-y-2">
                {option.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                    <span className="text-warm-gray">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-red-400 mb-3">
                Cons
              </h3>
              <ul className="space-y-2">
                {option.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-warm-gray">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Verdict */}
      <div className="bg-surface-secondary rounded-xl border border-amber/20 p-8 mb-12">
        <h2 className="text-xl font-display font-semibold mb-4 text-amber">Our Verdict</h2>
        <p className="text-warm-gray leading-relaxed mb-4">{comparison.verdict}</p>
        <p className="text-foreground font-medium">{comparison.recommendation}</p>
      </div>

      {/* FAQs */}
      {comparison.faqs.length > 0 && (
        <div className="mb-16">
          <FAQSchema faqs={comparison.faqs} />
          <h2 className="text-2xl font-display font-semibold mb-6">FAQ</h2>
          <div className="space-y-4">
            {comparison.faqs.map((faq, i) => (
              <div key={i} className="bg-surface rounded-xl border border-border p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-warm-gray text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="text-center">
        <p className="text-warm-gray mb-4">Need help deciding?</p>
        <Link
          href="/free-consultation"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber to-copper text-background font-semibold rounded-lg hover:brightness-110 transition-all"
        >
          Get Expert Advice <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
