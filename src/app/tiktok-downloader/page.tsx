import type { Metadata } from "next";
import { PlatformPage } from "@/components/PlatformPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "TikTok Downloader — Save Videos Without Watermark (2026)",
  description: "Download TikTok videos without watermark in HD quality. Free, no login required. Works on iPhone, Android, PC, and Mac.",
  path: "/tiktok-downloader",
});

export default function TikTokDownloaderPage() {
  return (
    <PlatformPage
      platform="tiktok"
      title="TikTok Downloader — Save Videos Without Watermark"
      subtitle="Download TikTok videos in HD quality without watermarks. Works on any device — no app, no login."
      description="Cliplane's TikTok downloader lets you save any public TikTok video directly to your device in the original quality without the TikTok watermark. Whether you're saving content for offline viewing, archiving your favourite creators' work, or repurposing clips, Cliplane makes it fast and simple. Just paste the TikTok URL, select your preferred quality, and hit download. No account required, no software to install."
      howToSteps={[
        "Open the TikTok app or website and find the video you want to download.",
        "Tap 'Share' on the video, then select 'Copy Link'. On desktop, copy the URL from your browser's address bar.",
        "Return to this page and paste the URL into the input box at the top.",
        "Select your preferred quality (360p, 720p, or 1080p for Pro), then click 'Download Video'. The file saves to your device instantly.",
      ]}
      whyPoints={[
        "Downloads the original source video without the TikTok username watermark when available.",
        "Supports both standard TikTok videos and longer TikTok format content.",
        "No registration or TikTok account needed — completely anonymous.",
        "Works on iPhone (Safari), Android (Chrome), Windows, and Mac.",
        "Download audio only as MP3 for use in your own projects.",
      ]}
      faqs={[
        { q: "Can I download TikTok videos without the watermark?", a: "Yes. Cliplane accesses the original source video file, which does not contain TikTok's username watermark in most cases." },
        { q: "Is it legal to download TikTok videos?", a: "Downloading TikTok videos for personal, offline use is generally considered fair use. Do not redistribute downloaded content without the creator's permission." },
        { q: "Why does the download say 'private video'?", a: "Cliplane only supports public TikTok videos. If the creator has set their account or video to private, it cannot be downloaded." },
        { q: "Can I download TikTok videos on iPhone?", a: "Yes. Open this page in Safari on your iPhone, paste the TikTok URL, and download. The video will save to your Photos app." },
        { q: "What quality options are available?", a: "Free users can download up to 720p. Pro users unlock 1080p and original quality downloads." },
        { q: "Can I download TikTok slideshows or photo posts?", a: "Cliplane focuses on video content. Photo slideshows may not be supported." },
        { q: "How do I get the TikTok video URL?", a: "Tap the Share button on any TikTok video and select 'Copy Link'. You can also copy the URL from your browser when watching on desktop." },
        { q: "Does Cliplane work with TikTok Live replays?", a: "TikTok Live replays are supported on some accounts. Paste the URL and Cliplane will attempt to resolve the video." },
      ]}
      relatedPlatforms={[
        { name: "Pinterest Downloader", href: "/pinterest-downloader" },
        { name: "Twitter Downloader", href: "/twitter-video-downloader" },
        { name: "Reddit Downloader", href: "/reddit-video-downloader" },
      ]}
      schemaName="TikTok Video Downloader — Cliplane"
    />
  );
}
