import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Consultation | Backup Solutions",
  description:
    "Schedule a free consultation with our co-founders. Get a custom technology strategy, infrastructure assessment, and actionable roadmap — no strings attached.",
  openGraph: {
    title: "Free Consultation | Backup Solutions",
    description:
      "Schedule a free consultation with our co-founders. Get a custom technology strategy and actionable roadmap.",
    type: "website",
  },
};

export default function ConversionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
