"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  function handleAccept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 z-50 w-full border-t border-border bg-surface"
        >
          <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-5 sm:flex-row sm:justify-between lg:px-8">
            {/* Close Button */}
            <button
              onClick={handleDecline}
              aria-label="Close cookie banner"
              className="absolute right-4 top-3 text-warm-gray transition hover:text-warm-white sm:right-6"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Message */}
            <p className="pr-8 text-sm text-warm-gray sm:pr-0">
              We use cookies to enhance your experience.{" "}
              <Link
                href="/privacy-policy"
                className="underline transition hover:text-amber"
              >
                Learn more
              </Link>
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleDecline}
                className="rounded-lg border border-border px-5 py-2 text-sm font-medium text-warm-gray transition hover:border-amber hover:text-amber"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="rounded-lg bg-amber px-5 py-2 text-sm font-semibold text-background transition hover:bg-amber/90"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
