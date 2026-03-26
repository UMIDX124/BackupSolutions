"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Code,
  Brain,
  Shield,
  Zap,
  Server,
  Database,
  Lock,
  Search,
  PenTool,
  Rocket,
  TrendingUp,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/lib/services";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Code,
  Brain,
  Shield,
  Zap,
  Server,
  Database,
  Lock,
  Search,
  PenTool,
  Rocket,
  TrendingUp,
  AlertTriangle,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Animated Section Wrapper                                          */
/* ------------------------------------------------------------------ */
function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Item                                                          */
/* ------------------------------------------------------------------ */
function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-display font-medium text-foreground pr-8 group-hover:text-amber transition-colors duration-200">
          {question}
        </span>
        <motion.span
          className="text-amber text-2xl font-light flex-shrink-0 w-6 h-6 flex items-center justify-center"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="text-warm-gray leading-relaxed pb-6 pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Content Component                                        */
/* ------------------------------------------------------------------ */
export default function ServicePageContent({
  service,
}: {
  service: Service;
}) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <AnimatedSection className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(212, 168, 83, 0.08) 0%, transparent 60%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.p
            className="font-mono text-amber text-sm tracking-widest uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.p>

          <motion.h1
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gradient mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {service.title}
          </motion.h1>

          <motion.p
            className="font-display text-xl md:text-2xl text-foreground font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {service.headline}
          </motion.p>

          <motion.p
            className="text-warm-gray text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {service.description}
          </motion.p>
        </div>
      </AnimatedSection>

      {/* ── Pain Points ────────────────────────────────────────── */}
      <AnimatedSection className="py-24 px-4 bg-surface-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-4">
              Common Challenges
            </h2>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              These are the problems that hold businesses back — and the exact
              challenges we solve every day.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {service.painPoints.map((point, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-surface rounded-xl p-6 border border-border hover:border-amber/30 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {point.title}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ── Solutions ──────────────────────────────────────────── */}
      <AnimatedSection className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-4">
              Our Approach
            </h2>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              Proven strategies and modern technologies tailored to your unique
              requirements.
            </p>
          </div>

          <div className="space-y-16">
            {service.solutions.map((solution, index) => (
              <motion.div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                {/* Number badge */}
                <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-surface border border-border flex items-center justify-center">
                  <span className="font-mono text-2xl font-bold text-amber">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {solution.title}
                  </h3>
                  <p className="text-warm-gray leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── Process / Timeline ─────────────────────────────────── */}
      <AnimatedSection className="py-24 px-4 bg-surface-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-4">
              How We Deliver
            </h2>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              A structured, transparent process from discovery to deployment.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-amber/30" />
            <div className="md:hidden absolute top-0 bottom-0 left-6 w-px bg-amber/30" />

            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {service.process.map((step, index) => {
                const Icon = iconMap[step.icon] || Zap;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative pl-16 md:pl-0 md:text-center"
                  >
                    {/* Step dot (mobile) */}
                    <div className="md:hidden absolute left-[18px] top-4 w-3 h-3 rounded-full bg-amber border-2 border-background" />

                    {/* Icon circle */}
                    <div className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center mx-auto mb-4 md:relative md:z-10">
                      <Icon className="w-6 h-6 text-amber" />
                    </div>

                    {/* Number */}
                    <p className="font-mono text-amber text-sm mb-2">
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    {/* Title */}
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-warm-gray text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── Benefits / Stats Bar ───────────────────────────────── */}
      <AnimatedSection className="py-20 px-4">
        <motion.div
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {service.benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center"
            >
              <p className="font-display text-4xl md:text-5xl font-bold text-amber mb-2">
                {benefit.metric}
              </p>
              <p className="text-warm-gray text-sm font-medium">
                {benefit.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <AnimatedSection className="bg-surface-secondary py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient text-center mb-16">
            Frequently Asked Questions
          </h2>

          <div>
            {service.faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaqIndex === index}
                onToggle={() =>
                  setOpenFaqIndex(openFaqIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <AnimatedSection className="py-24 px-4 relative overflow-hidden">
        {/* Ambient gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, rgba(212, 168, 83, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(184, 115, 51, 0.06) 0%, transparent 60%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Ready to Get Started?
          </h2>

          <p className="text-lg text-warm-gray max-w-xl">
            Let&apos;s discuss how our {service.title.toLowerCase()} expertise
            can transform your business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/contact"
              className="bg-amber text-background px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity text-center"
            >
              Start Your Project
            </Link>
            <Link
              href="/contact?type=consultation"
              className="border border-warm-gray text-foreground px-8 py-4 rounded-lg hover:border-amber/50 transition-colors text-center"
            >
              Schedule Free Consultation
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
