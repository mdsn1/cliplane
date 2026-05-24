import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buildMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "Copyright Policy",
  description: "Cliplane's copyright policy, how we handle DMCA notices, and our commitment to respecting intellectual property rights.",
  path: "/copyright",
});

export default function CopyrightPage() {
  return (
    <>
      <Header />
      <main className="section-pad">
        <div className="container-max max-w-3xl">
          <h1 className="font-extrabold text-[var(--text-primary)] mb-3" style={{ fontSize: "clamp(24px,4vw,40px)", letterSpacing: "-0.02em" }}>
            Copyright Policy
          </h1>
          <p className="text-xs text-[var(--text-tertiary)] mb-8">Last updated: January 1, 2026</p>

          <div className="space-y-8 text-sm text-[var(--text-secondary)] leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">Our Commitment</h2>
              <p>Cliplane respects the intellectual property rights of content creators, copyright owners, and all rights holders. We are committed to operating in compliance with the Digital Millennium Copyright Act (DMCA) and equivalent laws in other jurisdictions.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">What Cliplane Does</h2>
              <p>Cliplane provides a technical tool that allows users to download publicly available video content from supported platforms for personal use. We do not host video content ourselves — our service accesses publicly available streams that the user's own browser could access directly.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">User Responsibility</h2>
              <p>Users of Cliplane are solely responsible for ensuring that their use of downloaded content complies with applicable copyright law and the terms of service of the originating platform. Cliplane does not encourage, endorse, or facilitate copyright infringement.</p>
              <p className="mt-2">Permitted uses include:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Personal, offline viewing of content you have the right to access</li>
                <li>Archiving your own published content from platforms</li>
                <li>Educational fair use in accordance with applicable law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">DMCA Safe Harbour</h2>
              <p>Cliplane operates in good faith under the DMCA safe harbour provisions for service providers. We promptly respond to valid takedown notices and implement a repeat infringer policy.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">Filing a DMCA Notice</h2>
              <p>If you believe content accessible via Cliplane infringes your copyright, please submit a formal notice at our <Link href="/dmca" className="text-[#3B82F6] hover:underline">DMCA page</Link>. Valid notices will be processed within 48 hours.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">Repeat Infringers</h2>
              <p>Cliplane will take appropriate action against users who repeatedly infringe copyright, including terminating their access to the Service in appropriate circumstances.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">Contact</h2>
              <p>Copyright-related enquiries: dmca@cliplane.com</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
