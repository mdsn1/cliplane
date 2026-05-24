import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";

const BASE = "https://cliplane.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: today, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/tiktok-downloader`, lastModified: today, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/pinterest-downloader`, lastModified: today, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/twitter-video-downloader`, lastModified: today, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/reddit-video-downloader`, lastModified: today, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/facebook-video-downloader`, lastModified: today, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/vimeo-downloader`, lastModified: today, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/dailymotion-downloader`, lastModified: today, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/pricing`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: today, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/about`, lastModified: today, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: today, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/faq`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/privacy-policy`, lastModified: today, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms-and-conditions`, lastModified: today, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/dmca`, lastModified: today, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/copyright`, lastModified: today, changeFrequency: "yearly", priority: 0.3 },
  ];

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
