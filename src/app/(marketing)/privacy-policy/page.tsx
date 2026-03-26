import { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Backup Solutions. Learn how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <h1 className="text-4xl font-display font-bold mt-8 mb-4">Privacy Policy</h1>
      <p className="text-warm-gray mb-12">Last updated: March 1, 2025</p>

      <div className="prose prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">1. Introduction</h2>
          <p className="text-warm-gray leading-relaxed">
            Backup Solutions LLC (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to
            protecting your personal data. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you visit our website or use our services. This policy
            applies to all users globally, including those in the European Economic Area (EEA), United
            Kingdom, and other jurisdictions with data protection laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">2. Information We Collect</h2>
          <h3 className="text-xl font-semibold text-foreground mt-4">Personal Information You Provide</h3>
          <ul className="text-warm-gray space-y-2 list-disc list-inside">
            <li>Name and email address (contact forms, newsletter signup)</li>
            <li>Company name and phone number (consultation requests)</li>
            <li>Message content submitted through our forms</li>
          </ul>
          <h3 className="text-xl font-semibold text-foreground mt-4">Automatically Collected Information</h3>
          <ul className="text-warm-gray space-y-2 list-disc list-inside">
            <li>IP address and browser type</li>
            <li>Device information and operating system</li>
            <li>Pages visited and time spent on our website</li>
            <li>Referring website and search terms</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">3. How We Use Your Information</h2>
          <ul className="text-warm-gray space-y-2 list-disc list-inside">
            <li>To respond to your inquiries and provide requested services</li>
            <li>To send you newsletters and marketing communications (with your consent)</li>
            <li>To improve our website and user experience</li>
            <li>To analyze website traffic and usage patterns</li>
            <li>To comply with legal obligations</li>
            <li>To display relevant advertisements (Google AdSense)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">4. Cookies and Tracking</h2>
          <p className="text-warm-gray leading-relaxed">
            We use cookies and similar technologies to enhance your browsing experience, analyze
            site traffic, and serve personalized advertisements. You can manage cookie preferences
            through our cookie consent banner or your browser settings.
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-4">Types of Cookies We Use</h3>
          <ul className="text-warm-gray space-y-2 list-disc list-inside">
            <li><strong>Essential cookies:</strong> Required for website functionality</li>
            <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
            <li><strong>Advertising cookies:</strong> Used to deliver relevant advertisements via Google AdSense</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">5. Third-Party Services</h2>
          <p className="text-warm-gray leading-relaxed">
            We may use third-party services including Google Analytics, Google AdSense, and email
            service providers. These services may collect information about your browsing activity
            across different websites. We recommend reviewing their respective privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">6. Data Retention</h2>
          <p className="text-warm-gray leading-relaxed">
            We retain personal data only as long as necessary to fulfill the purposes for which it
            was collected, typically no longer than 24 months for marketing data and as required by
            applicable laws for transactional records.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">7. Your Rights (GDPR / CCPA)</h2>
          <p className="text-warm-gray leading-relaxed">Depending on your jurisdiction, you may have the right to:</p>
          <ul className="text-warm-gray space-y-2 list-disc list-inside">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
            <li>Lodge a complaint with a supervisory authority</li>
          </ul>
          <p className="text-warm-gray leading-relaxed mt-3">
            To exercise any of these rights, contact us at backupsolutions1122@gmail.com.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">8. Children&apos;s Privacy (COPPA)</h2>
          <p className="text-warm-gray leading-relaxed">
            Our services are not directed to children under 13. We do not knowingly collect personal
            information from children. If you believe we have collected information from a child,
            please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">9. Data Security</h2>
          <p className="text-warm-gray leading-relaxed">
            We implement appropriate technical and organizational security measures to protect your
            personal data against unauthorized access, alteration, disclosure, or destruction.
            However, no internet transmission is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">10. Changes to This Policy</h2>
          <p className="text-warm-gray leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of material changes
            by posting the updated policy on this page with a revised &quot;Last updated&quot; date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">11. Contact Us</h2>
          <p className="text-warm-gray leading-relaxed">
            For questions about this Privacy Policy or your data, contact us at:
          </p>
          <div className="text-warm-gray mt-3">
            <p>Backup Solutions LLC</p>
            <p>Lahore, Pakistan</p>
            <p>Email: backupsolutions1122@gmail.com</p>
          </div>
        </section>
      </div>
    </div>
  );
}
