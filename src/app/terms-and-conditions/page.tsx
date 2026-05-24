import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Terms and Conditions",
  description: "Cliplane's terms and conditions of use, including liability limitations and user responsibilities.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="section-pad">
        <div className="container-max max-w-3xl">
          <h1 className="font-extrabold text-[var(--text-primary)] mb-3" style={{ fontSize: "clamp(24px,4vw,40px)", letterSpacing: "-0.02em" }}>
            Terms and Conditions
          </h1>
          <p className="text-xs text-[var(--text-tertiary)] mb-8">Last updated: January 1, 2026</p>

          <div className="space-y-8 text-sm text-[var(--text-secondary)] leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">1. Acceptance of Terms</h2>
              <p>By using Cliplane ("the Service"), you agree to these Terms and Conditions. If you do not agree, you must not use the Service.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">2. Service Description</h2>
              <p>Cliplane provides a tool to download publicly available videos from supported platforms for personal, non-commercial use. The Service does not support downloading private, paid, or restricted content.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">3. User Responsibilities</h2>
              <p className="mb-2">You agree that you will:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Only download content for personal, non-commercial use</li>
                <li>Respect the intellectual property rights of content creators</li>
                <li>Not use downloaded content to infringe copyright</li>
                <li>Not use the Service to harass, stalk, or harm any individual</li>
                <li>Not attempt to circumvent rate limits, security measures, or access controls</li>
                <li>Not automate, scrape, or bot the Service without written permission</li>
                <li>Comply with the terms of service of all platforms from which you download</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">4. Intellectual Property</h2>
              <p>All content downloaded via Cliplane remains the intellectual property of its original creator or copyright holder. Cliplane does not grant any licence to reproduce, distribute, or create derivative works from downloaded content.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">5. Disclaimer of Warranties</h2>
              <p>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. CLIPLANE MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">6. Limitation of Liability</h2>
              <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, CLIPLANE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF DATA, LOSS OF PROFITS, OR LOSS OF BUSINESS, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE.</p>
              <p className="mt-2">IN NO EVENT SHALL CLIPLANE'S TOTAL CUMULATIVE LIABILITY TO YOU FOR ALL CLAIMS RELATED TO THE SERVICE EXCEED THE GREATER OF: (A) $100 USD; OR (B) THE AMOUNT YOU PAID TO CLIPLANE IN THE 12 MONTHS PRECEDING THE CLAIM.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">7. Indemnification</h2>
              <p>You agree to indemnify, defend, and hold harmless Cliplane and its operators from and against any claims, liabilities, damages, losses, and expenses (including legal fees) arising from your use of the Service, your violation of these Terms, or your infringement of any third-party rights.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">8. DMCA / Copyright</h2>
              <p>We respect intellectual property rights. If you believe that content accessible via our Service infringes your copyright, please submit a notice via our <a href="/dmca" className="text-[#3B82F6] hover:underline">DMCA page</a>. We will process valid notices within 48 hours.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">9. Binding Arbitration</h2>
              <p>Any dispute arising from these Terms or your use of the Service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. You waive any right to a jury trial or class action with respect to such disputes. This clause does not prevent either party from seeking injunctive relief in a court of competent jurisdiction.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">10. Service Availability and Modifications</h2>
              <p>We reserve the right to modify, suspend, or discontinue the Service at any time without notice. We may update these Terms at any time. Continued use of the Service after changes constitutes acceptance.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">11. Governing Law</h2>
              <p>These Terms are governed by the laws of the jurisdiction where Cliplane is incorporated, without regard to conflict of law principles.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">12. Contact</h2>
              <p>For questions about these Terms: legal@cliplane.com</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
