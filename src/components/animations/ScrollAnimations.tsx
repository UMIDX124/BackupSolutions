"use client";

import { useRef, useEffect, useState, ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
  type TargetAndTransition,
} from "framer-motion";

/* ──────────────────────────────────────────────
   1. ParallaxSection
   Wraps a section; content moves at a different
   speed than scroll.  `offset` range: -50 → 50
   ────────────────────────────────────────────── */
export function ParallaxSection({
  children,
  offset = 30,
  className = "",
}: {
  children: ReactNode;
  offset?: number; // -50 to 50
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const smoothY = useSpring(y, { stiffness: 80, damping: 20 });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y: smoothY }}>{children}</motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   2. RevealOnScroll
   Element fades / slides in when scrolled into
   view. Six variant presets available.
   ────────────────────────────────────────────── */
type RevealVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "blur-in";

const revealInitial: Record<RevealVariant, TargetAndTransition> = {
  "fade-up": { opacity: 0, y: 60 },
  "fade-down": { opacity: 0, y: -60 },
  "fade-left": { opacity: 0, x: -80 },
  "fade-right": { opacity: 0, x: 80 },
  "zoom-in": { opacity: 0, scale: 0.8 },
  "blur-in": { opacity: 0, filter: "blur(10px)" },
};

const revealTarget: Record<RevealVariant, TargetAndTransition> = {
  "fade-up": { opacity: 1, y: 0 },
  "fade-down": { opacity: 1, y: 0 },
  "fade-left": { opacity: 1, x: 0 },
  "fade-right": { opacity: 1, x: 0 },
  "zoom-in": { opacity: 1, scale: 1 },
  "blur-in": { opacity: 1, filter: "blur(0px)" },
};

export function RevealOnScroll({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.8,
  className = "",
}: {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={revealInitial[variant]}
      animate={isInView ? revealTarget[variant] : revealInitial[variant]}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   3. StaggerChildren
   Container that staggers its children's reveal.
   Children must use <StaggerItem>.
   ────────────────────────────────────────────── */
export function StaggerChildren({
  children,
  staggerDelay = 0.12,
  className = "",
}: {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   4. FloatingElement
   Gentle continuous float animation with
   configurable amplitude and speed.
   Uses useScroll for scroll-linked parallax float.
   ────────────────────────────────────────────── */
export function FloatingElement({
  children,
  className = "",
  amplitude = 15,
  speed = 4,
  scrollLinked = false,
}: {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  speed?: number;
  scrollLinked?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scrollY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-amplitude, amplitude, -amplitude]
  );
  const smoothScrollY = useSpring(scrollY, { stiffness: 50, damping: 15 });

  if (scrollLinked) {
    return (
      <motion.div ref={ref} className={className} style={{ y: smoothScrollY }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{ y: [-amplitude, amplitude, -amplitude] }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   5. TextReveal
   Text words animate in one by one when the
   element scrolls into view.
   ────────────────────────────────────────────── */
export function TextReveal({
  text,
  className = "",
  delay = 0,
  wordDelay = 0.06,
}: {
  text: string;
  className?: string;
  delay?: number;
  wordDelay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 20, rotateX: 45 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * wordDelay,
            ease: "easeOut",
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ──────────────────────────────────────────────
   6. CountUpOnView
   Number counts up from 0 to `target` when
   element enters the viewport.  Smooth easing.
   ────────────────────────────────────────────── */
export function CountUpOnView({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2000,
  className = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      setCount(
        decimals > 0
          ? parseFloat(current.toFixed(decimals))
          : Math.floor(current)
      );

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setCount(target);
        setDone(true);
      }
    }

    requestAnimationFrame(tick);
  }, [isInView, target, duration, decimals]);

  return (
    <motion.span
      ref={ref}
      className={className}
      animate={done ? { scale: [1, 1.15, 1] } : {}}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : count}
      {suffix}
    </motion.span>
  );
}

/* ──────────────────────────────────────────────
   7. MagneticHover
   Element subtly follows cursor on hover.
   Great for buttons and interactive cards.
   ────────────────────────────────────────────── */
export function MagneticHover({
  children,
  className = "",
  strength = 0.15,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }

  function handleMouseLeave() {
    if (ref.current) {
      ref.current.style.transform = "translate(0, 0)";
    }
  }

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────
   8. ScrollLine  (bonus)
   A line that draws itself as user scrolls.
   ────────────────────────────────────────────── */
export function ScrollLine({
  direction = "horizontal",
  className = "",
}: {
  direction?: "horizontal" | "vertical";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="bg-amber/30 origin-left"
        style={
          direction === "horizontal"
            ? { scaleX, height: "1px", width: "100%" }
            : { scaleY, width: "1px", height: "100%", originY: 0 }
        }
      />
    </div>
  );
}

/* ──────────────────────────────────────────────
   Legacy exports (preserve backward compat)
   ────────────────────────────────────────────── */

// Alias old BlurReveal to new RevealOnScroll blur-in
export function BlurReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <RevealOnScroll variant="blur-in" delay={delay} duration={1.2} className={className}>
      {children}
    </RevealOnScroll>
  );
}

// Keep ScaleOnScroll
export function ScaleOnScroll({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ scale: smoothScale, opacity }}
    >
      {children}
    </motion.div>
  );
}

// Keep SlideReveal
export function SlideReveal({
  children,
  direction = "left",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  direction?: "left" | "right";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        x: direction === "left" ? -100 : 100,
        rotateY: direction === "left" ? 8 : -8,
      }}
      animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Keep StaggerReveal (legacy alias)
export function StaggerReveal({
  children,
  className = "",
  staggerDelay = 0.12,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <StaggerChildren staggerDelay={staggerDelay} className={className}>
      {children}
    </StaggerChildren>
  );
}

export const staggerChildVariants = staggerItemVariants;

// Keep TiltCard
export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
  }

  function handleMouseLeave() {
    if (ref.current) {
      ref.current.style.transform =
        "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
    }
  }

  return (
    <div
      ref={ref}
      className={`transition-transform duration-500 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
