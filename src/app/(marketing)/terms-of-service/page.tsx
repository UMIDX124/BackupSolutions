import { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Backup Solutions. Read our terms and conditions for using our services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <Breadcrumbs items={[{ label: "Terms of Service" }]} />

      <h1 className="text-4xl font-display font-bold mt-8 mb-4">Terms of Service</h1>
      <p className="text-warm-gray mb-12">Last updated: March 1, 2025</p>

      <div className="prose prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p className="text-warm-gray leading-relaxed">
            By accessing or using the services provided by Backup Solutions LLC (&quot;Company,&quot;
            &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree to be bound by these Terms of Service. If you do not
            agree to all terms and conditions, you may not access or use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">2. Description of Services</h2>
          <p className="text-warm-gray leading-relaxed">
            Backup Solutions provides technology consulting, web development, software engineering,
            and AI modeling services. The specific scope, deliverables, and timeline for any project
            will be outlined in a separate service agreement or statement of work.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">3. User Responsibilities</h2>
          <ul className="text-warm-gray space-y-2 list-disc list-inside">
            <li>Provide accurate and complete information when using our services</li>
            <li>Maintain the confidentiality of any account credentials</li>
            <li>Not use our services for any unlawful purpose</li>
            <li>Not attempt to interfere with or disrupt our services</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">4. Intellectual Property</h2>
          <p className="text-warm-gray leading-relaxed">
            All content on our website, including text, graphics, logos, and software, is the
            property of Backup Solutions LLC and is protected by intellectual property laws. Client
            deliverables become the property of the client upon full payment, unless otherwise
            specified in the service agreement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">5. Payment Terms</h2>
          <p className="text-warm-gray leading-relaxed">
            Payment terms, including amounts, schedules, and methods, will be outlined in individual
            service agreements. Unless otherwise stated, invoices are due within 30 days of issuance.
            Late payments may incur interest at a rate of 1.5% per month.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">6. Limitation of Liability</h2>
          <p className="text-warm-gray leading-relaxed">
            To the fullest extent permitted by law, Backup Solutions LLC shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages, or any loss of profits
            or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill,
            or other intangible losses. Our total liability shall not exceed the amount paid by you
            for the services in the twelve (12) months preceding the claim.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">7. Warranty Disclaimer</h2>
          <p className="text-warm-gray leading-relaxed">
            Our services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind,
            either express or implied, including but not limited to implied warranties of
            merchantability, fitness for a particular purpose, and non-infringement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">8. Indemnification</h2>
          <p className="text-warm-gray leading-relaxed">
            You agree to indemnify and hold harmless Backup Solutions LLC, its founders, employees,
            and affiliates from any claims, damages, losses, liabilities, and expenses arising out
            of your use of our services or violation of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">9. Termination</h2>
          <p className="text-warm-gray leading-relaxed">
            Either party may terminate a service agreement with 30 days written notice. We reserve
            the right to suspend or terminate access to our website and services at our discretion,
            without notice, for conduct that we believe violates these Terms or is harmful to other
            users, us, or third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">10. Governing Law</h2>
          <p className="text-warm-gray leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of Pakistan.
            Any disputes arising under these Terms shall be subject to the exclusive jurisdiction
            of the courts located in Lahore, Pakistan.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">11. Dispute Resolution</h2>
          <p className="text-warm-gray leading-relaxed">
            Before initiating any legal proceedings, both parties agree to attempt to resolve
            disputes through good-faith negotiation. If negotiation fails, disputes shall be
            resolved through binding arbitration in Lahore, Pakistan, in accordance with the
            Arbitration Act of Pakistan.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">12. Changes to Terms</h2>
          <p className="text-warm-gray leading-relaxed">
            We reserve the right to modify these Terms at any time. Changes become effective upon
            posting to this page. Your continued use of our services after changes are posted
            constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground">13. Contact</h2>
          <p className="text-warm-gray leading-relaxed">
            For questions about these Terms, contact us at:
          </p>
          <div className="text-warm-gray mt-3">
            <p>Backup Solutions LLC</p>
            <p>Lahore, Pakistan</p>
            <p>Email: hello@backupsolutions.tech</p>
          </div>
        </section>
      </div>
    </div>
  );
}
