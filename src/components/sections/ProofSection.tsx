"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  CountUpOnView,
  RevealOnScroll,
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/ScrollAnimations";

interface StatItem {
  value: string;
  numericValue: number;
  prefix?: string;
  suffix: string;
  label: string;
  decimals?: number;
  colSpan?: string;
}

const stats: StatItem[] = [
  {
    value: "200+",
    numericValue: 200,
    suffix: "+",
    label: "Projects Completed",
    colSpan: "md:col-span-2",
  },
  {
    value: "15+",
    numericValue: 15,
    suffix: "+",
    label: "Countries Served",
  },
  {
    value: "99.9%",
    numericValue: 99.9,
    suffix: "%",
    label: "Client Satisfaction Rate",
    decimals: 1,
  },
  {
    value: "$50M+",
    numericValue: 50,
    prefix: "$",
    suffix: "M+",
    label: "Revenue Generated for Clients",
    colSpan: "md:col-span-2",
  },
  {
    value: "24/7",
    numericValue: 24,
    suffix: "/7",
    label: "Support Availability",
  },
  {
    value: "8+",
    numericValue: 8,
    suffix: "+",
    label: "Years in Industry",
  },
];

export default function ProofSection() {
  return (
    <section className="bg-surface-secondary py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll variant="fade-up" className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient">
            Why Businesses Trust Us
          </h2>
        </RevealOnScroll>

        {/* Stats — CountUpOnView with stagger */}
        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          staggerDelay={0.1}
        >
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <RevealOnScroll variant="fade-up">
                <div
                  className={`bg-surface rounded-xl p-8 border border-border hover:border-amber/20 transition-colors duration-300 ${stat.colSpan || ""}`}
                >
                  <p className="text-4xl font-bold text-amber font-display mb-2">
                    <CountUpOnView
                      target={stat.numericValue}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals ?? 0}
                      duration={2000}
                    />
                  </p>
                  <p className="text-warm-gray">{stat.label}</p>
                </div>
              </RevealOnScroll>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
