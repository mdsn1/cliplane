import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function detectPlatform(url: string): string | null {
  const patterns: Record<string, RegExp> = {
    tiktok: /tiktok\.com/i,
    pinterest: /pinterest\.(com|ca|co\.uk|fr|de|es|pt|it|ru|jp|kr|nz|au|at|mx|br|in|se|no|dk|fi|co\.kr|ph|cl|ar|co)|pin\.it/i,
    twitter: /(twitter\.com|x\.com|t\.co)/i,
    reddit: /(reddit\.com|redd\.it)/i,
    facebook: /(facebook\.com|fb\.watch|fb\.com)/i,
    vimeo: /vimeo\.com/i,
    dailymotion: /(dailymotion\.com|dai\.ly)/i,
  };
  for (const [platform, pattern] of Object.entries(patterns)) {
    if (pattern.test(url)) return platform;
  }
  return null;
}

export function isValidUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export const PLATFORM_LABELS: Record<string, string> = {
  tiktok: "TikTok",
  pinterest: "Pinterest",
  twitter: "Twitter / X",
  reddit: "Reddit",
  facebook: "Facebook",
  vimeo: "Vimeo",
  dailymotion: "Dailymotion",
};

export const PLATFORM_COLORS: Record<string, string> = {
  tiktok: "#010101",
  pinterest: "#E60023",
  twitter: "#1DA1F2",
  reddit: "#FF4500",
  facebook: "#1877F2",
  vimeo: "#1AB7EA",
  dailymotion: "#0066DC",
};
