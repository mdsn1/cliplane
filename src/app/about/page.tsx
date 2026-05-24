import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buildMetadata } from "@/lib/metadata";
import { Shield, Zap, Globe } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "About Cliplane — Our Mission",
  description: "Learn about Cliplane, why we built it, and our commitment to user privacy and a clean experience.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="section-pad">
        <div className="container-max max-w-3xl">
          <h1 className="font-extrabold text-[var(--text-primary)] mb-6" style={{ fontSize: "clamp(28px,5vw,48px)", letterSpacing: "-0.03em" }}>
            About Cliplane
          </h1>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
            Cliplane is a fast, clean, and private video downloader for the platforms where the world shares video — TikTok, Pinterest, Twitter, Reddit, Facebook, Vimeo, and Dailymotion.
          </p>

          <section className="space-y-8">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3B82F6]/10">
                  <Zap className="h-5 w-5 text-[#3B82F6]" />
                </div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Why We Built This</h2>
              </div>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Most video downloader sites are littered with fake download buttons, malware warnings, and aggressive ad placements designed to confuse users. We built Cliplane to be the tool we wanted to use ourselves — minimal, fast, honest, and respectful of your time and privacy.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#10B981]/10">
                  <Shield className="h-5 w-5 text-[#10B981]" />
                </div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Our Privacy Promise</h2>
              </div>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                We never log the URLs you submit, your IP address, or any personal data. The only analytics we collect are anonymous — platform type, quality selected, and timestamp. No user profiling. No data selling. Your downloads are private.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6366F1]/10">
                  <Globe className="h-5 w-5 text-[#6366F1]" />
                </div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Who We Are</h2>
              </div>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Cliplane is an independent project built and maintained by a small team passionate about building simple, useful tools. We are not affiliated with any of the platforms we support. We operate under a strict DMCA policy and process all valid takedown requests promptly.
              </p>
            </div>
          </section>

          <div className="mt-10 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] p-5">
            <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
              Cliplane is intended for personal use only. We respect the copyright of content creators and the intellectual property rights of all platforms. All trademarks belong to their respective owners. For copyright concerns, see our <a href="/dmca" className="text-[#3B82F6] hover:underline">DMCA policy</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
