import type { Metadata } from "next";
import { PlatformPage } from "@/components/PlatformPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Vimeo Downloader — Save Vimeo Videos in HD Quality (2026)",
  description: "Download public Vimeo videos in 1080p HD or original quality. Free. No login required.",
  path: "/vimeo-downloader",
});

export default function VimeoDownloaderPage() {
  return (
    <PlatformPage
      platform="vimeo"
      title="Vimeo Downloader — Save Vimeo Videos in HD"
      subtitle="Download public Vimeo videos in up to 1080p HD quality. Free, fast, no account required."
      description="Vimeo is the preferred platform for filmmakers, video producers, and creative professionals — and it hosts some of the highest quality video content available online. Cliplane's Vimeo downloader lets you save public Vimeo videos in their original quality, including 1080p Full HD. Whether you're downloading a film reel for reference or saving a tutorial for offline study, Cliplane handles it instantly."
      howToSteps={[
        "Navigate to the Vimeo video page you want to download at vimeo.com.",
        "Copy the URL from your browser's address bar (e.g. vimeo.com/123456789).",
        "Paste the Vimeo URL into the input field at the top of this page.",
        "Select your preferred quality (up to 1080p for Pro users) and click Download.",
      ]}
      whyPoints={[
        "Downloads public Vimeo videos in original quality including 1080p Full HD.",
        "Supports standard Vimeo URLs (vimeo.com/ID) and Vimeo channel/group video pages.",
        "Preserves the original aspect ratio and video quality.",
        "No Vimeo account or Pro subscription needed to download public videos.",
        "Ideal for saving film showreels, tutorial videos, and creative portfolios for offline reference.",
      ]}
      faqs={[
        { q: "Can I download password-protected Vimeo videos?", a: "No. Cliplane only supports publicly accessible Vimeo videos. Password-protected videos cannot be accessed without the password." },
        { q: "Can I download Vimeo videos set to 'unlisted'?", a: "Unlisted Vimeo videos with a direct link may be downloadable if the creator has not disabled downloads. Paste the full URL and try." },
        { q: "What quality options are available for Vimeo?", a: "Vimeo videos are available in multiple resolutions. Free users get up to 720p; Pro users can download in 1080p or original quality." },
        { q: "Can I download Vimeo showcase or album videos?", a: "Individual videos within a Vimeo showcase can be downloaded. Copy the URL of the specific video (not the showcase index page)." },
        { q: "Does Cliplane support Vimeo Pro videos?", a: "If the video is publicly accessible without requiring a Vimeo Pro account login, Cliplane can download it." },
        { q: "Can I download Vimeo videos that have download disabled?", a: "If the video owner has disabled downloads in Vimeo's settings and the video is not publicly accessible via direct URL, it cannot be downloaded." },
        { q: "What video formats does Vimeo download produce?", a: "Cliplane downloads Vimeo videos as MP4 files, which are compatible with all devices and video editing software." },
        { q: "Can I save Vimeo videos to my phone?", a: "Yes. Paste the Vimeo URL in your mobile browser and the video downloads to your camera roll or downloads folder." },
      ]}
      relatedPlatforms={[
        { name: "Dailymotion Downloader", href: "/dailymotion-downloader" },
        { name: "Twitter Downloader", href: "/twitter-video-downloader" },
        { name: "TikTok Downloader", href: "/tiktok-downloader" },
      ]}
      schemaName="Vimeo Downloader — Cliplane"
    />
  );
}
