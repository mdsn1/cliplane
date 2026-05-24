import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { blogPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/metadata";
import { Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Blog — Video Downloading Guides & Tips",
  description: "Guides, tutorials, and tips on downloading videos from TikTok, Pinterest, Twitter, Reddit, Facebook, Vimeo, and Dailymotion.",
  path: "/blog",
});

const CATEGORY_COLORS: Record<string, string> = {
  Guides: "text-[#3B82F6] bg-[#3B82F6]/10",
  Reviews: "text-[#10B981] bg-[#10B981]/10",
  Legal: "text-[#F59E0B] bg-[#F59E0B]/10",
  Resources: "text-[#6366F1] bg-[#6366F1]/10",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;
  return (
    <>
      <Header />
      <main className="section-pad">
        <div className="container-max max-w-5xl">
          <div className="mb-12">
            <h1 className="font-extrabold text-[var(--text-primary)] mb-3" style={{ fontSize: "clamp(28px,4vw,44px)", letterSpacing: "-0.02em" }}>
              Blog
            </h1>
            <p className="text-[var(--text-secondary)] text-lg">
              Guides, tips, and resources for downloading and managing video content.
            </p>
          </div>

          {/* Featured post */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="group block rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden hover:border-[#3B82F6]/50 hover:translate-y-[-2px] transition-all duration-200 mb-8">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${CATEGORY_COLORS[featured.category] ?? ""}`}>
                    {featured.category}
                  </span>
                  <span className="text-xs text-[var(--text-tertiary)] flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {featured.readingTime} min read
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[#3B82F6] transition-colors">
                  {featured.title}
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-4">{featured.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[#3B82F6]">
                  Read article <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          )}

          {/* Article grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-5 hover:border-[#3B82F6]/50 hover:translate-y-[-2px] transition-all duration-200"
              >
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${CATEGORY_COLORS[post.category] ?? ""}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-[var(--text-tertiary)] flex items-center gap-1 ml-auto">
                    <Clock className="h-3 w-3" /> {post.readingTime} min
                  </span>
                </div>
                <h2 className="font-semibold text-[var(--text-primary)] group-hover:text-[#3B82F6] transition-colors text-sm leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed flex-1">{post.description}</p>
                <span className="text-xs text-[var(--text-tertiary)]">{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
