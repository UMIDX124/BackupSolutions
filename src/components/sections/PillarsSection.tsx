"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Code, Brain } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  RevealOnScroll,
  StaggerChildren,
  StaggerItem,
  MagneticHover,
  ParallaxSection,
} from "@/components/animations/ScrollAnimations";

const services = [
  {
    icon: Globe,
    title: "Web Architecture",
    description:
      "High-performance websites and web applications built with modern frameworks, optimized for speed, security, and scale.",
    href: "/services/web-architecture",
    image: "/feature-server.webp",
  },
  {
    icon: Code,
    title: "Software Engineering",
    description:
      "Custom software development, API integrations, and backend systems designed for reliability and millions of users.",
    href: "/services/software-engineering",
    image: "/feature-server.webp",
  },
  {
    icon: Brain,
    title: "AI Modeling",
    description:
      "Intelligent automation, machine learning solutions, and AI-powered tools that give businesses a competitive edge.",
    href: "/services/ai-modeling",
    image: "/feature-ai.webp",
  },
];

export default function PillarsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="bg-surface-secondary py-24 px-4 relative overflow-hidden">
      {/* Subtle parallax background element */}
      <ParallaxSection offset={20} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-copper/[0.03] rounded-full blur-3xl" />
      </ParallaxSection>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <RevealOnScroll variant="fade-up">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient mb-4">
              Our Core Services
            </h2>
          </RevealOnScroll>
          <RevealOnScroll variant="fade-up" delay={0.1}>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              Three pillars of expertise that power resilient, scalable digital
              experiences.
            </p>
          </RevealOnScroll>
        </div>

        {/* Service Cards — staggered fade-up with MagneticHover */}
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.2}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.title}>
                <MagneticHover strength={0.08}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                  >
                    <Link
                      href={service.href}
                      className="group block bg-surface rounded-2xl overflow-hidden border border-border hover:border-amber/30 transition-all h-full"
                    >
                      {/* Service Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
                        <div className="absolute bottom-4 left-6">
                          <Icon className="w-8 h-8 text-amber drop-shadow-lg" />
                        </div>
                      </div>
                      <div className="p-8 pt-4">

                      {/* Title */}
                      <h3 className="font-display text-2xl font-bold text-warm-white mb-4 group-hover:text-amber transition-colors">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-warm-gray leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Link */}
                      <span className="text-amber text-sm font-medium">
                        Learn More →
                      </span>
                      </div>
                    </Link>
                  </motion.div>
                </MagneticHover>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
