import Link from "next/link";

const platformLinks = [
  { label: "TikTok Downloader", href: "/tiktok-downloader" },
  { label: "Pinterest Downloader", href: "/pinterest-downloader" },
  { label: "Twitter Downloader", href: "/twitter-video-downloader" },
  { label: "Reddit Downloader", href: "/reddit-video-downloader" },
  { label: "Facebook Downloader", href: "/facebook-video-downloader" },
  { label: "Vimeo Downloader", href: "/vimeo-downloader" },
  { label: "Dailymotion Downloader", href: "/dailymotion-downloader" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Advertise", href: "/advertise" },
  { label: "FAQ", href: "/faq" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "DMCA", href: "/dmca" },
  { label: "Copyright", href: "/copyright" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="container-max py-12">
        {/* Main grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#3B82F6]">
                <svg viewBox="0 0 32 32" fill="none" className="h-4 w-4">
                  <path d="M4 16L28 4L22 28L16 20L4 16Z" fill="white" fillOpacity="0.9"/>
                  <path d="M16 20L22 28L22 16L16 20Z" fill="white" fillOpacity="0.6"/>
                </svg>
              </div>
              <span className="font-bold text-base text-[var(--text-primary)]">
                Clip<span className="text-[#3B82F6]">lane</span>
              </span>
            </Link>
            <p className="text-xs text-[var(--text-tertiary)] leading-relaxed max-w-[200px]">
              Download Any Video. Any Platform. No Watermark.
            </p>
          </div>

          {/* Platforms */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-4">Platforms</p>
            <ul className="space-y-2.5">
              {platformLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-4">Company</p>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-4">Legal</p>
            <ul className="space-y-2.5">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 pt-8 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--text-tertiary)] leading-relaxed max-w-3xl">
            Cliplane is intended for personal use only. Please respect the copyright of content creators. We are not affiliated with TikTok, Pinterest, Twitter, Reddit, Facebook, Vimeo, or Dailymotion. All trademarks belong to their respective owners.
          </p>
          <p className="mt-4 text-xs text-[var(--text-tertiary)]">
            © {new Date().getFullYear()} Cliplane. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
