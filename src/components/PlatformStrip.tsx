"use client";

import Link from "next/link";

const platforms = [
  { name: "TikTok", href: "/tiktok-downloader", color: "#010101", letter: "T" },
  { name: "Pinterest", href: "/pinterest-downloader", color: "#E60023", letter: "P" },
  { name: "Twitter", href: "/twitter-video-downloader", color: "#1DA1F2", letter: "X" },
  { name: "Reddit", href: "/reddit-video-downloader", color: "#FF4500", letter: "R" },
  { name: "Facebook", href: "/facebook-video-downloader", color: "#1877F2", letter: "F" },
  { name: "Vimeo", href: "/vimeo-downloader", color: "#1AB7EA", letter: "V" },
  { name: "Dailymotion", href: "/dailymotion-downloader", color: "#0066DC", letter: "D" },
];

export function PlatformStrip() {
  return (
    <div className="w-full overflow-x-auto no-scrollbar" style={{ scrollSnapType: "x mandatory" }}>
      <div className="flex justify-center gap-6 px-4 min-w-max mx-auto">
        {platforms.map((p) => (
          <Link
            key={p.name}
            href={p.href}
            className="platform-icon flex flex-col items-center gap-2 group"
            style={{ scrollSnapAlign: "start" }}
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-white font-bold text-xl shadow-lg transition-transform duration-200 group-hover:scale-110"
              style={{ backgroundColor: p.color }}
            >
              {p.letter}
            </div>
            <span className="text-xs text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)] transition-colors whitespace-nowrap">
              {p.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
