import { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ProofBar from "@/components/sections/ProofBar";
import LatestInsights from "@/components/sections/LatestInsights";
import FreeResources from "@/components/sections/FreeResources";
import ProcessSection from "@/components/sections/ProcessSection";
import PillarsSection from "@/components/sections/PillarsSection";
import CaseStudiesPreview from "@/components/sections/CaseStudiesPreview";
import ProofSection from "@/components/sections/ProofSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Backup Solutions | Enterprise Technology That Never Fails",
  description:
    "We architect resilience and engineer innovation — protecting your data, connecting your systems, and perfecting your digital presence. Pakistan's leading tech company serving global markets since 2018.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProofBar />
      <LatestInsights />
      <FreeResources />
      <ProcessSection />
      <PillarsSection />
      <CaseStudiesPreview />
      <ProofSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
