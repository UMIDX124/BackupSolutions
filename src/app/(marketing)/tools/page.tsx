"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Calculator, Gauge, DollarSign, ChevronDown, Check, TrendingUp, Zap, Clock } from "lucide-react";

/* ─────────────────────────────────────────────
   Animated Counter Hook
   ───────────────────────────────────────────── */
function useAnimatedNumber(target: number, duration = 800) {
  const [value, setValue] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    const start = prev.current;
    const diff = target - start;
    if (diff === 0) return;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + diff * eased;
      setValue(current);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        prev.current = target;
      }
    }
    requestAnimationFrame(tick);
  }, [target, duration]);

  return value;
}

/* ─────────────────────────────────────────────
   Shared UI Primitives
   ───────────────────────────────────────────── */
function SectionCard({ id, icon, title, children }: { id: string; icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 bg-surface rounded-xl border border-border overflow-hidden">
      <div className="flex items-center gap-4 px-8 pt-8 pb-4">
        <div className="w-12 h-12 rounded-lg bg-amber/10 text-amber flex items-center justify-center shrink-0">
          {icon}
        </div>
        <h2 className="text-2xl lg:text-3xl font-display font-bold">{title}</h2>
      </div>
      <div className="px-8 pb-8">{children}</div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-warm-gray mb-1.5">{children}</label>;
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-surface-secondary border border-border rounded-lg px-4 py-2.5 text-warm-white text-sm focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber/40 transition-all cursor-pointer pr-10"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray pointer-events-none" />
    </div>
  );
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border text-sm transition-all ${
        checked
          ? "bg-amber/10 border-amber/30 text-amber"
          : "bg-surface-secondary border-border text-warm-gray hover:border-warm-gray/40"
      }`}
    >
      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
        checked ? "bg-amber border-amber" : "border-warm-gray/50"
      }`}>
        {checked && <Check className="w-3 h-3 text-background" />}
      </div>
      {label}
    </button>
  );
}

function Slider({ min, max, value, onChange, label, displayValue }: {
  min: number; max: number; value: number; onChange: (v: number) => void; label: string; displayValue?: string;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <Label>{label}</Label>
        <span className="text-sm font-mono text-amber">{displayValue ?? value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none bg-surface-secondary cursor-pointer accent-amber [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-amber/20 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-amber [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background"
      />
    </div>
  );
}

function NumberInput({ value, onChange, label, prefix }: {
  value: number; onChange: (v: number) => void; label: string; prefix?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray text-sm">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className={`w-full bg-surface-secondary border border-border rounded-lg py-2.5 text-warm-white text-sm focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber/40 transition-all font-mono ${prefix ? "pl-7 pr-4" : "px-4"}`}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CALCULATOR 1: Website Cost Calculator
   ───────────────────────────────────────────── */
const PROJECT_TYPES = [
  { value: "landing", label: "Landing Page", base: 1500 },
  { value: "business", label: "Business Site", base: 4000 },
  { value: "ecommerce", label: "E-commerce", base: 8000 },
  { value: "webapp", label: "Web App", base: 12000 },
  { value: "saas", label: "SaaS Platform", base: 20000 },
];

const FEATURES_LIST = [
  { key: "cms", label: "CMS", cost: 1500 },
  { key: "auth", label: "Authentication", cost: 2000 },
  { key: "payments", label: "Payments", cost: 3000 },
  { key: "api", label: "API Integration", cost: 2500 },
  { key: "ai", label: "AI Features", cost: 5000 },
  { key: "realtime", label: "Real-time", cost: 3500 },
  { key: "analytics", label: "Analytics", cost: 1000 },
];

const DESIGN_LEVELS = [
  { value: "template", label: "Template", multiplier: 1 },
  { value: "custom", label: "Custom Design", multiplier: 1.6 },
  { value: "premium", label: "Premium Custom", multiplier: 2.4 },
];

function WebsiteCostCalculator() {
  const [projectType, setProjectType] = useState("business");
  const [pages, setPages] = useState(8);
  const [features, setFeatures] = useState<Record<string, boolean>>({});
  const [designLevel, setDesignLevel] = useState("custom");

  const calculate = useCallback(() => {
    const base = PROJECT_TYPES.find((p) => p.value === projectType)!.base;
    const pageCost = pages * 200;
    const featureCost = FEATURES_LIST.filter((f) => features[f.key]).reduce((sum, f) => sum + f.cost, 0);
    const multiplier = DESIGN_LEVELS.find((d) => d.value === designLevel)!.multiplier;

    const total = (base + pageCost + featureCost) * multiplier;
    const low = Math.round(total * 0.85);
    const high = Math.round(total * 1.2);

    return {
      base: Math.round(base * multiplier),
      pages: Math.round(pageCost * multiplier),
      features: Math.round(featureCost * multiplier),
      low,
      high,
      mid: Math.round((low + high) / 2),
    };
  }, [projectType, pages, features, designLevel]);

  const result = calculate();
  const maxCost = 80000;
  const barWidth = Math.min((result.high / maxCost) * 100, 100);
  const barStart = Math.min((result.low / maxCost) * 100, 100);

  return (
    <div className="space-y-6 mt-4">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <Label>Project Type</Label>
          <Select
            value={projectType}
            onChange={setProjectType}
            options={PROJECT_TYPES.map((p) => ({ value: p.value, label: p.label }))}
          />
        </div>
        <div>
          <Label>Design Level</Label>
          <Select
            value={designLevel}
            onChange={setDesignLevel}
            options={DESIGN_LEVELS.map((d) => ({ value: d.value, label: d.label }))}
          />
        </div>
      </div>

      <Slider
        min={1}
        max={50}
        value={pages}
        onChange={setPages}
        label="Number of Pages"
        displayValue={`${pages} page${pages !== 1 ? "s" : ""}`}
      />

      <div>
        <Label>Features</Label>
        <div className="flex flex-wrap gap-2 mt-1">
          {FEATURES_LIST.map((f) => (
            <Checkbox
              key={f.key}
              checked={!!features[f.key]}
              onChange={(v) => setFeatures((prev) => ({ ...prev, [f.key]: v }))}
              label={f.label}
            />
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="bg-surface-secondary rounded-xl border border-border p-6 space-y-5">
        <div>
          <p className="text-sm text-warm-gray mb-2">Estimated Cost Range</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-amber">${result.low.toLocaleString()}</span>
            <span className="text-warm-gray">-</span>
            <span className="text-3xl font-display font-bold text-amber">${result.high.toLocaleString()}</span>
          </div>
        </div>

        {/* Visual bar */}
        <div className="relative h-4 bg-background rounded-full overflow-hidden">
          <div
            className="absolute top-0 h-full rounded-full transition-all duration-500 ease-out"
            style={{
              left: `${barStart}%`,
              width: `${barWidth - barStart}%`,
              background: "linear-gradient(90deg, #B87333, #D4A853, #F5D78E)",
            }}
          />
          <div
            className="absolute top-0 h-full w-1 bg-warm-white rounded-full transition-all duration-500"
            style={{ left: `${(result.mid / maxCost) * 100}%` }}
          />
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-3 gap-4 pt-2">
          {[
            { label: "Base & Design", value: result.base },
            { label: "Pages", value: result.pages },
            { label: "Features", value: result.features },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-xs text-warm-gray mb-1">{item.label}</p>
              <p className="text-lg font-mono font-semibold text-warm-white">${item.value.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CALCULATOR 2: Performance Score Estimator
   ───────────────────────────────────────────── */
const HOSTING_OPTIONS = [
  { value: "shared", label: "Shared Hosting", lcpPenalty: 2.8, fidPenalty: 120, clsPenalty: 0.15 },
  { value: "vps", label: "VPS", lcpPenalty: 1.5, fidPenalty: 60, clsPenalty: 0.08 },
  { value: "cloud", label: "Cloud", lcpPenalty: 0.8, fidPenalty: 30, clsPenalty: 0.04 },
  { value: "edge", label: "Edge / CDN", lcpPenalty: 0.3, fidPenalty: 10, clsPenalty: 0.01 },
];

const FRAMEWORK_OPTIONS = [
  { value: "wordpress", label: "WordPress", lcpPenalty: 2.0, fidPenalty: 100, clsPenalty: 0.12 },
  { value: "react", label: "React (CRA/Vite)", lcpPenalty: 1.5, fidPenalty: 60, clsPenalty: 0.06 },
  { value: "nextjs", label: "Next.js", lcpPenalty: 0.5, fidPenalty: 20, clsPenalty: 0.02 },
  { value: "static", label: "Static HTML", lcpPenalty: 0.2, fidPenalty: 5, clsPenalty: 0.01 },
];

const IMAGE_OPTIONS = [
  { value: "none", label: "No Optimization", lcpPenalty: 2.0 },
  { value: "basic", label: "Basic (Compressed)", lcpPenalty: 0.8 },
  { value: "advanced", label: "Advanced (WebP/AVIF + Lazy)", lcpPenalty: 0.2 },
];

const CACHE_OPTIONS = [
  { value: "none", label: "No Caching", lcpPenalty: 1.5, fidPenalty: 40 },
  { value: "cdn", label: "CDN Only", lcpPenalty: 0.5, fidPenalty: 15 },
  { value: "edge-cdn", label: "Edge + CDN", lcpPenalty: 0.1, fidPenalty: 5 },
];

function scoreToColor(score: number, thresholds: [number, number]) {
  if (score <= thresholds[0]) return { color: "#22c55e", label: "Good" };
  if (score <= thresholds[1]) return { color: "#eab308", label: "Needs Improvement" };
  return { color: "#ef4444", label: "Poor" };
}

function VitalGauge({ label, value, unit, thresholds, maxVal }: {
  label: string; value: number; unit: string; thresholds: [number, number]; maxVal: number;
}) {
  const { color, label: status } = scoreToColor(value, thresholds);
  const percentage = Math.min((value / maxVal) * 100, 100);

  return (
    <div className="bg-background rounded-xl p-5 border border-border">
      <p className="text-sm text-warm-gray mb-3">{label}</p>
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-2xl font-mono font-bold" style={{ color }}>
          {value.toFixed(label === "CLS" ? 2 : 0)}
        </span>
        <span className="text-sm text-warm-gray">{unit}</span>
      </div>
      {/* Gauge bar */}
      <div className="relative h-2.5 bg-surface-secondary rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <p className="text-xs mt-2 font-medium" style={{ color }}>{status}</p>
    </div>
  );
}

function PerformanceCalculator() {
  const [hosting, setHosting] = useState("vps");
  const [framework, setFramework] = useState("nextjs");
  const [imageOpt, setImageOpt] = useState("basic");
  const [caching, setCaching] = useState("cdn");

  const calculate = useCallback(() => {
    const h = HOSTING_OPTIONS.find((o) => o.value === hosting)!;
    const f = FRAMEWORK_OPTIONS.find((o) => o.value === framework)!;
    const i = IMAGE_OPTIONS.find((o) => o.value === imageOpt)!;
    const c = CACHE_OPTIONS.find((o) => o.value === caching)!;

    const lcp = Math.max(0.5, h.lcpPenalty + f.lcpPenalty + i.lcpPenalty + c.lcpPenalty);
    const fid = Math.max(5, h.fidPenalty + f.fidPenalty + c.fidPenalty);
    const cls = Math.max(0.01, h.clsPenalty + f.clsPenalty);

    return { lcp: Math.round(lcp * 100) / 100, fid: Math.round(fid), cls: Math.round(cls * 100) / 100 };
  }, [hosting, framework, imageOpt, caching]);

  const result = calculate();

  const recommendations = [];
  if (hosting === "shared") recommendations.push("Upgrade from shared hosting to cloud or edge for major speed gains.");
  if (framework === "wordpress") recommendations.push("Consider migrating to Next.js or a static site generator for better performance.");
  if (imageOpt === "none") recommendations.push("Enable image optimization with WebP/AVIF formats and lazy loading.");
  if (caching === "none") recommendations.push("Implement CDN caching to reduce server response times globally.");
  if (result.lcp > 2.5) recommendations.push("Your LCP is above the 2.5s threshold. Focus on reducing server response time and optimizing above-the-fold content.");
  if (result.fid > 100) recommendations.push("High FID suggests heavy JavaScript. Consider code splitting and deferring non-critical scripts.");
  if (result.cls > 0.1) recommendations.push("CLS above 0.1 indicates layout shifts. Set explicit dimensions for images and ads.");
  if (recommendations.length === 0) recommendations.push("Great setup! Your configuration is well-optimized for performance.");

  return (
    <div className="space-y-6 mt-4">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <Label>Current Hosting</Label>
          <Select value={hosting} onChange={setHosting} options={HOSTING_OPTIONS.map((o) => ({ value: o.value, label: o.label }))} />
        </div>
        <div>
          <Label>Framework</Label>
          <Select value={framework} onChange={setFramework} options={FRAMEWORK_OPTIONS.map((o) => ({ value: o.value, label: o.label }))} />
        </div>
        <div>
          <Label>Image Optimization</Label>
          <Select value={imageOpt} onChange={setImageOpt} options={IMAGE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))} />
        </div>
        <div>
          <Label>Caching Strategy</Label>
          <Select value={caching} onChange={setCaching} options={CACHE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))} />
        </div>
      </div>

      {/* Core Web Vitals Gauges */}
      <div className="grid sm:grid-cols-3 gap-4">
        <VitalGauge label="LCP (Largest Contentful Paint)" value={result.lcp} unit="s" thresholds={[2.5, 4.0]} maxVal={8} />
        <VitalGauge label="FID (First Input Delay)" value={result.fid} unit="ms" thresholds={[100, 300]} maxVal={500} />
        <VitalGauge label="CLS (Cumulative Layout Shift)" value={result.cls} unit="" thresholds={[0.1, 0.25]} maxVal={0.5} />
      </div>

      {/* Recommendations */}
      <div className="bg-surface-secondary rounded-xl border border-border p-6">
        <h3 className="text-sm font-semibold text-amber mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4" /> Recommendations
        </h3>
        <ul className="space-y-2">
          {recommendations.map((r, i) => (
            <li key={i} className="flex gap-2 text-sm text-warm-gray">
              <span className="text-copper mt-0.5 shrink-0">&#8250;</span>
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CALCULATOR 3: Technology ROI Calculator
   ───────────────────────────────────────────── */
function AnimatedCurrency({ value }: { value: number }) {
  const animated = useAnimatedNumber(value);
  return <>${Math.round(animated).toLocaleString()}</>;
}

function AnimatedDecimal({ value, suffix }: { value: number; suffix: string }) {
  const animated = useAnimatedNumber(value);
  return <>{animated.toFixed(1)}{suffix}</>;
}

function ROICalculator() {
  const [monthlySpend, setMonthlySpend] = useState(5000);
  const [efficiencyGain, setEfficiencyGain] = useState(25);
  const [teamSize, setTeamSize] = useState(5);
  const [hourlyRate, setHourlyRate] = useState(75);

  const calculate = useCallback(() => {
    const monthlyTimeSaved = (efficiencyGain / 100) * teamSize * 160; // hours/month
    const monthlySavings = monthlyTimeSaved * hourlyRate;
    const annualSavings = monthlySavings * 12;
    const annualInvestment = monthlySpend * 12;
    const threeYearROI = annualInvestment > 0 ? ((annualSavings * 3 - annualInvestment * 3) / (annualInvestment * 3)) * 100 : 0;
    const paybackMonths = monthlySavings > 0 ? monthlySpend / monthlySavings : Infinity;

    return {
      annualSavings: Math.round(annualSavings),
      threeYearROI: Math.round(threeYearROI * 10) / 10,
      paybackMonths: Math.round(paybackMonths * 10) / 10,
      monthlyTimeSaved: Math.round(monthlyTimeSaved),
      monthlySavings: Math.round(monthlySavings),
    };
  }, [monthlySpend, efficiencyGain, teamSize, hourlyRate]);

  const result = calculate();

  return (
    <div className="space-y-6 mt-4">
      <div className="grid sm:grid-cols-2 gap-6">
        <NumberInput value={monthlySpend} onChange={setMonthlySpend} label="Current Monthly Tech Spend" prefix="$" />
        <div>
          <Slider
            min={5}
            max={80}
            value={efficiencyGain}
            onChange={setEfficiencyGain}
            label="Expected Efficiency Gain"
            displayValue={`${efficiencyGain}%`}
          />
        </div>
        <NumberInput value={teamSize} onChange={setTeamSize} label="Team Size" />
        <NumberInput value={hourlyRate} onChange={setHourlyRate} label="Avg. Hourly Rate" prefix="$" />
      </div>

      {/* Results Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-surface-secondary rounded-xl border border-border p-6 text-center">
          <div className="w-10 h-10 rounded-lg bg-amber/10 text-amber flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-xs text-warm-gray mb-1">Annual Savings</p>
          <p className="text-2xl font-display font-bold text-amber">
            <AnimatedCurrency value={result.annualSavings} />
          </p>
        </div>

        <div className="bg-surface-secondary rounded-xl border border-border p-6 text-center">
          <div className="w-10 h-10 rounded-lg bg-amber/10 text-amber flex items-center justify-center mx-auto mb-3">
            <Calculator className="w-5 h-5" />
          </div>
          <p className="text-xs text-warm-gray mb-1">3-Year ROI</p>
          <p className="text-2xl font-display font-bold text-amber">
            <AnimatedDecimal value={result.threeYearROI} suffix="%" />
          </p>
        </div>

        <div className="bg-surface-secondary rounded-xl border border-border p-6 text-center">
          <div className="w-10 h-10 rounded-lg bg-amber/10 text-amber flex items-center justify-center mx-auto mb-3">
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-xs text-warm-gray mb-1">Payback Period</p>
          <p className="text-2xl font-display font-bold text-amber">
            <AnimatedDecimal value={result.paybackMonths} suffix=" mo" />
          </p>
        </div>
      </div>

      {/* Summary breakdown */}
      <div className="bg-surface-secondary rounded-xl border border-border p-6">
        <h3 className="text-sm font-semibold text-amber mb-4">Detailed Breakdown</h3>
        <div className="space-y-3">
          {[
            { label: "Monthly time saved", value: `${result.monthlyTimeSaved} hours` },
            { label: "Monthly savings from efficiency", value: `$${result.monthlySavings.toLocaleString()}` },
            { label: "Annual technology investment", value: `$${(monthlySpend * 12).toLocaleString()}` },
            { label: "Annual net benefit", value: `$${(result.annualSavings - monthlySpend * 12).toLocaleString()}` },
            { label: "3-year total savings", value: `$${(result.annualSavings * 3).toLocaleString()}` },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-center text-sm">
              <span className="text-warm-gray">{row.label}</span>
              <span className="font-mono text-warm-white">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE COMPONENT
   ───────────────────────────────────────────── */
const TOOLS = [
  { slug: "website-cost-calculator", title: "Website Cost Calculator", icon: <DollarSign className="w-5 h-5" /> },
  { slug: "performance-score-checker", title: "Performance Score Estimator", icon: <Gauge className="w-5 h-5" /> },
  { slug: "roi-calculator", title: "Technology ROI Calculator", icon: <Calculator className="w-5 h-5" /> },
];

export default function ToolsPage() {
  useEffect(() => {
    document.title = "Free Tools | Calculators & Estimators";
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">
          Free <span className="text-gradient">Tools</span>
        </h1>
        <p className="text-lg text-warm-gray max-w-2xl">
          Interactive calculators and estimators to help you plan your technology investments with confidence.
        </p>
      </div>

      {/* Jump links */}
      <div className="flex flex-wrap gap-3 mb-14">
        {TOOLS.map((tool) => (
          <a
            key={tool.slug}
            href={`#${tool.slug}`}
            className="flex items-center gap-2 bg-surface-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-warm-gray hover:text-amber hover:border-amber/30 transition-all"
          >
            {tool.icon}
            {tool.title}
          </a>
        ))}
      </div>

      {/* Calculators */}
      <div className="space-y-16">
        <SectionCard
          id="website-cost-calculator"
          icon={<DollarSign className="w-6 h-6" />}
          title="Website Cost Calculator"
        >
          <p className="text-warm-gray text-sm mb-2">
            Estimate the cost of building a custom website based on your requirements, features, and design complexity.
          </p>
          <WebsiteCostCalculator />
        </SectionCard>

        <SectionCard
          id="performance-score-checker"
          icon={<Gauge className="w-6 h-6" />}
          title="Performance Score Estimator"
        >
          <p className="text-warm-gray text-sm mb-2">
            Get estimated Core Web Vitals scores based on your tech stack, hosting, and optimization strategy.
          </p>
          <PerformanceCalculator />
        </SectionCard>

        <SectionCard
          id="roi-calculator"
          icon={<Calculator className="w-6 h-6" />}
          title="Technology ROI Calculator"
        >
          <p className="text-warm-gray text-sm mb-2">
            Calculate the potential return on investment for technology upgrades, migrations, and new implementations.
          </p>
          <ROICalculator />
        </SectionCard>
      </div>

      {/* CTA */}
      <div className="mt-20 text-center bg-surface rounded-xl border border-border p-10">
        <h2 className="text-2xl font-display font-bold mb-3">
          Want a <span className="text-gradient">personalized analysis</span>?
        </h2>
        <p className="text-warm-gray mb-6 max-w-lg mx-auto">
          These calculators provide general estimates. Get a detailed, tailored assessment for your specific project.
        </p>
        <Link
          href="/free-consultation"
          className="inline-flex items-center gap-2 bg-amber hover:bg-amber-light text-background font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Schedule a Free Consultation
        </Link>
      </div>
    </div>
  );
}
