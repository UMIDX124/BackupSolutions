"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  RevealOnScroll,
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/ScrollAnimations";

const faqs = [
  {
    question: "What services does Backup Solutions offer?",
    answer:
      "We specialize in three core areas: Web Architecture, Software Engineering, and AI Modeling. Our Web Architecture team designs and builds high-performance, scalable web platforms. Our Software Engineering division develops custom applications and enterprise systems. Our AI Modeling practice delivers machine learning solutions, predictive analytics, and intelligent automation tailored to your business needs.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most projects range from 4 to 12 weeks depending on scope and complexity. A focused landing page or MVP might take 4-6 weeks, while a full enterprise platform with custom integrations typically requires 8-12 weeks. We provide detailed timelines during our free consultation and keep you updated at every milestone.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Absolutely. While we are headquartered in Lahore, Pakistan, we serve clients across 15+ countries globally. Our team operates across time zones to ensure seamless communication and collaboration. We use modern project management tools and maintain regular check-ins regardless of your location.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "Our core technology stack includes React, Next.js, and Node.js for web development; Python for AI/ML and backend services; and major cloud platforms including AWS, Google Cloud, and Azure. We also work extensively with TypeScript, PostgreSQL, MongoDB, Docker, Kubernetes, and leading AI/ML frameworks like TensorFlow and PyTorch.",
  },
  {
    question: "How do you ensure project security?",
    answer:
      "Security is embedded in every stage of our development process. We follow SOC2 compliance standards, implement end-to-end encryption for all data in transit and at rest, and conduct regular security audits and penetration testing. Our team stays current with the latest security best practices and vulnerability patches.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "We offer flexible pricing through both project-based and retainer models. Project-based pricing provides a fixed cost for defined deliverables, ideal for one-time builds. Retainer agreements offer ongoing development and support at a predictable monthly rate. Every engagement begins with a free consultation where we scope your project and provide a detailed proposal.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-display font-medium text-foreground pr-8 group-hover:text-amber transition-colors duration-200">
          {question}
        </span>
        <motion.span
          className="text-amber text-2xl font-light flex-shrink-0 w-6 h-6 flex items-center justify-center"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.25, ease: "easeOut" },
            }}
            className="overflow-hidden"
          >
            <p className="text-warm-gray leading-relaxed pb-6 pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const ref = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="bg-surface-secondary py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <RevealOnScroll variant="fade-up" className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient">
            Frequently Asked Questions
          </h2>
        </RevealOnScroll>

        {/* FAQ items — staggered on scroll */}
        <StaggerChildren staggerDelay={0.08}>
          {faqs.map((faq, index) => (
            <StaggerItem key={index}>
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
