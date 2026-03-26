"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Zap } from "lucide-react";

export default function ExitIntentModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("exit-intent-shown")) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShow(true);
        localStorage.setItem("exit-intent-shown", "true");
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    // Only on desktop
    if (window.innerWidth > 768) {
      setTimeout(() => {
        document.addEventListener("mouseleave", handleMouseLeave);
      }, 5000);
    }

    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
        onClick={() => setShow(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-surface rounded-2xl border border-border max-w-md w-full p-8"
        >
          <button
            onClick={() => setShow(false)}
            className="absolute top-4 right-4 text-warm-gray hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-xl bg-amber/10 flex items-center justify-center mb-6">
            <Zap className="w-7 h-7 text-amber" />
          </div>

          <h2 className="text-2xl font-display font-bold mb-3">
            Wait — Don&apos;t Leave Empty-Handed
          </h2>
          <p className="text-warm-gray mb-6">
            Get a free technology consultation with one of our founders. We&apos;ll review your
            current setup and identify opportunities to improve performance, security, and efficiency.
          </p>

          <Link
            href="/free-consultation"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber to-copper text-background font-semibold rounded-lg hover:brightness-110 transition-all"
          >
            Get Free Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="text-xs text-warm-gray text-center mt-4">
            No commitment required. 100% free.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
