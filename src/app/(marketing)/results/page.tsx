import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  ShoppingCart,
  Landmark,
  BarChart3,
  GraduationCap,
  Heart,
  Truck,
  Code,
  DollarSign,
  Clock,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Results",
  description:
    "Proven results from real projects. See how Backup Solutions delivers measurable growth, performance, and security improvements for clients worldwide.",
};

const keyMetrics = [
  { value: "$50M+", label: "Revenue Generated", icon: DollarSign },
  { value: "340%", label: "Avg Growth", icon: TrendingUp },
  { value: "99.99%", label: "Uptime", icon: Clock },
  { value: "150+", label: "Clients Served", icon: Users },
];

const caseStudies = [
  {
    title: "E-Commerce Platform",
    icon: ShoppingCart,
    before: [
      { metric: "Load Time", value: "2.1s" },
      { metric: "Bounce Rate", value: "45%" },
    ],
    after: [
      { metric: "Load Time", value: "0.4s" },
      { metric: "Bounce Rate", value: "15%" },
    ],
  },
  {
    title: "Banking Infrastructure",
    icon: Landmark,
    before: [
      { metric: "Security", value: "Frequent breaches" },
      { metric: "Auth Latency", value: "200ms" },
    ],
    after: [
      { metric: "Security", value: "Zero breaches" },
      { metric: "Auth Latency", value: "50ms" },
    ],
  },
  {
    title: "Analytics Dashboard",
    icon: BarChart3,
    before: [
      { metric: "Reports", value: "Manual" },
      { metric: "Data Lag", value: "2hr" },
    ],
    after: [
      { metric: "Reports", value: "Real-time" },
      { metric: "Accuracy", value: "98%" },
    ],
  },
];

const industries = [
  { name: "E-Commerce", metric: "3x conversion rate", icon: ShoppingCart },
  { name: "FinTech", metric: "99.99% uptime", icon: Landmark },
  { name: "Healthcare", metric: "HIPAA compliant", icon: Heart },
  { name: "SaaS", metric: "40% cost reduction", icon: Code },
  { name: "Education", metric: "500K+ users", icon: GraduationCap },
  { name: "Logistics", metric: "60% faster ops", icon: Truck },
];

const testimonials = [
  {
    quote:
      "Backup Solutions took our platform from constant downtime to 99.99% uptime in under three months. The ROI was immediate.",
    name: "David Park",
    title: "CTO, NexGen Commerce",
  },
  {
    quote:
      "Their security overhaul gave our banking clients complete confidence. We haven't had a single incident since the migration.",
    name: "Priya Sharma",
    title: "VP Engineering, FinSecure",
  },
  {
    quote:
      "The analytics dashboard they built replaced five separate tools. Our team saves 20+ hours per week on reporting alone.",
    name: "Carlos Rivera",
    title: "Head of Data, MetricsFlow",
  },
];

export default function ResultsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-amber mb-6">
            Track Record
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gradient mb-6">
            Proven Results
          </h1>
          <p className="text-xl text-warm-gray max-w-2xl mx-auto">
            Real metrics from real projects
          </p>
        </div>
      </section>

      {/* Key Metrics Strip */}
      <section className="py-16 px-4 bg-surface-secondary border-y border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {keyMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="text-center">
                <Icon className="w-6 h-6 text-amber mx-auto mb-3" />
                <p className="font-display text-4xl md:text-5xl font-bold text-gradient mb-1">
                  {metric.value}
                </p>
                <p className="text-warm-gray text-sm uppercase tracking-wider">
                  {metric.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Case Study Highlights */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Case Study Highlights
          </h2>
          <p className="text-warm-gray text-center mb-16 max-w-2xl mx-auto">
            Before and after transformations that speak for themselves
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study) => {
              const Icon = study.icon;
              return (
                <div
                  key={study.title}
                  className="bg-surface rounded-xl overflow-hidden border border-border"
                >
                  {/* Header */}
                  <div className="p-6 pb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-secondary flex items-center justify-center">
                      <Icon className="w-5 h-5 text-amber" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {study.title}
                    </h3>
                  </div>

                  {/* Before / After */}
                  <div className="grid grid-cols-2">
                    {/* Before */}
                    <div className="p-6 bg-red-950/20 border-t border-r border-red-900/20">
                      <p className="text-xs font-mono uppercase tracking-wider text-red-400/80 mb-4">
                        Before
                      </p>
                      <div className="space-y-3">
                        {study.before.map((item) => (
                          <div key={item.metric}>
                            <p className="text-xs text-warm-gray">
                              {item.metric}
                            </p>
                            <p className="text-sm font-semibold text-red-300">
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* After */}
                    <div className="p-6 bg-emerald-950/20 border-t border-emerald-900/20">
                      <p className="text-xs font-mono uppercase tracking-wider text-emerald-400/80 mb-4">
                        After
                      </p>
                      <div className="space-y-3">
                        {study.after.map((item) => (
                          <div key={item.metric}>
                            <p className="text-xs text-warm-gray">
                              {item.metric}
                            </p>
                            <p className="text-sm font-semibold text-emerald-300">
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industry Results */}
      <section className="py-20 px-4 bg-surface-secondary">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Results Across Industries
          </h2>
          <p className="text-warm-gray text-center mb-16 max-w-2xl mx-auto">
            Delivering impact in every sector we serve
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <div
                  key={industry.name}
                  className="bg-surface rounded-xl p-6 border border-border hover:border-amber/30 transition-colors text-center"
                >
                  <Icon className="w-8 h-8 text-amber mx-auto mb-3" />
                  <h3 className="font-display text-base font-semibold text-foreground mb-1">
                    {industry.name}
                  </h3>
                  <p className="text-amber-light text-sm font-medium">
                    {industry.metric}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient text-center mb-16">
            What Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-surface rounded-xl p-8 border border-border"
              >
                <span className="text-amber text-4xl font-display leading-none select-none">
                  &ldquo;
                </span>
                <p className="text-foreground leading-relaxed mb-6 mt-2">
                  {testimonial.quote}
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-display font-bold text-foreground text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-warm-gray text-xs">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-surface-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get Results Like These
          </h2>
          <p className="text-warm-gray text-lg mb-8 max-w-xl mx-auto">
            Let&apos;s discuss how we can deliver measurable impact for your
            business.
          </p>
          <Link
            href="/free-consultation"
            className="inline-flex items-center gap-2 bg-amber text-background px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Get Results Like These
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
