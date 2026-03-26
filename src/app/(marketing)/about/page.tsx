import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Lightbulb,
  Shield,
  Eye,
  Award,
  ArrowRight,
  Globe,
  Users,
  FolderKanban,
  Calendar,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Backup Solutions — founded in 2018 by M Faizan Rafiq and Faizan Ali Malik. Building digital resilience for businesses worldwide from Lahore, Pakistan.",
};

const timeline = [
  {
    year: "2018",
    title: "Founded in Lahore",
    description:
      "M Faizan Rafiq and Faizan Ali Malik start Backup Solutions with a mission to deliver enterprise-grade technology to businesses of all sizes.",
  },
  {
    year: "2020",
    title: "First 50 Clients",
    description:
      "Expanded from local to national services, building a reputation for reliability and innovation across Pakistan.",
  },
  {
    year: "2022",
    title: "AI Division Launch",
    description:
      "Added AI Modeling to core services, empowering clients with intelligent automation and data-driven decision making.",
  },
  {
    year: "2024",
    title: "Going Global",
    description:
      "Began serving international clients across 15+ countries, bringing Pakistani tech excellence to the world stage.",
  },
];

const founders = [
  {
    name: "M Faizan Rafiq",
    title: "Co-Founder",
    initials: "MF",
    bio: "Visionary technologist with deep expertise in enterprise architecture and cloud infrastructure. Leads technical strategy and innovation at Backup Solutions.",
    expertise: [
      "Enterprise Architecture",
      "Cloud Infrastructure",
      "Technical Strategy",
      "System Design",
    ],
  },
  {
    name: "Faizan Ali Malik",
    title: "Co-Founder",
    initials: "FM",
    bio: "Strategic leader specializing in software engineering and AI solutions. Drives client relationships and operational excellence.",
    expertise: [
      "Software Engineering",
      "AI Solutions",
      "Client Relations",
      "Operations",
    ],
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Pushing boundaries with cutting-edge solutions that keep our clients ahead of the curve.",
  },
  {
    icon: Shield,
    title: "Reliability",
    description:
      "Building systems that never fail — because your business depends on uptime.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Open communication and honest partnerships at every stage of the journey.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Delivering nothing less than exceptional quality in every project we undertake.",
  },
];

const stats = [
  { value: "8+", label: "Years", icon: Calendar },
  { value: "150+", label: "Clients", icon: Users },
  { value: "200+", label: "Projects", icon: FolderKanban },
  { value: "15+", label: "Countries", icon: Globe },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-amber mb-6">
            Who We Are
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gradient mb-6">
            Our Story
          </h1>
          <p className="text-xl text-warm-gray max-w-2xl mx-auto">
            Building digital resilience since 2018
          </p>
        </div>
      </section>

      {/* About Image + Story */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <Image
              src="/about.jpg"
              alt="Backup Solutions team workspace"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Built Different, <span className="text-gradient">By Design</span>
            </h2>
            <div className="space-y-4 text-warm-gray leading-relaxed">
              <p>
                We started Backup Solutions in 2018 in Lahore, Pakistan — not because we saw a gap in
                the market, but because we lived it. Businesses around us were struggling with unreliable
                technology, and we knew we could do better.
              </p>
              <p>
                Today, we serve clients across 15+ countries, but we haven&apos;t lost that startup hunger.
                Every project we take on gets the same obsessive attention to detail — whether it&apos;s a
                local e-commerce store or a global SaaS platform.
              </p>
              <p>
                What sets us apart? We don&apos;t just build technology — we build technology that <span className="text-amber font-medium">never fails</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Our Journey
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex items-start gap-8 md:gap-0 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber border-4 border-background z-10 mt-1" />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      index % 2 === 0
                        ? "md:pr-12 md:text-right"
                        : "md:pl-12 md:text-left"
                    }`}
                  >
                    <span className="font-mono text-amber text-sm font-medium">
                      {item.year}
                    </span>
                    <h3 className="font-display text-xl font-bold text-foreground mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-warm-gray leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 px-4 bg-surface-secondary">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Meet the Founders
          </h2>
          <p className="text-warm-gray text-center mb-16 max-w-2xl mx-auto">
            The visionaries behind Backup Solutions
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="bg-surface rounded-xl p-8 flex flex-col items-center text-center"
              >
                {/* Initials Avatar */}
                <div className="w-24 h-24 rounded-full bg-surface-secondary border-2 border-amber/30 flex items-center justify-center mb-6">
                  <span className="text-amber font-display text-2xl font-bold">
                    {founder.initials}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  {founder.name}
                </h3>
                <p className="text-amber text-sm font-medium mb-4">
                  {founder.title}
                </p>
                <p className="text-warm-gray leading-relaxed mb-6">
                  {founder.bio}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {founder.expertise.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-surface-secondary text-amber-light border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mission &amp; Values
            </h2>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              To democratize enterprise-grade technology for businesses
              worldwide.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-surface rounded-xl p-6 text-center border border-border hover:border-amber/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-surface-secondary flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-amber" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-warm-gray text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-surface-secondary">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="w-6 h-6 text-amber mx-auto mb-3" />
                  <p className="font-display text-4xl md:text-5xl font-bold text-gradient mb-1">
                    {stat.value}
                  </p>
                  <p className="text-warm-gray text-sm uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Join Our Journey
          </h2>
          <p className="text-warm-gray text-lg mb-8 max-w-xl mx-auto">
            Partner with a team that&apos;s passionate about building technology
            that lasts.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-amber text-background px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
