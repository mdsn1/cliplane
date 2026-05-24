import type { Metadata } from "next";
import { PlatformPage } from "@/components/PlatformPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Facebook Video Downloader — Save Videos Free (2026)",
  description: "Download public Facebook videos to MP4 for free. HD and SD quality. No login required.",
  path: "/facebook-video-downloader",
});

export default function FacebookDownloaderPage() {
  return (
    <PlatformPage
      platform="facebook"
      title="Facebook Video Downloader — Save Videos Free"
      subtitle="Download public Facebook videos in HD quality. Free, instant, no login required."
      description="Facebook is one of the world's largest video platforms, with billions of public videos posted by creators, businesses, and news organisations. Cliplane's Facebook video downloader makes it simple to save any public Facebook video to your device in HD quality. Just copy the video URL from Facebook and paste it into the tool above — no Facebook account needed."
      howToSteps={[
        "Find the Facebook video you want to download. Ensure it is publicly visible (not restricted to friends or private).",
        "Click the three-dot menu on the video post and select 'Copy link'. Or copy the URL from your browser's address bar.",
        "Paste the Facebook video URL into the input bar at the top of this page.",
        "Choose HD or SD quality, then click Download to save the MP4 to your device.",
      ]}
      whyPoints={[
        "Downloads public Facebook videos including Watch content, Reels, and regular feed videos.",
        "Supports both facebook.com and fb.watch short URLs.",
        "Offers HD (720p) and SD (360p) quality options.",
        "No Facebook login or account needed to use the downloader.",
        "Works seamlessly on mobile (iOS and Android) and desktop browsers.",
      ]}
      faqs={[
        { q: "Can I download private Facebook videos?", a: "No. Cliplane only works with publicly accessible Facebook videos. Private or friends-only posts require login and cannot be accessed." },
        { q: "Does it work with Facebook Reels?", a: "Yes. Facebook Reels that are set to public can be downloaded using Cliplane." },
        { q: "Can I download Facebook Live recordings?", a: "Public Facebook Live recordings (replays) are supported. Go to the video replay page and copy that URL." },
        { q: "Why doesn't the URL I copied work?", a: "Ensure you're copying the direct video URL or post URL (not a share URL to the app). The URL should contain 'facebook.com' or 'fb.watch'." },
        { q: "Can I download Facebook Watch videos?", a: "Yes. Facebook Watch videos that are publicly accessible can be downloaded with Cliplane." },
        { q: "Does Cliplane support Facebook Stories?", a: "Facebook Stories expire and are generally not accessible publicly. They are not supported by Cliplane." },
        { q: "Is there a quality difference between HD and SD?", a: "HD provides 720p quality (or higher if available), while SD provides 360p — smaller file size, faster download." },
        { q: "Can I download Facebook videos on iPhone?", a: "Yes. Use Safari on iPhone to visit Cliplane, paste the Facebook URL, and download to your Photos app." },
      ]}
      relatedPlatforms={[
        { name: "Pinterest Downloader", href: "/pinterest-downloader" },
        { name: "Reddit Downloader", href: "/reddit-video-downloader" },
        { name: "Vimeo Downloader", href: "/vimeo-downloader" },
      ]}
      schemaName="Facebook Video Downloader — Cliplane"
    />
  );
}
