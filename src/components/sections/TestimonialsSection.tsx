"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { RevealOnScroll } from "@/components/animations/ScrollAnimations";

const testimonials = [
  {
    quote:
      "Backup Solutions transformed our entire digital infrastructure. Their team's expertise in web architecture is unmatched.",
    name: "Sarah Chen",
    title: "CTO at TechMart",
  },
  {
    quote:
      "The security audit alone saved us from potential million-dollar breaches. Their proactive approach is what sets them apart.",
    name: "James Morrison",
    title: "VP Engineering at SecureBank",
  },
  {
    quote:
      "Working with Backup Solutions felt like having an elite tech team in-house. They delivered beyond our expectations.",
    name: "Aisha Khan",
    title: "CEO at DataFlow",
  },
  {
    quote:
      "Their AI modeling solutions gave us insights we didn't even know were possible. A true game-changer for our analytics.",
    name: "Michael Torres",
    title: "Head of Data at InsightPro",
  },
  {
    quote:
      "From concept to deployment, their software engineering team maintained exceptional quality. Highly recommend.",
    name: "Emma Williams",
    title: "Product Director at CloudSync",
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  // Parallax for decorative background quote mark
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const quoteY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const smoothQuoteY = useSpring(quoteY, { stiffness: 60, damping: 20 });

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  // More dramatic 3D perspective slide variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      rotateY: dir > 0 ? 15 : -15,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      rotateY: dir > 0 ? -15 : 15,
      scale: 0.9,
      transition: { duration: 0.4 },
    }),
  };

  return (
    <section ref={ref} className="py-24 px-4 relative overflow-hidden">
      {/* Parallax decorative quote mark in background */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none select-none"
        style={{ y: smoothQuoteY }}
      >
        <span className="text-[200px] md:text-[300px] leading-none font-display text-amber/[0.04]">
          &ldquo;
        </span>
      </motion.div>

      <div className="max-w-3xl mx-auto text-center relative">
        <RevealOnScroll variant="fade-up">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-16">
            What Our Clients Say
          </h2>
        </RevealOnScroll>

        <div className="relative min-h-[280px] flex items-center justify-center" style={{ perspective: "1000px" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex flex-col items-center justify-center px-4"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Quote marks */}
              <span className="text-amber text-6xl font-display leading-none mb-4 select-none">
                &ldquo;
              </span>

              <p className="text-lg md:text-xl italic text-foreground leading-relaxed mb-8 max-w-2xl">
                {testimonials[current].quote}
              </p>

              <div>
                <p className="font-bold text-foreground font-display">
                  {testimonials[current].name}
                </p>
                <p className="text-warm-gray text-sm">
                  {testimonials[current].title}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="text-warm-gray hover:text-amber transition-colors duration-200 p-2"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-amber w-6"
                    : "bg-warm-gray/30 hover:bg-warm-gray/60"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="text-warm-gray hover:text-amber transition-colors duration-200 p-2"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
