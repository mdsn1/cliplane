import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Cliplane's privacy policy — how we collect, use, and protect your data. GDPR and CCPA compliant.",
  path: "/privacy-policy",
  noIndex: false,
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="section-pad">
        <div className="container-max max-w-3xl">
          <h1 className="font-extrabold text-[var(--text-primary)] mb-3" style={{ fontSize: "clamp(24px,4vw,40px)", letterSpacing: "-0.02em" }}>
            Privacy Policy
          </h1>
          <p className="text-xs text-[var(--text-tertiary)] mb-8">Last updated: January 1, 2026</p>

          <div className="prose-custom space-y-8 text-sm text-[var(--text-secondary)] leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">1. Overview</h2>
              <p>Cliplane ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your personal data. We comply with the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">2. Information We Collect</h2>
              <p className="mb-2"><strong className="text-[var(--text-primary)]">We do NOT collect:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>URLs you submit for downloading</li>
                <li>Your IP address</li>
                <li>Your name or email address (unless you contact us or subscribe)</li>
                <li>Download history tied to your identity</li>
              </ul>
              <p className="mt-3 mb-2"><strong className="text-[var(--text-primary)]">We DO collect (anonymously):</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Platform type (e.g. "TikTok") — not the specific URL</li>
                <li>Quality level selected (e.g. "720p")</li>
                <li>Timestamp of download request</li>
                <li>General geographic region (country level only, derived from IP which is not stored)</li>
              </ul>
              <p className="mt-3"><strong className="text-[var(--text-primary)]">When you contact us or subscribe:</strong> We collect your name and email address solely to respond to your inquiry or manage your subscription.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">3. Cookies</h2>
              <p>We use minimal, essential cookies only:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong className="text-[var(--text-primary)]">Theme preference:</strong> Stores dark/light mode preference. No expiry.</li>
                <li><strong className="text-[var(--text-primary)]">Cookie consent:</strong> Records your consent choice. 12-month expiry.</li>
              </ul>
              <p className="mt-2">We do not use tracking cookies, advertising cookies, or third-party analytics cookies without your consent.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">4. Third-Party Services</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-[var(--text-primary)]">Stripe:</strong> Processes payments. Subject to Stripe's Privacy Policy.</li>
                <li><strong className="text-[var(--text-primary)]">Supabase:</strong> Database for subscription records only.</li>
                <li><strong className="text-[var(--text-primary)]">Ezoic/Advertising:</strong> We may serve ads via Ezoic. These may use cookies subject to their own policies. You can opt out via cookie consent.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">5. GDPR Rights (EU/UK Residents)</h2>
              <p>You have the right to: access your data; rectification; erasure; restriction of processing; data portability; and to object to processing. Since we collect minimal personal data, most of these rights are satisfied by default. Contact us at privacy@cliplane.com to exercise any right.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">6. CCPA Rights (California Residents)</h2>
              <p>California residents have the right to know what personal information we collect, to delete that information, to opt out of the sale of personal information (we do not sell personal information), and to non-discrimination for exercising these rights. Contact us at privacy@cliplane.com.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">7. Data Retention</h2>
              <p>Anonymous analytics are retained for 12 months. Subscription data is retained while your account is active and for 3 months after cancellation for accounting purposes. Contact form submissions are retained for 6 months.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">8. Security</h2>
              <p>We implement industry-standard security measures including HTTPS/TLS encryption, database encryption at rest, and strict access controls. However, no method of transmission over the internet is 100% secure.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">9. Children's Privacy</h2>
              <p>Cliplane is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us personal information, contact us immediately.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">10. Contact</h2>
              <p>For privacy-related inquiries: privacy@cliplane.com</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
