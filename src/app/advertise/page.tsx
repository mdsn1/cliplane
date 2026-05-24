import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buildMetadata } from "@/lib/metadata";
import { TrendingUp, Globe, Users, Zap } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "Advertise on Cliplane — Reach Millions of Video Enthusiasts",
  description: "Advertise on Cliplane and reach a global audience of video content consumers. Display ads, sponsored content, and direct deals available.",
  path: "/advertise",
});

const stats = [
  { icon: Users, value: "1M+", label: "Monthly Active Users" },
  { icon: Globe, value: "140+", label: "Countries Reached" },
  { icon: TrendingUp, value: "3M+", label: "Monthly Downloads" },
  { icon: Zap, value: "2.5s", label: "Average Session Duration" },
];

export default function AdvertisePage() {
  return (
    <>
      <Header />
      <main className="section-pad">
        <div className="container-max max-w-3xl">
          <h1 className="font-extrabold text-[var(--text-primary)] mb-4" style={{ fontSize: "clamp(28px,5vw,44px)", letterSpacing: "-0.02em" }}>
            Advertise on Cliplane
          </h1>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-10">
            Reach a global audience of engaged users who consume and create video content daily. Cliplane serves millions of downloads every month across 140+ countries.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-5 text-center">
                <Icon className="h-5 w-5 text-[#3B82F6] mx-auto" />
                <span className="text-2xl font-black text-[var(--text-primary)]">{value}</span>
                <span className="text-xs text-[var(--text-tertiary)]">{label}</span>
              </div>
            ))}
          </div>

          {/* Ad formats */}
          <section className="space-y-4 mb-12">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Ad Formats Available</h2>
            {[
              { name: "Leaderboard Banner", size: "728×90", desc: "High-visibility placement below the navigation bar on desktop." },
              { name: "Sidebar Rectangle", size: "300×600", desc: "Premium sidebar position on platform download pages (desktop only)." },
              { name: "In-Content Rectangle", size: "300×250", desc: "Placed within content flow after download results and in blog articles." },
              { name: "Mobile Banner", size: "320×50", desc: "Sticky bottom banner on mobile — high visibility, dismissible after 5 seconds." },
              { name: "Sponsored Content", size: "Custom", desc: "Native editorial content written by your team and published on our blog." },
            ].map((f) => (
              <div key={f.name} className="flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
                <div className="shrink-0 rounded-lg bg-[var(--bg-tertiary)] px-3 py-1 text-xs font-mono text-[var(--text-tertiary)]">{f.size}</div>
                <div>
                  <p className="font-medium text-sm text-[var(--text-primary)]">{f.name}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Audience */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Our Audience</h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              Cliplane users are primarily aged 18–34, tech-savvy, and highly engaged with video content. They span creators, consumers, marketers, and researchers across all major social platforms.
            </p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Top audience verticals: content creation, social media marketing, entertainment, education, and news. Well-suited for VPN services, creative tools, cloud storage, productivity software, and consumer electronics.
            </p>
          </section>

          {/* CTA */}
          <div className="rounded-2xl border border-[#3B82F6]/30 bg-[#3B82F6]/5 p-6 text-center">
            <h2 className="font-bold text-[var(--text-primary)] mb-2">Interested in Advertising?</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-4">Get in touch to discuss rates, placements, and custom deals.</p>
            <Link
              href="/contact?subject=Advertising Inquiry"
              className="inline-flex items-center gap-2 rounded-xl bg-[#3B82F6] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2563EB] transition-colors"
            >
              Contact Our Advertising Team
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
