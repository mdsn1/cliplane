import type { Metadata } from "next";
import { PlatformPage } from "@/components/PlatformPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Pinterest Video Downloader — Save Pins Free (2026)",
  description: "Download Pinterest videos and GIF pins to your device for free. No login needed. Works on mobile and desktop.",
  path: "/pinterest-downloader",
});

export default function PinterestDownloaderPage() {
  return (
    <PlatformPage
      platform="pinterest"
      title="Pinterest Video Downloader — Save Pins Free"
      subtitle="Download Pinterest videos and animated pins directly to your device. No login. No watermark."
      description="Cliplane's Pinterest video downloader lets you save any public Pinterest video pin to your phone or computer in seconds. Pinterest is home to millions of creative videos, tutorials, recipes, and DIY content — and with Cliplane, you can save any video pin for offline access. Simply find the pin you want, copy the URL, and paste it into the tool above. It works on all devices with no software download required."
      howToSteps={[
        "Open Pinterest and find the video pin you want to download.",
        "Click or tap the three-dot menu on the pin, then select 'Copy link'. On desktop, copy the URL from your browser.",
        "Paste the Pinterest URL into the input bar at the top of this page.",
        "Choose your preferred quality and click 'Download Video' to save the pin to your device.",
      ]}
      whyPoints={[
        "Supports all public Pinterest video pins including short clips and longer videos.",
        "Works on iPhone, Android, PC, and Mac browsers without any app installation.",
        "Download in HD quality for the sharpest offline playback experience.",
        "No Pinterest account required — just paste the URL and go.",
        "Fast download speeds with no queue or wait time.",
      ]}
      faqs={[
        { q: "Can I download any Pinterest video?", a: "You can download any publicly accessible Pinterest video pin. Private pins or boards set to secret cannot be accessed." },
        { q: "Why does the download fail for some pins?", a: "Some pins may link to external video embeds (like YouTube) which are not supported. Cliplane only downloads native Pinterest videos." },
        { q: "Can I download Pinterest GIFs?", a: "Yes, GIF pins on Pinterest are downloaded as video files (MP4) since Pinterest converts GIFs to video internally." },
        { q: "Does it work with Pinterest on iPhone?", a: "Yes. Open Cliplane in Safari on your iPhone, paste the Pinterest URL, and the video downloads to your Camera Roll." },
        { q: "What quality are Pinterest downloads?", a: "Pinterest serves videos at various qualities. Cliplane provides all available quality options for each pin." },
        { q: "Can I batch-download multiple pins?", a: "Batch downloading is available on the Pro plan — paste up to 25 URLs at once for bulk downloading." },
        { q: "How do I copy a Pinterest video URL?", a: "On the Pinterest app, tap the share icon on a video pin and select 'Copy link'. On desktop, copy the URL from your browser's address bar." },
        { q: "Is downloading Pinterest videos legal?", a: "Pinterest's terms allow downloading for personal use. Do not upload or redistribute downloaded content commercially." },
      ]}
      relatedPlatforms={[
        { name: "TikTok Downloader", href: "/tiktok-downloader" },
        { name: "Facebook Downloader", href: "/facebook-video-downloader" },
        { name: "Vimeo Downloader", href: "/vimeo-downloader" },
      ]}
      schemaName="Pinterest Video Downloader — Cliplane"
    />
  );
}
