import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
} from "@/lib/case-studies";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const caseStudies = getAllCaseStudies();
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return { title: "Case Study Not Found" };
  }

  return {
    title: study.title,
    description: study.challenge.slice(0, 160),
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const relatedStudies = getAllCaseStudies().filter(
    (s) => s.slug !== study.slug
  );

  return (
    <>
      {/* Breadcrumb */}
      <nav className="pt-28 pb-4 px-4">
        <div className="max-w-4xl mx-auto">
          <ol className="flex items-center gap-2 text-sm text-warm-gray">
            <li>
              <Link
                href="/"
                className="hover:text-amber transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li className="text-border">/</li>
            <li>
              <Link
                href="/case-studies"
                className="hover:text-amber transition-colors duration-200"
              >
                Case Studies
              </Link>
            </li>
            <li className="text-border">/</li>
            <li className="text-foreground truncate max-w-[200px]">
              {study.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-xs font-mono tracking-wider uppercase text-amber bg-background/60 border border-border px-3 py-1 rounded-full mb-6">
            {study.industry}
          </span>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {study.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-sm text-warm-gray">
            <div>
              <span className="text-foreground font-medium">Client:</span>{" "}
              {study.client}
            </div>
            <div>
              <span className="text-foreground font-medium">Duration:</span>{" "}
              {study.duration}
            </div>
            <div>
              <span className="text-foreground font-medium">Year:</span>{" "}
              {study.year}
            </div>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            The Challenge
          </h2>
          <p className="text-warm-gray leading-relaxed text-lg">
            {study.challenge}
          </p>
        </div>
      </section>

      {/* Strategy */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Our Strategy
          </h2>
          <p className="text-warm-gray leading-relaxed text-lg">
            {study.strategy}
          </p>
        </div>
      </section>

      {/* Execution */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            The Execution
          </h2>
          <p className="text-warm-gray leading-relaxed text-lg">
            {study.execution}
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">
            Results
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {study.results.map((result) => (
              <div
                key={result.metric}
                className="bg-surface rounded-xl border border-border p-6"
              >
                <p className="text-amber font-bold text-3xl font-display mb-2">
                  {result.value}
                </p>
                <p className="text-foreground font-medium text-sm mb-1">
                  {result.metric}
                </p>
                <p className="text-warm-gray text-sm leading-relaxed">
                  {result.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-surface-secondary rounded-xl border border-border p-8 md:p-12">
            <blockquote className="text-foreground text-lg md:text-xl font-display leading-relaxed mb-6">
              &ldquo;{study.testimonial.quote}&rdquo;
            </blockquote>
            <div>
              <p className="text-amber font-semibold">
                {study.testimonial.author}
              </p>
              <p className="text-warm-gray text-sm">
                {study.testimonial.role}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono tracking-wider text-warm-gray bg-surface border border-border px-3 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-surface rounded-xl border border-border p-8 md:p-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready for results like these?
            </h2>
            <p className="text-warm-gray mb-8 max-w-lg mx-auto">
              Let&apos;s discuss how we can engineer a solution tailored to your
              business challenges.
            </p>
            <Link
              href="/free-consultation"
              className="inline-block bg-amber text-background px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Book Your Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">
            More Case Studies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedStudies.map((related) => (
              <Link
                key={related.slug}
                href={`/case-studies/${related.slug}`}
                className="block bg-surface rounded-xl overflow-hidden border border-border group hover:border-amber/30 transition-colors duration-300"
              >
                <div className="p-6">
                  <span className="text-xs font-mono tracking-wider uppercase text-amber bg-background/60 px-3 py-1 rounded-full">
                    {related.industry}
                  </span>

                  <h3 className="font-display text-lg font-bold text-foreground mt-4 mb-3 group-hover:text-amber transition-colors duration-300">
                    {related.title}
                  </h3>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {related.results.slice(0, 3).map((result) => (
                      <div key={result.metric} className="text-center">
                        <p className="text-amber font-bold text-sm font-display">
                          {result.value}
                        </p>
                        <p className="text-xs text-warm-gray mt-0.5">
                          {result.metric}
                        </p>
                      </div>
                    ))}
                  </div>

                  <span className="text-sm text-copper group-hover:text-amber transition-colors duration-300 font-medium">
                    Read Case Study →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
