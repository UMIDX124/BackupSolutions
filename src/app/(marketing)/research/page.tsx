"use client";

import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

/* ─── Color Tokens ─── */
const AMBER = "#D4A853";
const COPPER = "#B87333";
const SURFACE = "#252220";
const SURFACE_SEC = "#1A1714";
const WARM_WHITE = "#FAF8F5";
const WARM_GRAY = "#A39E96";
const BG = "#0D0D0D";

/* ─── Section 1 Data: Web Performance Benchmarks ─── */
const performanceData = [
  { industry: "E-commerce", LCP: 2.8, FID: 120, CLS: 0.18 },
  { industry: "Finance", LCP: 3.1, FID: 95, CLS: 0.12 },
  { industry: "Healthcare", LCP: 3.5, FID: 140, CLS: 0.22 },
  { industry: "SaaS", LCP: 2.1, FID: 80, CLS: 0.08 },
  { industry: "Media", LCP: 3.8, FID: 160, CLS: 0.25 },
];

/* ─── Section 2 Data: Technology Adoption Trends ─── */
const adoptionData = [
  { year: "2020", TypeScript: 30, "React/Next.js": 42, "AI/ML": 12, "Cloud-Native": 28, Serverless: 18 },
  { year: "2021", TypeScript: 40, "React/Next.js": 50, "AI/ML": 18, "Cloud-Native": 36, Serverless: 24 },
  { year: "2022", TypeScript: 55, "React/Next.js": 58, "AI/ML": 28, "Cloud-Native": 45, Serverless: 32 },
  { year: "2023", TypeScript: 65, "React/Next.js": 64, "AI/ML": 38, "Cloud-Native": 54, Serverless: 40 },
  { year: "2024", TypeScript: 74, "React/Next.js": 70, "AI/ML": 52, "Cloud-Native": 62, Serverless: 48 },
  { year: "2025", TypeScript: 82, "React/Next.js": 76, "AI/ML": 68, "Cloud-Native": 70, Serverless: 56 },
];

const adoptionColors = [AMBER, COPPER, "#E8C87A", "#8B6914", "#D4956B"];

/* ─── Section 3 Data: Market Analysis ─── */
const marketShareData = [
  { name: "North America", value: 38, color: AMBER },
  { name: "Europe", value: 26, color: COPPER },
  { name: "Asia Pacific", value: 24, color: "#E8C87A" },
  { name: "Middle East", value: 7, color: "#8B6914" },
  { name: "Latin America", value: 5, color: "#D4956B" },
];

const radarData = [
  { dimension: "Cost", score: 92 },
  { dimension: "Talent", score: 78 },
  { dimension: "English", score: 85 },
  { dimension: "Time Zone", score: 70 },
  { dimension: "Tech Skills", score: 82 },
  { dimension: "Growth Rate", score: 95 },
];

/* ─── Section 4 Data: Client Results ─── */
const clientResultsData = [
  { metric: "Load Time", before: 3.2, after: 0.4, unit: "s" },
  { metric: "Uptime", before: 95, after: 99.99, unit: "%" },
  { metric: "Response", before: 800, after: 50, unit: "ms" },
  { metric: "Revenue", before: 100, after: 340, unit: "%" },
];

/* ─── Custom Tooltip ─── */
function DarkTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-surface p-3 shadow-xl">
      <p className="mb-1.5 font-display text-sm font-semibold text-warm-white">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-xs" style={{ color: entry.color || WARM_GRAY }}>
          {entry.name}: <span className="font-mono font-semibold">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

/* ─── Section Wrapper ─── */
function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-surface p-6 lg:p-10">
      <h2 className="mb-2 font-display text-2xl font-bold text-warm-white lg:text-3xl">{title}</h2>
      <p className="mb-8 max-w-2xl text-warm-gray">{description}</p>
      {children}
    </section>
  );
}

/* ─── Page ─── */
export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <Breadcrumbs items={[{ label: "Research" }]} />

      {/* Hero */}
      <div className="mb-16 mt-8">
        <h1 className="font-display text-4xl font-bold lg:text-5xl">
          Research & <span className="text-gradient">Data</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-warm-gray">
          Interactive benchmarks, technology trends, and market insights drawn from real project data
          and industry research.
        </p>
      </div>

      <div className="space-y-10">
        {/* ── Section 1: Web Performance Benchmarks ── */}
        <Section
          title="Web Performance Benchmarks 2025"
          description="Core Web Vitals scores across major industries. Lower is better for LCP and CLS; results updated quarterly."
        >
          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis
                  dataKey="industry"
                  tick={{ fill: WARM_GRAY, fontSize: 12 }}
                  axisLine={{ stroke: "#333" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: WARM_GRAY, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<DarkTooltip />} />
                <Bar dataKey="LCP" name="LCP (s)" fill={AMBER} radius={[4, 4, 0, 0]} />
                <Bar dataKey="CLS" name="CLS" fill={COPPER} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Key stats row */}
          <div className="mt-6 grid grid-cols-3 gap-6 text-center">
            {[
              { label: "Avg. LCP", value: "2.5s" },
              { label: "Avg. FID", value: "100ms" },
              { label: "Avg. CLS", value: "0.1" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-bold text-amber lg:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs text-warm-gray">{s.label}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Section 2: Technology Adoption Trends ── */}
        <Section
          title="Technology Adoption Trends"
          description="Adoption rates of key technologies from 2020 to 2025, based on project data and industry surveys."
        >
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={adoptionData}>
                <defs>
                  {["TypeScript", "React/Next.js", "AI/ML", "Cloud-Native", "Serverless"].map(
                    (key, i) => (
                      <linearGradient key={key} id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={adoptionColors[i]} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={adoptionColors[i]} stopOpacity={0} />
                      </linearGradient>
                    )
                  )}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis
                  dataKey="year"
                  tick={{ fill: WARM_GRAY, fontSize: 12 }}
                  axisLine={{ stroke: "#333" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: WARM_GRAY, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  unit="%"
                />
                <Tooltip content={<DarkTooltip />} />
                {["TypeScript", "React/Next.js", "AI/ML", "Cloud-Native", "Serverless"].map(
                  (key, i) => (
                    <Area
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={adoptionColors[i]}
                      strokeWidth={2}
                      fill={`url(#grad-${i})`}
                    />
                  )
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {["TypeScript", "React/Next.js", "AI/ML", "Cloud-Native", "Serverless"].map(
              (key, i) => (
                <div key={key} className="flex items-center gap-2 text-xs text-warm-gray">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: adoptionColors[i] }}
                  />
                  {key}
                </div>
              )
            )}
          </div>
        </Section>

        {/* ── Section 3: Global Tech Market ── */}
        <Section
          title="Global Tech Market Analysis"
          description="Market share by region and Pakistan&rsquo;s competitive positioning for global tech services."
        >
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Pie Chart */}
            <div>
              <h3 className="mb-4 font-display text-lg font-semibold text-warm-white">
                Market Share by Region
              </h3>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketShareData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={110}
                      paddingAngle={3}
                      dataKey="value"
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      label={(props: any) =>
                        `${props.name ?? ""} ${(((props.percent as number) ?? 0) * 100).toFixed(0)}%`
                      }
                      labelLine={{ stroke: WARM_GRAY }}
                    >
                      {marketShareData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<DarkTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Radar Chart */}
            <div>
              <h3 className="mb-4 font-display text-lg font-semibold text-warm-white">
                Pakistan Tech Competitiveness
              </h3>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis
                      dataKey="dimension"
                      tick={{ fill: WARM_GRAY, fontSize: 11 }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      tick={{ fill: WARM_GRAY, fontSize: 10 }}
                      axisLine={false}
                    />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke={AMBER}
                      fill={AMBER}
                      fillOpacity={0.25}
                      strokeWidth={2}
                    />
                    <Tooltip content={<DarkTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Section 4: Client Results Dashboard ── */}
        <Section
          title="Client Results Dashboard"
          description="Measurable before-and-after improvements from real client engagements."
        >
          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clientResultsData} barGap={6}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis
                  dataKey="metric"
                  tick={{ fill: WARM_GRAY, fontSize: 12 }}
                  axisLine={{ stroke: "#333" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: WARM_GRAY, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<DarkTooltip />} />
                <Bar dataKey="before" name="Before" fill={COPPER} radius={[4, 4, 0, 0]} />
                <Bar dataKey="after" name="After" fill={AMBER} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Improvement cards */}
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {clientResultsData.map((d) => (
              <div
                key={d.metric}
                className="rounded-lg border border-border bg-surface-secondary p-4 text-center"
              >
                <p className="text-xs text-warm-gray">{d.metric}</p>
                <p className="mt-1 font-mono text-sm text-warm-gray line-through">
                  {d.before}
                  {d.unit}
                </p>
                <p className="font-display text-xl font-bold text-amber">
                  {d.after}
                  {d.unit}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <p className="text-warm-gray mb-2">
          Want custom research or benchmarking for your industry?
        </p>
        <p className="text-sm text-warm-gray/70 mb-6">
          Our team delivers tailored performance audits, market analyses, and technology assessments.
        </p>
        <Link
          href="/free-consultation"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber to-copper px-6 py-3 font-semibold text-background hover:brightness-110 transition-all"
        >
          Request Custom Research
        </Link>
      </div>
    </div>
  );
}
