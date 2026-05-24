import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "FAQ — Frequently Asked Questions",
  description: "Answers to the most common questions about Cliplane, supported platforms, quality, privacy, and pricing.",
  path: "/faq",
});

const faqs: FAQItem[] = [
  { q: "What is Cliplane?", a: "Cliplane is a free online video downloader that supports TikTok, Pinterest, Twitter/X, Reddit, Facebook, Vimeo, and Dailymotion. No login or software installation is required." },
  { q: "Is Cliplane free?", a: "Yes. The free tier allows up to 10 downloads per day at up to 720p quality. Pro ($4.99/month or $39.99/year) offers unlimited downloads, 1080p+ quality, batch downloads, and more." },
  { q: "Do I need to create an account?", a: "No. You can use Cliplane without any account. Simply paste a URL and download." },
  { q: "Which platforms are supported?", a: "Cliplane supports TikTok, Pinterest, Twitter/X, Reddit, Facebook, Vimeo, and Dailymotion. YouTube and Instagram are not supported." },
  { q: "Why are YouTube and Instagram not supported?", a: "YouTube prohibits third-party downloading in its terms of service and has active legal precedent. Instagram has particularly aggressive terms against scraping. We have excluded both platforms to operate within legal boundaries." },
  { q: "Will downloaded videos have watermarks?", a: "Cliplane downloads videos from their original source files, which generally do not include platform watermarks. Some platforms may embed watermarks in certain quality levels." },
  { q: "Does Cliplane store my data?", a: "No. We never log URLs you submit, your IP address, or any personal information. We only collect anonymous analytics: platform type, quality selected, and timestamp — with no way to trace these back to you." },
  { q: "Is it legal to download videos?", a: "Downloading publicly available videos for personal, offline use is generally considered fair use in most jurisdictions. Never re-upload or distribute downloaded content without the creator's permission." },
  { q: "How does the batch download work?", a: "Pro users can paste up to 25 URLs (one per line) into the input bar and download all of them simultaneously. Batch downloads are available exclusively on the Pro plan." },
  { q: "Can I download videos on my iPhone?", a: "Yes. Open Cliplane in Safari on iPhone, paste the URL, and download. The file saves to your Files app or Photos depending on file type and Safari settings." },
  { q: "Can I download videos on Android?", a: "Yes. Use Chrome on Android. Downloads save to your Downloads folder automatically." },
  { q: "What video formats are available?", a: "Cliplane primarily downloads MP4 files. Audio-only downloads are available as MP3 on the Pro plan (where the source platform supports audio extraction)." },
  { q: "Why does a specific video fail to download?", a: "Common reasons: the video is private or age-restricted, the account is private, the content has been deleted, or the platform has changed its API. Try refreshing the URL and retrying." },
  { q: "How do I report a DMCA violation?", a: "Please use our DMCA form at cliplane.com/dmca. We process all valid takedown requests within 48 hours." },
  { q: "How do I contact support?", a: "Use the contact form at cliplane.com/contact. We aim to respond within 24 hours." },
];

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="section-pad">
        <div className="container-max max-w-3xl">
          <div className="mb-10">
            <h1 className="font-extrabold text-[var(--text-primary)] mb-3" style={{ fontSize: "clamp(28px,5vw,44px)", letterSpacing: "-0.02em" }}>
              Frequently Asked Questions
            </h1>
            <p className="text-[var(--text-secondary)]">Everything you need to know about Cliplane.</p>
          </div>
          <FAQAccordion items={faqs} schemaId="site-faq" />
        </div>
      </main>
      <Footer />
    </>
  );
}
