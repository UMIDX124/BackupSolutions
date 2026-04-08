"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import {
  TextReveal,
  MagneticHover,
  FloatingElement,
} from "@/components/animations/ScrollAnimations";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  // Parallax: video moves slower than scroll
  const videoScale = useTransform(heroScroll, [0, 1], [1, 1.3]);
  const videoOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const videoY = useTransform(heroScroll, [0, 1], [0, -80]); // slower parallax
  const contentY = useTransform(heroScroll, [0, 1], [0, 150]);
  const smoothContentY = useSpring(contentY, { stiffness: 60, damping: 15 });
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section ref={(el) => { (ref as React.MutableRefObject<HTMLElement | null>).current = el; (heroRef as React.MutableRefObject<HTMLElement | null>).current = el; }} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background — parallax zoom on scroll (moves slower) */}
      <motion.video
        src="/hero_loop.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ scale: videoScale, opacity: videoOpacity, y: videoY }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(13, 13, 13, 0.4) 0%, rgba(13, 13, 13, 0.7) 50%, #0D0D0D 100%)",
        }}
      />

      {/* Floating particle decorations that move with scroll */}
      <FloatingElement
        className="absolute top-[15%] left-[10%] w-2 h-2 rounded-full bg-amber/20 pointer-events-none"
        amplitude={25}
        speed={6}
      >
        <div className="w-2 h-2 rounded-full bg-amber/30" />
      </FloatingElement>
      <FloatingElement
        className="absolute top-[30%] right-[15%] w-3 h-3 rounded-full pointer-events-none"
        amplitude={18}
        speed={5}
      >
        <div className="w-3 h-3 rounded-full bg-copper/20" />
      </FloatingElement>
      <FloatingElement
        className="absolute bottom-[25%] left-[20%] pointer-events-none"
        amplitude={20}
        speed={7}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-amber/25" />
      </FloatingElement>
      <FloatingElement
        className="absolute top-[60%] right-[8%] pointer-events-none"
        amplitude={12}
        speed={4}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-amber/15" />
      </FloatingElement>
      <FloatingElement
        className="absolute top-[20%] right-[40%] pointer-events-none"
        amplitude={30}
        speed={8}
        scrollLinked
      >
        <div className="w-1 h-1 rounded-full bg-copper/30" />
      </FloatingElement>

      {/* Content — floats up on scroll parallax */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ y: smoothContentY }}
      >
        {/* Label */}
        <motion.p
          variants={itemVariants}
          className="font-mono text-sm tracking-[0.3em] uppercase text-amber"
        >
          PROTECT. CONNECT. PERFECT.
        </motion.p>

        {/* Main Heading — TextReveal word by word */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-warm-white leading-tight"
        >
          <TextReveal
            text="Enterprise Technology That Never Fails"
            delay={0.5}
            wordDelay={0.08}
          />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-warm-gray max-w-2xl"
        >
          We architect resilience and engineer innovation — protecting your data,
          connecting your systems, and perfecting your digital presence.
        </motion.p>

        {/* CTA Buttons — MagneticHover */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mt-4"
        >
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
              href="/case-studies"
              className="border border-warm-gray text-warm-white px-8 py-4 rounded-lg hover:border-amber/50 transition-colors text-center inline-block"
            >
              View Our Work
            </Link>
          </MagneticHover>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <ChevronDown className="w-6 h-6 text-warm-gray animate-bounce" />
      </motion.div>
    </section>
  );
}
