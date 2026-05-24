import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { buildArticleMetadata } from "@/lib/metadata";
import { Clock, ArrowLeft, ArrowRight } from "lucide-react";

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return buildArticleMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    publishedTime: post.publishedAt,
  });
}

function renderMarkdown(content: string): string {
  return content
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-[var(--text-primary)] mt-8 mb-3">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-semibold text-[var(--text-primary)] mt-6 mb-2">$1</h3>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#3B82F6] hover:underline">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-[var(--text-primary)]">$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="rounded bg-[var(--bg-tertiary)] px-1.5 py-0.5 text-xs font-mono text-[#3B82F6]">$1</code>')
    .replace(/^\| (.+) \|$/gm, (_match, row) => {
      const cells = row.split(" | ").map((c: string) => `<td class="border border-[var(--border)] px-3 py-2 text-sm text-[var(--text-secondary)]">${c}</td>`).join("");
      return `<tr>${cells}</tr>`;
    })
    .replace(/<tr>([\s\S]+?)<\/tr>/g, (m) => m.includes("---|") ? "" : m)
    .replace(/(<tr>[\s\S]+?<\/tr>)/g, '<table class="w-full border-collapse rounded-lg overflow-hidden my-4"><tbody>$1</tbody></table>')
    .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 text-[var(--text-secondary)] text-sm leading-relaxed"><span class="text-[#3B82F6] mt-1">•</span><span>$1</span></li>')
    .replace(/(<li[\s\S]+?<\/li>(\n|$))+/g, (m) => `<ul class="space-y-2 my-3">${m}</ul>`)
    .replace(/^\d+\. (.+)$/gm, '<li class="text-[var(--text-secondary)] text-sm leading-relaxed">$1</li>')
    .replace(/\n\n/g, '</p><p class="text-[var(--text-secondary)] leading-relaxed text-sm my-3">')
    .replace(/^(?!<[h|u|l|t|p])/, '<p class="text-[var(--text-secondary)] leading-relaxed text-sm my-3">');
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const idx = blogPosts.findIndex((p) => p.slug === params.slug);
  const prev = idx > 0 ? blogPosts[idx - 1] : null;
  const next = idx < blogPosts.length - 1 ? blogPosts[idx + 1] : null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: "Cliplane" },
    publisher: { "@type": "Organization", name: "Cliplane", url: "https://cliplane.com" },
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <main className="section-pad">
        <div className="container-max max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[var(--text-tertiary)] mb-8">
            <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[var(--text-primary)] transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-[var(--text-secondary)] truncate">{post.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="rounded-full bg-[#3B82F6]/10 px-2.5 py-1 text-xs font-semibold text-[#3B82F6]">
                {post.category}
              </span>
              <span className="text-xs text-[var(--text-tertiary)] flex items-center gap-1">
                <Clock className="h-3 w-3" /> {post.readingTime} min read
              </span>
              <span className="text-xs text-[var(--text-tertiary)]">
                {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
            </div>
            <h1 className="font-extrabold text-[var(--text-primary)] mb-3" style={{ fontSize: "clamp(24px,4vw,36px)", letterSpacing: "-0.02em" }}>
              {post.title}
            </h1>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed">{post.description}</p>
          </header>

          {/* Content */}
          <article
            className="prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-[var(--border)] flex items-center gap-4">
            <span className="text-sm text-[var(--text-tertiary)]">Share this article:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://cliplane.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors"
            >
              Twitter
            </a>
          </div>

          {/* Prev/Next nav */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {prev && (
              <Link href={`/blog/${prev.slug}`} className="group flex flex-col gap-1 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4 hover:border-[#3B82F6]/50 transition-colors">
                <span className="text-xs text-[var(--text-tertiary)] flex items-center gap-1"><ArrowLeft className="h-3 w-3" /> Previous</span>
                <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[#3B82F6] transition-colors">{prev.title}</span>
              </Link>
            )}
            {next && (
              <Link href={`/blog/${next.slug}`} className="group flex flex-col gap-1 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4 hover:border-[#3B82F6]/50 transition-colors sm:text-right">
                <span className="text-xs text-[var(--text-tertiary)] flex items-center gap-1 sm:justify-end">Next <ArrowRight className="h-3 w-3" /></span>
                <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[#3B82F6] transition-colors">{next.title}</span>
              </Link>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
