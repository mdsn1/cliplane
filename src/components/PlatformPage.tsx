import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { UrlInput } from "@/components/download/UrlInput";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";
import { AdSlot } from "@/components/AdSlot";
import { ScrollTopButton } from "@/components/ScrollTopButton";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

interface PlatformPageProps {
  platform: string;
  title: string;
  subtitle: string;
  description: string;
  howToSteps: string[];
  whyPoints: string[];
  faqs: FAQItem[];
  relatedPlatforms: { name: string; href: string }[];
  schemaName: string;
}

export function PlatformPage({
  platform,
  title,
  subtitle,
  description,
  howToSteps,
  whyPoints,
  faqs,
  relatedPlatforms,
  schemaName,
}: PlatformPageProps) {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="section-pad border-b border-[var(--border)]">
        <div className="container-max max-w-4xl text-center flex flex-col items-center gap-6">
          <h1
            className="font-extrabold text-[var(--text-primary)]"
            style={{ fontSize: "clamp(28px,5vw,52px)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            {title}
          </h1>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
            {subtitle}
          </p>
          <div className="w-full max-w-3xl mt-2">
            <UrlInput defaultPlatform={platform} />
          </div>
        </div>
      </section>

      {/* Leaderboard ad */}
      <div className="container-max py-4">
        <AdSlot position="leaderboard" id={`ez-${platform}-leaderboard`} />
      </div>

      {/* Two-column layout on desktop */}
      <div className="container-max py-12 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
        <main className="flex flex-col gap-12">
          {/* Description */}
          <section>
            <p className="text-[var(--text-secondary)] leading-relaxed">{description}</p>
          </section>

          {/* How to */}
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">How to Use Cliplane</h2>
            <ol className="space-y-4">
              {howToSteps.map((step, i) => (
                <li key={i} className="flex gap-4 items-start rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#3B82F6] text-white text-sm font-bold">
                    {i + 1}
                  </span>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed pt-0.5">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* In-content ad */}
          <AdSlot position="in-content" id={`ez-${platform}-in-content`} />

          {/* Why Cliplane */}
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Why Use Cliplane?</h2>
            <ul className="space-y-3">
              {whyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <CheckCircle className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Frequently Asked Questions</h2>
            <FAQAccordion items={faqs} schemaId={`${platform}-faq`} />
          </section>

          {/* Related platforms */}
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Other Downloaders</h2>
            <div className="flex flex-wrap gap-2">
              {relatedPlatforms.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </section>
        </main>

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col gap-6">
          <AdSlot position="sidebar" id={`ez-${platform}-sidebar`} />
        </aside>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden border-t border-[var(--border)] bg-[var(--bg-secondary)]/95 backdrop-blur-sm p-4 safe-bottom">
        <ScrollTopButton
          label="Download Video Now"
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#3B82F6] py-3 text-base font-semibold text-white"
        />
      </div>

      {/* Schema: WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: schemaName,
            url: `https://cliplane.com/${platform}-downloader`,
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <Footer />
    </>
  );
}
