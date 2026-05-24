"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";
import { Button } from "@/components/ui/button";
import { Check, Shield, Zap, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { API_BASE } from "@/lib/api";

const FREE_FEATURES = [
  "10 downloads per day",
  "Up to 720p quality",
  "Single URL processing",
  "Standard server speed",
  "All 7 platforms",
];

const PRO_FEATURES = [
  "Unlimited downloads",
  "1080p+ original quality",
  "Batch up to 25 URLs at once",
  "MP3 audio extraction",
  "Priority server speed",
  "No ads",
  "30-day download history",
  "All 7 platforms",
];

const pricingFaqs: FAQItem[] = [
  { q: "Can I cancel my Pro subscription at any time?", a: "Yes. Cancel anytime from your account dashboard or by emailing support. Your Pro access remains active until the end of the billing period." },
  { q: "Is there a free trial for Pro?", a: "The free tier is permanently free with up to 10 downloads per day. There is no time-limited trial for Pro, but we offer a 30-day money-back guarantee." },
  { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards (Visa, Mastercard, AmEx), PayPal, and Apple Pay via Stripe." },
  { q: "How does the annual plan save money?", a: "The annual plan is $39.99/year compared to $4.99/month × 12 = $59.88/year. You save $19.89 — that's 33% off." },
  { q: "What is the 30-day money-back guarantee?", a: "If you are not satisfied with Pro within 30 days of your first payment, contact us for a full refund — no questions asked." },
  { q: "Is Pro per device or per account?", a: "Pro is tied to your email address. You can use it on any device by signing in." },
  { q: "Do Pro features work on mobile?", a: "Yes. All Pro features including batch downloads and 1080p quality work on mobile browsers." },
  { q: "What happens when my Pro subscription expires?", a: "Your account reverts to the free tier (10 downloads/day, 720p max). Your download history is preserved for 30 days." },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

  async function handleCheckout(plan: "monthly" | "annual") {
    try {
      const res = await fetch(`${API_BASE}/api/stripe/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      if (res.ok) {
        const { url } = await res.json() as { url: string };
        if (url) window.location.href = url;
      }
    } catch {
      // fallback: show error toast
    }
  }

  return (
    <>
      <Header />

      <main className="section-pad">
        <div className="container-max max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1
              className="font-extrabold text-[var(--text-primary)]"
              style={{ fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-0.03em" }}
            >
              Simple, Transparent Pricing
            </h1>
            <p className="mt-4 text-[var(--text-secondary)] text-lg max-w-lg mx-auto">
              Start free. Upgrade when you need more.
            </p>

            {/* Billing toggle */}
            <div className="mt-8 inline-flex items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-1">
              {(["monthly", "annual"] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBilling(b)}
                  className={cn(
                    "rounded-lg px-5 py-2 text-sm font-medium transition-all duration-200",
                    billing === b
                      ? "bg-[#3B82F6] text-white shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {b === "monthly" ? "Monthly" : "Annual"}
                  {b === "annual" && (
                    <span className={cn("ml-1.5 text-xs font-semibold", billing === "annual" ? "text-white/80" : "text-[#10B981]")}>
                      Save 33%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
            {/* Free */}
            <div className="flex flex-col gap-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-7">
              <div>
                <h2 className="text-lg font-bold text-[var(--text-primary)]">Free</h2>
                <p className="text-sm text-[var(--text-secondary)] mt-1">Perfect for occasional use</p>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-black text-[var(--text-primary)]">$0</span>
                <span className="text-[var(--text-secondary)] mb-1">/month</span>
              </div>
              <ul className="space-y-3 flex-1">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                    <Check className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant="secondary" size="lg" className="w-full" asChild>
                <a href="/">Get Started Free</a>
              </Button>
            </div>

            {/* Pro */}
            <div className="relative flex flex-col gap-5 rounded-2xl border-2 border-[#3B82F6] bg-[var(--bg-secondary)] p-7 shadow-[0_0_40px_rgba(59,130,246,0.15)]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-[#3B82F6] px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-[var(--text-primary)]">Pro</h2>
                <p className="text-sm text-[var(--text-secondary)] mt-1">For power users and creators</p>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-black text-[var(--text-primary)]">
                  {billing === "monthly" ? "$4.99" : "$3.33"}
                </span>
                <span className="text-[var(--text-secondary)] mb-1">/month</span>
                {billing === "annual" && (
                  <span className="ml-2 mb-1 text-xs text-[var(--text-tertiary)] line-through">$4.99</span>
                )}
              </div>
              {billing === "annual" && (
                <p className="text-xs text-[#10B981] -mt-2">Billed $39.99/year</p>
              )}
              <ul className="space-y-3 flex-1">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                    <Check className="h-4 w-4 text-[#3B82F6] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => handleCheckout(billing)}
              >
                <Zap className="h-4 w-4" />
                Start Pro
              </Button>
              <div className="flex items-center justify-center gap-1.5 text-xs text-[var(--text-tertiary)]">
                <Shield className="h-3.5 w-3.5" />
                30-day money-back guarantee
              </div>
            </div>
          </div>

          {/* Feature comparison note */}
          <div className="mt-10 flex items-center justify-center gap-6 text-sm text-[var(--text-tertiary)] flex-wrap">
            <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-[#F59E0B]" /> Secure payment via Stripe</span>
            <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> Cancel anytime</span>
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#10B981]" /> Works on all devices</span>
          </div>

          {/* FAQ */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8 text-center">Subscription FAQ</h2>
            <FAQAccordion items={pricingFaqs} schemaId="pricing-faq" />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
