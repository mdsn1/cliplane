import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GradientMesh } from "@/components/GradientMesh";
import { UrlInput } from "@/components/download/UrlInput";
import { TrustBadges } from "@/components/TrustBadges";
import { PlatformStrip } from "@/components/PlatformStrip";
import { LiveCounter } from "@/components/LiveCounter";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";
import { AdSlot } from "@/components/AdSlot";
import { ScrollTopButton } from "@/components/ScrollTopButton";
import CheckoutButton from "@/components/CheckoutButton";
import {
  Zap, Shield, Star, Monitor, Smartphone, CheckCircle,
  Download, Clipboard, Play
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cliplane — Download Any Video. No Watermark. No Limits.",
  description:
    "Free video downloader for TikTok, Pinterest, Twitter, Reddit, Facebook, Vimeo, and Dailymotion. No login required. No watermarks. HD quality.",
  alternates: { canonical: "/" },
};

const faqItems: FAQItem[] = [
  { q: "Is Cliplane free to use?", a: "Yes, Cliplane is free to use with up to 10 downloads per day at up to 720p quality. Pro users get unlimited downloads, 1080p+ quality, and additional features." },
  { q: "Do I need to create an account?", a: "No account, no signup, no email address required. Simply paste a URL and download. It's that simple." },
  { q: "Will the videos have watermarks?", a: "Cliplane downloads videos in their original quality without adding any watermarks. Note that some platforms embed watermarks in certain download options." },
  { q: "Which platforms are supported?", a: "Cliplane supports TikTok, Pinterest, Twitter/X, Reddit, Facebook, Vimeo, and Dailymotion. YouTube and Instagram are not supported." },
  { q: "What video quality is available?", a: "Free users can download up to 720p. Pro users can download up to 1080p and original quality, depending on what the source platform provides." },
  { q: "Is it legal to download videos?", a: "Cliplane is intended for personal, offline use of publicly available content. Always respect the copyright of content creators and the terms of service of each platform." },
  { q: "Does Cliplane store my downloaded videos?", a: "No. Videos are streamed directly through our server to your device and never stored. We also do not log your URLs or IP address." },
  { q: "Can I download private videos?", a: "No. Cliplane only supports publicly available content. Private videos, login-gated content, and age-restricted videos cannot be downloaded." },
  { q: "Is there a Chrome extension?", a: "Yes! The Cliplane Chrome extension adds a download button directly on supported platform pages. It's available in the Chrome Web Store." },
  { q: "How do I download a TikTok video without a watermark?", a: "Paste the TikTok video URL into the input bar above. Cliplane fetches the original source video without the platform watermark when available." },
];

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "Videos resolve and download in seconds — no waiting, no queuing." },
  { icon: Star, title: "HD Quality", desc: "Download at the highest available quality, up to 1080p and beyond." },
  { icon: Shield, title: "Private & Secure", desc: "We never store your URLs or personal data. Your downloads are yours alone." },
  { icon: CheckCircle, title: "No Login Required", desc: "No account, no signup, no email. Just paste and download." },
  { icon: Monitor, title: "All Devices", desc: "Works perfectly on desktop, tablet, and mobile browsers." },
  { icon: Smartphone, title: "No Watermarks", desc: "Download clean, watermark-free videos from supported platforms." },
];

const steps = [
  { icon: Clipboard, step: "1", title: "Paste Your URL", desc: "Copy the video URL from any supported platform and paste it into the input bar." },
  { icon: Play, step: "2", title: "Choose Quality", desc: "Select your preferred video quality — from 360p up to 1080p HD or original." },
  { icon: Download, step: "3", title: "Download Instantly", desc: "Click download and your video saves directly to your device. No watermarks." },
];

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <GradientMesh />
        <div className="container-max relative z-10 flex flex-col items-center text-center gap-8 py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
            Free • No Login • No Watermark
          </div>

          <h1
            className="font-extrabold text-[var(--text-primary)] text-balance max-w-4xl"
            style={{ fontSize: "clamp(36px,6vw,72px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
          >
            Download Any Video.<br />
            <span className="text-[#3B82F6]">No Watermark.</span> No Limits.
          </h1>

          <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
            Free downloader for TikTok, Pinterest, Twitter, Reddit, Facebook, Vimeo, and Dailymotion.
            No login required. No software install.
          </p>

          <div className="w-full max-w-3xl">
            <UrlInput />
          </div>

          <TrustBadges />
        </div>
      </section>

      {/* Ad leaderboard */}
      <div className="container-max py-4">
        <AdSlot position="leaderboard" id="ez-hero-leaderboard" />
      </div>

      {/* Platform strip */}
      <section className="section-pad border-t border-[var(--border)]">
        <div className="container-max">
          <p className="text-center text-sm font-medium text-[var(--text-tertiary)] uppercase tracking-widest mb-8">
            Supported Platforms
          </p>
          <PlatformStrip />
        </div>
      </section>

      {/* Live counter */}
      <section className="py-10 border-y border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="container-max flex justify-center">
          <LiveCounter />
        </div>
      </section>

      {/* How it works */}
      <section className="section-pad">
        <div className="container-max">
          <div className="text-center mb-14">
            <h2 className="font-bold text-[var(--text-primary)]" style={{ fontSize: "clamp(28px,4vw,40px)", letterSpacing: "-0.02em" }}>
              How It Works
            </h2>
            <p className="mt-3 text-[var(--text-secondary)] max-w-lg mx-auto">
              Three simple steps to download any video in seconds.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
            {steps.map(({ icon: Icon, step, title, desc }) => (
              <div
                key={step}
                className="relative flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] card-pad hover:translate-y-[-2px] transition-transform duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-muted)] text-[#3B82F6]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-3xl font-black text-[var(--border)] select-none">{step}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-base text-[var(--text-primary)]">{title}</h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="section-pad bg-[var(--bg-secondary)]">
        <div className="container-max">
          <div className="text-center mb-14">
            <h2 className="font-bold text-[var(--text-primary)]" style={{ fontSize: "clamp(28px,4vw,40px)", letterSpacing: "-0.02em" }}>
              Why Cliplane?
            </h2>
            <p className="mt-3 text-[var(--text-secondary)] max-w-lg mx-auto">
              Built to be the fastest, cleanest, most private video downloader online.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] card-pad hover:border-[#3B82F6]/40 hover:translate-y-[-2px] transition-all duration-200"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-muted)]">
                  <Icon className="h-5 w-5 text-[#3B82F6]" />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)]">{title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad">
        <div className="container-max max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="font-bold text-[var(--text-primary)]" style={{ fontSize: "clamp(28px,4vw,40px)", letterSpacing: "-0.02em" }}>
              Frequently Asked Questions
            </h2>
          </div>
          <FAQAccordion items={faqItems} schemaId="homepage-faq" />
        </div>
      </section>

      {/* CTA before footer */}
      <section className="section-pad bg-[var(--bg-secondary)] border-y border-[var(--border)]">
        <div className="container-max text-center flex flex-col items-center gap-6">
          <h2 className="font-bold text-[var(--text-primary)]" style={{ fontSize: "clamp(24px,3vw,36px)", letterSpacing: "-0.02em" }}>
            Ready to download your first video?
          </h2>
          <p className="text-[var(--text-secondary)] max-w-md">
            No account needed. Paste a URL and start downloading in seconds.
          </p>
          <ScrollTopButton
            label="Start Downloading Free"
            showIcon
            className="inline-flex items-center gap-2 rounded-xl bg-[#3B82F6] px-8 py-3.5 text-base font-semibold text-white hover:bg-[#2563EB] hover:shadow-[0_0_24px_rgba(59,130,246,0.3)] transition-all duration-200"
          />
          <CheckoutButton priceId="price_1TaS71RIeoRKMBqGCJgcyPe5" />
        </div>
      </section>

      {/* Schema: WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Cliplane",
            url: "https://cliplane.com",
            description: "Free video downloader for TikTok, Pinterest, Twitter, Reddit, Facebook, Vimeo, and Dailymotion.",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "1243" },
          }),
        }}
      />

      <Footer />
    </>
  );
}
