"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  CountUpOnView,
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/ScrollAnimations";

interface Metric {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

const metrics: Metric[] = [
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 99.99, suffix: "%", label: "Uptime", decimals: 2 },
  { prefix: "<", value: 50, suffix: "ms", label: "Response Times" },
  { value: 150, suffix: "+", label: "Global Clients" },
];

export default function ProofBar() {
  return (
    <section className="bg-surface-secondary border-y border-border py-12 px-4">
      <StaggerChildren
        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0"
        staggerDelay={0.15}
      >
        {metrics.map((metric, index) => (
          <StaggerItem key={metric.label}>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-amber font-display">
                  <CountUpOnView
                    prefix={metric.prefix}
                    target={metric.value}
                    suffix={metric.suffix}
                    decimals={metric.decimals ?? 0}
                    duration={2000}
                  />
                </p>
                <p className="text-sm text-warm-gray mt-1">{metric.label}</p>
              </div>

              {/* Divider */}
              {index < metrics.length - 1 && (
                <div className="hidden md:block w-px h-12 bg-border ml-auto" />
              )}
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
