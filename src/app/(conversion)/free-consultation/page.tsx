"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Clock, CheckCircle, Send, Loader2 } from "lucide-react";
import Logo from "@/components/layout/Logo";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function FreeConsultationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError("");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "free-consultation" }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Something went wrong");
      }
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md text-center"
        >
          <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-sage" />
          </div>
          <h1 className="text-3xl font-display font-bold mb-4">You&apos;re All Set!</h1>
          <p className="text-warm-gray mb-8">
            We&apos;ve received your consultation request. One of our founders will reach out
            within 24 hours to discuss your project.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber hover:text-amber-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Homepage
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal header */}
      <div className="border-b border-border/50 py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="h-8 w-auto" />
          </Link>
          <Link
            href="/"
            className="text-sm text-warm-gray hover:text-foreground transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to site
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left: Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">
                Get Your Free <span className="text-gradient">Consultation</span>
              </h1>
              <p className="text-lg text-warm-gray mb-10">
                Tell us about your project and we&apos;ll provide a custom strategy — no strings attached.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input
                      {...register("name")}
                      className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-colors"
                      placeholder="John Smith"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-colors"
                      placeholder="john@company.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      {...register("company")}
                      className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-colors"
                      placeholder="Acme Inc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      {...register("phone")}
                      className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tell us about your project
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-colors resize-none"
                    placeholder="What challenges are you facing? What are your goals?"
                  />
                </div>

                {serverError && (
                  <p className="text-red-400 text-sm bg-red-400/10 px-4 py-3 rounded-lg">
                    {serverError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber to-copper text-background font-semibold rounded-lg hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {isSubmitting ? "Sending..." : "Get Free Consultation"}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Right: Trust signals */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-8 space-y-8"
            >
              <div className="bg-surface rounded-xl p-8 border border-border">
                <h3 className="text-xl font-display font-semibold mb-6">
                  What You&apos;ll Get
                </h3>
                <ul className="space-y-4">
                  {[
                    "Custom technology strategy tailored to your goals",
                    "Honest assessment of your current infrastructure",
                    "Clear roadmap with actionable next steps",
                    "Cost estimates and timeline projections",
                    "Direct access to a co-founder",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                      <span className="text-warm-gray">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface rounded-xl p-6 border border-border text-center">
                  <Shield className="w-8 h-8 text-amber mx-auto mb-3" />
                  <p className="text-sm text-warm-gray">100% Free, No Obligation</p>
                </div>
                <div className="bg-surface rounded-xl p-6 border border-border text-center">
                  <Clock className="w-8 h-8 text-amber mx-auto mb-3" />
                  <p className="text-sm text-warm-gray">Response Within 24 Hours</p>
                </div>
              </div>

              <div className="bg-surface-secondary rounded-xl p-6 border border-border">
                <p className="text-warm-gray italic text-sm">
                  &quot;Backup Solutions transformed our entire infrastructure. The free consultation
                  alone gave us more clarity than months of internal planning.&quot;
                </p>
                <p className="text-amber text-sm mt-3 font-medium">— CEO, TechMart</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
