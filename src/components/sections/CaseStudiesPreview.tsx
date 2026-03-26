"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  RevealOnScroll,
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/ScrollAnimations";

const caseStudies = [
  {
    slug: "techmart-ecommerce-overhaul",
    category: "Web Architecture",
    title: "E-Commerce Platform Overhaul",
    client: "TechMart",
    metrics: [
      { value: "340%", label: "Revenue Growth" },
      { value: "99.99%", label: "Uptime" },
      { value: "0.4s", label: "Load Time (from 2.1s)" },
    ],
    gradient: "from-amber/20 via-copper/10 to-transparent",
  },
  {
    slug: "securebank-security-infrastructure",
    category: "Cybersecurity",
    title: "Banking Security Infrastructure",
    client: "SecureBank",
    metrics: [
      { value: "Zero", label: "Breaches" },
      { value: "50ms", label: "Auth Time" },
      { value: "$2.3M", label: "Saved" },
    ],
    gradient: "from-copper/20 via-amber/10 to-transparent",
  },
  {
    slug: "dataflow-ai-analytics",
    category: "AI & Analytics",
    title: "AI-Powered Analytics Dashboard",
    client: "DataFlow",
    metrics: [
      { value: "10x", label: "Faster Insights" },
      { value: "98%", label: "Accuracy" },
      { value: "60%", label: "Cost Reduction" },
    ],
    gradient: "from-amber/15 via-copper/15 to-transparent",
  },
];

export default function CaseStudiesPreview() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll variant="fade-up" className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-4">
            Case Studies
          </h2>
          <p className="text-warm-gray text-lg">
            Real results from real clients
          </p>
        </RevealOnScroll>

        {/* Cards — zoom-in reveal with stagger */}
        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          staggerDelay={0.2}
        >
          {caseStudies.map((study) => (
            <StaggerItem key={study.slug}>
              <RevealOnScroll variant="zoom-in">
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="block bg-surface rounded-xl overflow-hidden border border-border group hover:border-amber/30 transition-colors duration-300"
                >
                  {/* Top gradient section */}
                  <div className={`relative h-40 bg-gradient-to-br ${study.gradient} bg-surface-secondary flex items-end p-6`}>
                    <span className="absolute top-4 left-4 text-xs font-mono tracking-wider uppercase text-amber bg-background/60 px-3 py-1 rounded-full">
                      {study.category}
                    </span>
                    <p className="text-xs text-warm-gray">
                      Client: <span className="text-foreground">{study.client}</span>
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-foreground mb-6 group-hover:text-amber transition-colors duration-300">
                      {study.title}
                    </h3>

                    {/* Metrics — CountUpOnView effect via animated display */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {study.metrics.map((metric) => (
                        <div key={metric.label} className="text-center">
                          <motion.p
                            className="text-amber font-bold text-lg font-display"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                          >
                            {metric.value}
                          </motion.p>
                          <p className="text-xs text-warm-gray mt-1">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <span className="text-sm text-copper group-hover:text-amber transition-colors duration-300 font-medium">
                      Read Case Study →
                    </span>
                  </div>
                </Link>
              </RevealOnScroll>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
