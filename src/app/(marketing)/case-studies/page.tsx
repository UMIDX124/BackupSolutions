import { Metadata } from "next";
import Link from "next/link";
import { getAllCaseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore real results from real partnerships. See how Backup Solutions has transformed businesses through enterprise-grade technology solutions.",
};

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-6">
            Case Studies
          </h1>
          <p className="text-warm-gray text-lg md:text-xl max-w-2xl mx-auto">
            Real results from real partnerships. Explore how we&apos;ve helped
            businesses overcome complex challenges and achieve measurable
            growth.
          </p>
        </div>
      </section>

      {/* Case Study Grid */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="block bg-surface rounded-xl overflow-hidden border border-border group hover:border-amber/30 transition-colors duration-300"
            >
              {/* Industry Tag */}
              <div className="p-6 pb-0">
                <span className="text-xs font-mono tracking-wider uppercase text-amber bg-background/60 px-3 py-1 rounded-full">
                  {study.industry}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-amber transition-colors duration-300">
                  {study.title}
                </h2>

                <p className="text-warm-gray text-sm leading-relaxed line-clamp-2 mb-6">
                  {study.challenge}
                </p>

                {/* Results Metrics Row */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {study.results.slice(0, 3).map((result) => (
                    <div key={result.metric} className="text-center">
                      <p className="text-amber font-bold text-lg font-display">
                        {result.value}
                      </p>
                      <p className="text-xs text-warm-gray mt-1">
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
      </section>
    </>
  );
}
