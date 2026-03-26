"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Shield, Cloud, Zap } from "lucide-react";
import {
  RevealOnScroll,
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/ScrollAnimations";

const resources = [
  {
    slug: "data-protection-guide",
    icon: Shield,
    title: "Complete Data Protection Guide",
    description:
      "Comprehensive backup strategies covering on-premises, cloud, and hybrid environments. Learn retention policies, encryption best practices, and disaster recovery planning.",
  },
  {
    slug: "cloud-migration-playbook",
    icon: Cloud,
    title: "Cloud Migration Playbook",
    description:
      "Step-by-step migration guide for moving workloads to AWS, Azure, or GCP. Includes risk assessment templates, rollback procedures, and cost optimization tips.",
  },
  {
    slug: "performance-optimization-kit",
    icon: Zap,
    title: "Performance Optimization Kit",
    description:
      "Speed optimization toolkit with actionable checklists for frontend performance, database tuning, CDN configuration, and infrastructure scaling.",
  },
];

export default function FreeResources() {
  return (
    <section className="bg-surface-secondary py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <RevealOnScroll variant="fade-up" className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient mb-4">
            Free Resources
          </h2>
          <p className="text-warm-gray text-lg max-w-2xl mx-auto">
            Practical guides and toolkits to help you strengthen your
            infrastructure and accelerate growth.
          </p>
        </RevealOnScroll>

        {/* Cards — fade-left reveal with stagger */}
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.15}>
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <StaggerItem key={resource.slug}>
                <RevealOnScroll variant="fade-left">
                  <Link
                    href={`/guides/${resource.slug}`}
                    className="group block h-full bg-surface rounded-xl p-8 border border-border hover:border-amber/30 hover:shadow-lg hover:shadow-amber/5 transition-all duration-300"
                  >
                    {/* Icon with pulse on hover */}
                    <div className="w-12 h-12 rounded-full bg-amber/10 flex items-center justify-center mb-6 group-hover:bg-amber/20 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6 text-amber" />
                    </div>

                    <h3 className="font-display font-semibold text-warm-white text-lg mb-3 group-hover:text-amber transition-colors">
                      {resource.title}
                    </h3>

                    <p className="text-warm-gray text-sm leading-relaxed mb-6">
                      {resource.description}
                    </p>

                    <span className="text-amber text-sm font-medium group-hover:tracking-wider transition-all duration-300">
                      Download Free →
                    </span>
                  </Link>
                </RevealOnScroll>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
