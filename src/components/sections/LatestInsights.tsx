"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import {
  TiltCard,
  RevealOnScroll,
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/ScrollAnimations";

const posts = [
  {
    slug: "zero-downtime-deployment-strategies",
    category: "Engineering",
    categoryColor: "bg-amber/20 text-amber",
    title: "Zero-Downtime Deployment Strategies for Enterprise Applications",
    excerpt:
      "Learn how to implement blue-green deployments, canary releases, and rolling updates to achieve seamless production deployments.",
    date: "Mar 18, 2026",
    readTime: "8 min read",
  },
  {
    slug: "ai-powered-threat-detection",
    category: "Security",
    categoryColor: "bg-copper/20 text-copper",
    title: "AI-Powered Threat Detection: Protecting Modern Infrastructure",
    excerpt:
      "How machine learning models are transforming cybersecurity by identifying anomalies and preventing breaches in real time.",
    date: "Mar 12, 2026",
    readTime: "6 min read",
  },
  {
    slug: "multi-cloud-backup-architecture",
    category: "Backup",
    categoryColor: "bg-sage/20 text-sage",
    title: "Designing a Multi-Cloud Backup Architecture",
    excerpt:
      "A comprehensive guide to building resilient backup systems that span AWS, Azure, and GCP for maximum redundancy.",
    date: "Mar 5, 2026",
    readTime: "10 min read",
  },
  {
    slug: "nextjs-performance-optimization",
    category: "Web Dev",
    categoryColor: "bg-amber-light/20 text-amber-light",
    title: "Next.js Performance Optimization: From 3s to 300ms Load Times",
    excerpt:
      "Practical techniques for optimizing Next.js applications including ISR, image optimization, and bundle analysis.",
    date: "Feb 27, 2026",
    readTime: "7 min read",
  },
  {
    slug: "kubernetes-disaster-recovery",
    category: "DevOps",
    categoryColor: "bg-amber/20 text-amber",
    title: "Kubernetes Disaster Recovery: A Complete Playbook",
    excerpt:
      "Step-by-step strategies for backup, failover, and recovery of Kubernetes clusters and stateful workloads.",
    date: "Feb 20, 2026",
    readTime: "12 min read",
  },
  {
    slug: "building-resilient-apis",
    category: "Engineering",
    categoryColor: "bg-copper/20 text-copper",
    title: "Building Resilient APIs with Circuit Breakers and Retries",
    excerpt:
      "Implement fault-tolerant API patterns that gracefully handle failures and maintain service availability.",
    date: "Feb 14, 2026",
    readTime: "9 min read",
  },
];

export default function LatestInsights() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const smoothBgY = useSpring(bgY, { stiffness: 80, damping: 20 });

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      {/* Parallax background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: smoothBgY }}
      >
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-copper/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <RevealOnScroll variant="blur-in" duration={1.2}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient mb-4">
              Latest Insights
            </h2>
          </RevealOnScroll>
          <RevealOnScroll variant="fade-up" delay={0.3}>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              Deep dives into enterprise technology, backup strategies, and modern
              software engineering practices.
            </p>
          </RevealOnScroll>
        </div>

        {/* Blog Grid — fade-up with stagger and TiltCard */}
        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.12}
        >
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <RevealOnScroll variant="fade-up">
                <div style={{ perspective: 800 }}>
                  <TiltCard>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block h-full bg-surface rounded-xl border border-border overflow-hidden hover:border-amber/30 hover:shadow-xl hover:shadow-amber/10 transition-all duration-500"
                    >
                      <div className="p-6 flex flex-col gap-3 h-full">
                        <span className={`inline-block w-fit text-xs font-medium px-3 py-1 rounded-full ${post.categoryColor}`}>
                          {post.category}
                        </span>
                        <h3 className="font-display font-semibold text-warm-white group-hover:text-amber transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-warm-gray line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                          <span className="text-xs text-warm-gray font-mono">{post.date}</span>
                          <span className="text-xs text-warm-gray">·</span>
                          <span className="text-xs text-warm-gray font-mono">{post.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  </TiltCard>
                </div>
              </RevealOnScroll>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
