"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  TextReveal,
  MagneticHover,
  FloatingElement,
  RevealOnScroll,
} from "@/components/animations/ScrollAnimations";

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="py-24 px-4 relative overflow-hidden">
      {/* Ambient gradient background with FloatingElements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(212, 168, 83, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(184, 115, 51, 0.06) 0%, transparent 60%)",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating decorative elements */}
        <FloatingElement
          className="absolute w-[600px] h-[600px] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          amplitude={20}
          speed={8}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(212, 168, 83, 0.06) 0%, transparent 70%)",
            }}
          />
        </FloatingElement>

        <FloatingElement
          className="absolute top-10 left-10"
          amplitude={15}
          speed={6}
          scrollLinked
        >
          <div className="w-3 h-3 rounded-full bg-amber/10" />
        </FloatingElement>

        <FloatingElement
          className="absolute bottom-16 right-16"
          amplitude={12}
          speed={5}
        >
          <div className="w-2 h-2 rounded-full bg-copper/15" />
        </FloatingElement>

        <FloatingElement
          className="absolute top-1/3 right-[10%]"
          amplitude={18}
          speed={7}
          scrollLinked
        >
          <div className="w-4 h-4 rounded-full bg-amber/[0.06]" />
        </FloatingElement>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <RevealOnScroll variant="fade-up">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
            <TextReveal text="Ready to Build Something Unstoppable?" delay={0.2} />
          </h2>
        </RevealOnScroll>

        <RevealOnScroll variant="fade-up" delay={0.2}>
          <p className="text-lg text-warm-gray max-w-xl">
            Let&apos;s discuss how we can transform your digital infrastructure.
          </p>
        </RevealOnScroll>

        <RevealOnScroll variant="fade-up" delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <MagneticHover strength={0.2}>
              <Link
                href="/contact"
                className="bg-amber text-background px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity text-center inline-block"
              >
                Start Your Project
              </Link>
            </MagneticHover>
            <MagneticHover strength={0.2}>
              <Link
                href="/contact?type=consultation"
                className="border border-warm-gray text-foreground px-8 py-4 rounded-lg hover:border-amber/50 transition-colors text-center inline-block"
              >
                Schedule Free Consultation
              </Link>
            </MagneticHover>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
