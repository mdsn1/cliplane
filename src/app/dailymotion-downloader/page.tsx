import type { Metadata } from "next";
import { PlatformPage } from "@/components/PlatformPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Dailymotion Downloader — Save Videos Online Free (2026)",
  description: "Download Dailymotion videos to MP4 for free. HD quality. No login or account required.",
  path: "/dailymotion-downloader",
});

export default function DailymotionDownloaderPage() {
  return (
    <PlatformPage
      platform="dailymotion"
      title="Dailymotion Downloader — Save Videos Online"
      subtitle="Download Dailymotion videos in HD quality to your device for free. No account needed."
      description="Dailymotion is a popular video platform hosting millions of news clips, sports highlights, entertainment content, and independent creator videos. Cliplane's Dailymotion downloader makes it easy to save any public Dailymotion video to your device in HD quality. Just copy the Dailymotion video URL, paste it above, and download instantly."
      howToSteps={[
        "Go to the Dailymotion video page you want to download at dailymotion.com.",
        "Copy the URL from your browser's address bar. It will look like dailymotion.com/video/XXXXXXX.",
        "Paste the Dailymotion URL into the input bar at the top of this page.",
        "Select your preferred quality and click Download. Your MP4 file will be ready in seconds.",
      ]}
      whyPoints={[
        "Supports all public Dailymotion videos including news, sports, and entertainment content.",
        "Works with both dailymotion.com full URLs and dai.ly shortened links.",
        "Downloads in HD quality for the best viewing experience offline.",
        "No Dailymotion account or Premium subscription needed.",
        "Fast processing with download links ready in seconds.",
      ]}
      faqs={[
        { q: "Can I download Dailymotion videos for free?", a: "Yes. Cliplane's Dailymotion downloader is completely free with up to 10 downloads per day." },
        { q: "Does it work with dai.ly short links?", a: "Yes. Both dailymotion.com URLs and dai.ly shortened links are fully supported." },
        { q: "Can I download Dailymotion videos in HD?", a: "Yes. Free users get up to 720p HD. Pro users can download at the highest available quality." },
        { q: "Does Cliplane support Dailymotion Live replays?", a: "Dailymotion Live recordings that are made public after the stream ends are supported." },
        { q: "Why does the download fail for some Dailymotion videos?", a: "Some videos may be geo-restricted or have embedding disabled. If a video fails, it may have access restrictions." },
        { q: "Can I download Dailymotion videos on Android?", a: "Yes. Open Cliplane in Chrome on Android, paste the Dailymotion URL, and the video saves to your Downloads folder." },
        { q: "What video format does the download produce?", a: "Dailymotion videos download as MP4 files, compatible with all devices and media players." },
        { q: "Can I download entire Dailymotion playlists?", a: "Individual video downloads are available on the free plan. Batch downloading playlists is a Pro feature." },
      ]}
      relatedPlatforms={[
        { name: "Vimeo Downloader", href: "/vimeo-downloader" },
        { name: "Facebook Downloader", href: "/facebook-video-downloader" },
        { name: "Reddit Downloader", href: "/reddit-video-downloader" },
      ]}
      schemaName="Dailymotion Downloader — Cliplane"
    />
  );
}
