"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { Search, PenTool, Code, Rocket } from "lucide-react";
import {
  RevealOnScroll,
  StaggerChildren,
  StaggerItem,
  ScrollLine,
} from "@/components/animations/ScrollAnimations";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover",
    description:
      "We analyze your infrastructure, identify vulnerabilities, and map your digital landscape.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Design",
    description:
      "Custom architecture blueprints tailored to your specific business requirements.",
  },
  {
    number: "03",
    icon: Code,
    title: "Build",
    description:
      "Agile development with continuous testing and iterative refinement.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch",
    description:
      "Seamless deployment with monitoring, optimization, and ongoing support.",
  },
];

export default function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  // For the animated connecting line
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start end", "end center"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section ref={ref} className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <RevealOnScroll variant="fade-up">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient mb-4">
              How We Work
            </h2>
          </RevealOnScroll>
          <RevealOnScroll variant="fade-up" delay={0.1}>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              A proven methodology that turns complex challenges into reliable,
              scalable solutions.
            </p>
          </RevealOnScroll>
        </div>

        {/* Timeline */}
        <div className="relative" ref={lineRef}>
          {/* Connecting Line — draws itself as user scrolls (horizontal on desktop) */}
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%]">
            <motion.div
              className="h-px bg-amber/30 origin-left"
              style={{ scaleX: lineScale }}
            />
          </div>
          {/* Connecting Line — draws itself vertically on mobile */}
          <div className="md:hidden absolute top-0 bottom-0 left-6">
            <motion.div
              className="w-px bg-amber/30 origin-top"
              style={{ scaleY: lineScale, height: "100%" }}
            />
          </div>

          {/* Steps — staggered fade-right reveal */}
          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6"
            staggerDelay={0.2}
          >
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.number}>
                  <div className="relative pl-16 md:pl-0 md:text-center">
                    {/* Step Dot (mobile) */}
                    <div className="md:hidden absolute left-[18px] top-4 w-3 h-3 rounded-full bg-amber border-2 border-background" />

                    {/* Icon Circle */}
                    <div className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center mx-auto mb-4 md:relative md:z-10">
                      <Icon className="w-6 h-6 text-amber" />
                    </div>

                    {/* Number */}
                    <p className="font-mono text-amber text-sm mb-2">
                      {step.number}
                    </p>

                    {/* Title */}
                    <h3 className="font-display text-xl font-semibold text-warm-white mb-2">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-warm-gray text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
