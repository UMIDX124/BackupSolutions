import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://backupsolutions.tech"),
  title: {
    default: "Backup Solutions | Enterprise Technology That Never Fails",
    template: "%s | Backup Solutions",
  },
  description:
    "We architect resilience and engineer innovation — protecting your data, connecting your systems, and perfecting your digital presence. Pakistan's leading tech company serving global markets since 2018.",
  keywords: [
    "Backup Solutions",
    "enterprise technology",
    "data protection",
    "web development",
    "IT services",
    "Pakistan tech company",
    "digital solutions",
    "system integration",
    "cloud services",
    "cybersecurity",
  ],
  authors: [
    { name: "M Faizan Rafiq" },
    { name: "Faizan Ali Malik" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://backupsolutions.tech",
    siteName: "Backup Solutions",
    title: "Backup Solutions | Enterprise Technology That Never Fails",
    description:
      "We architect resilience and engineer innovation — protecting your data, connecting your systems, and perfecting your digital presence.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Backup Solutions - Enterprise Technology That Never Fails",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Backup Solutions | Enterprise Technology That Never Fails",
    description:
      "We architect resilience and engineer innovation — protecting your data, connecting your systems, and perfecting your digital presence.",
    images: ["/og-image.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Backup Solutions",
  url: "https://backupsolutions.tech",
  logo: "https://backupsolutions.tech/logo.png",
  description:
    "Pakistan's leading tech company serving global markets since 2018.",
  foundingDate: "2018",
  founders: [
    {
      "@type": "Person",
      name: "M Faizan Rafiq",
      jobTitle: "Co-Founder",
    },
    {
      "@type": "Person",
      name: "Faizan Ali Malik",
      jobTitle: "Co-Founder",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "Pakistan",
  },
  email: "hello@backupsolutions.tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background font-inter text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
