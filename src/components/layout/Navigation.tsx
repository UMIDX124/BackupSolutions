"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Web Architecture", href: "/services/web-architecture" },
  { label: "Software Engineering", href: "/services/software-engineering" },
  { label: "AI Modeling", href: "/services/ai-modeling" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Results", href: "/results" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="w-full px-6 sm:px-10 py-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo - pinned to left edge */}
            <Link href="/" className="relative -mt-2 flex-shrink-0">
              <div className="relative">
                {/* Glow behind logo */}
                <div className="absolute -inset-4 rounded-full bg-white/5 blur-2xl" />
                <Logo className="relative drop-shadow-[0_4px_12px_rgba(212,168,83,0.3)]" />
              </div>
            </Link>

            {/* Desktop Navigation - centered pill container */}
            <div className="hidden lg:flex lg:items-center lg:justify-center absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2 rounded-full bg-surface/50 backdrop-blur-sm px-4 py-2 border border-border/30">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="relative px-3 py-1.5 text-sm font-medium transition-colors duration-200"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeNav"
                          className="absolute inset-0 rounded-full bg-surface"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                      <span
                        className={`relative z-10 ${
                          isActive
                            ? "text-amber"
                            : "text-warm-gray hover:text-amber"
                        }`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Desktop CTA Button - pinned to right edge */}
            <div className="hidden lg:flex lg:items-center lg:flex-shrink-0 ml-auto">
              <Link
                href="/free-consultation"
                className="group relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber to-copper px-5 py-2.5 text-sm font-semibold text-background transition-all duration-300 hover:shadow-lg hover:shadow-amber/25"
              >
                {/* Pulse glow animation */}
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber to-copper opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-50 animate-pulse" />
                <span className="relative">Free Consultation</span>
                <ArrowRight className="relative h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden relative z-[70] flex h-10 w-10 items-center justify-center rounded-lg text-warm-gray transition-colors hover:text-amber hover:bg-surface/50"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            >
              {isMobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 z-[60] h-full w-[85%] max-w-sm bg-background border-l border-border/50 shadow-2xl shadow-black/50 lg:hidden"
            >
              <div className="flex h-full flex-col px-6 pt-24 pb-8">
                {/* Nav links */}
                <div className="flex-1 space-y-1 overflow-y-auto">
                  {navLinks.map((link, index) => {
                    const isActive = pathname === link.href;

                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={`flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200 ${
                            isActive
                              ? "bg-surface text-amber"
                              : "text-warm-gray hover:bg-surface/50 hover:text-amber"
                          }`}
                        >
                          {isActive && (
                            <span className="mr-3 h-1.5 w-1.5 rounded-full bg-amber" />
                          )}
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 border-t border-border/50 pt-6"
                >
                  <Link
                    href="/free-consultation"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber to-copper px-5 py-3 text-base font-semibold text-background transition-all duration-300 hover:shadow-lg hover:shadow-amber/25"
                  >
                    Free Consultation
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
