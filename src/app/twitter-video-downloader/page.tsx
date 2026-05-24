import type { Metadata } from "next";
import { PlatformPage } from "@/components/PlatformPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Twitter Video Downloader — Save X Videos Online (2026)",
  description: "Download Twitter (X) videos and GIFs to MP4 for free. Works on all devices. No login or account required.",
  path: "/twitter-video-downloader",
});

export default function TwitterDownloaderPage() {
  return (
    <PlatformPage
      platform="twitter"
      title="Twitter Video Downloader — Save X Videos Online"
      subtitle="Download Twitter and X videos in HD MP4 format. Free, instant, no login required."
      description="Twitter (now X) is one of the world's most active video platforms, hosting millions of news clips, sports highlights, political commentary, and viral moments. Cliplane's Twitter video downloader lets you save any public tweet video to your device in HD quality. Whether you need to archive important content before it gets deleted, or simply want to watch offline, our tool makes it as simple as pasting a link."
      howToSteps={[
        "Find the tweet containing the video you want to download on Twitter.com or the X app.",
        "Click the share icon on the tweet and select 'Copy link to Tweet'. Alternatively, copy the tweet URL from your browser.",
        "Paste the Twitter/X URL into the input field at the top of this page.",
        "Select your preferred quality and click Download. The MP4 file will save to your device.",
      ]}
      whyPoints={[
        "Download Twitter and X videos in the highest available quality, up to 1080p.",
        "Supports both twitter.com and x.com URLs as well as t.co shortened links.",
        "Download Twitter GIFs as MP4 video files for easy sharing and storage.",
        "No Twitter or X account required to use the downloader.",
        "Lightning-fast processing — most videos resolve in under 3 seconds.",
      ]}
      faqs={[
        { q: "Does this work with both Twitter and X URLs?", a: "Yes. Cliplane accepts URLs from twitter.com, x.com, and t.co shortened links." },
        { q: "Can I download Twitter GIFs?", a: "Yes. Twitter GIFs are stored as MP4 files internally and download as video files using Cliplane." },
        { q: "Why can't I download a specific tweet video?", a: "Some videos are age-restricted or posted by private accounts. Cliplane only supports publicly accessible content." },
        { q: "Can I download Twitter Spaces audio?", a: "Twitter Spaces recordings are not currently supported by Cliplane." },
        { q: "Does it work for videos in Twitter threads?", a: "Yes — as long as the tweet is public, paste the direct URL of the tweet containing the video." },
        { q: "How do I get the URL of a specific tweet?", a: "Click the share icon on a tweet and select 'Copy link to Tweet'. Or right-click the timestamp and copy the link." },
        { q: "Can I download retweets with video?", a: "Retweet URLs link back to the original tweet. Use the original tweet URL for best results." },
        { q: "Are downloaded Twitter videos in HD quality?", a: "Yes. Free users get up to 720p, and Pro users can download in the original quality (usually 1080p for HD videos)." },
      ]}
      relatedPlatforms={[
        { name: "TikTok Downloader", href: "/tiktok-downloader" },
        { name: "Reddit Downloader", href: "/reddit-video-downloader" },
        { name: "Dailymotion Downloader", href: "/dailymotion-downloader" },
      ]}
      schemaName="Twitter Video Downloader — Cliplane"
    />
  );
}
