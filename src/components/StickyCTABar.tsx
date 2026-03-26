"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

export default function StickyCTABar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("sticky-cta-dismissed")) {
      setDismissed(true);
      return;
    }

    const handleScroll = () => {
      setVisible(window.scrollY > 800);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function dismiss() {
    setDismissed(true);
    localStorage.setItem("sticky-cta-dismissed", "true");
  }

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-lg border-t border-border px-6 py-3"
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <p className="text-sm text-warm-gray hidden sm:block">
              Ready to transform your technology infrastructure?
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/free-consultation"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber to-copper text-background text-sm font-semibold rounded-lg hover:brightness-110 transition-all"
              >
                Free Consultation
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={dismiss}
                className="p-2 text-warm-gray hover:text-foreground transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
