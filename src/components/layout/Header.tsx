"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Moon, Sun, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const platforms = [
  { name: "TikTok", href: "/tiktok-downloader" },
  { name: "Pinterest", href: "/pinterest-downloader" },
  { name: "Twitter / X", href: "/twitter-video-downloader" },
  { name: "Reddit", href: "/reddit-video-downloader" },
  { name: "Facebook", href: "/facebook-video-downloader" },
  { name: "Vimeo", href: "/vimeo-downloader" },
  { name: "Dailymotion", href: "/dailymotion-downloader" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "border-b border-[var(--border)] bg-[var(--bg-primary)]/90 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container-max flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Cliplane home">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3B82F6]">
              <svg viewBox="0 0 32 32" fill="none" className="h-5 w-5">
                <path d="M4 16L28 4L22 28L16 20L4 16Z" fill="white" fillOpacity="0.9"/>
                <path d="M16 20L22 28L22 16L16 20Z" fill="white" fillOpacity="0.6"/>
                <path d="M16 9V17M16 17L12 13M16 17L20 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
              </svg>
            </div>
            <span className="font-bold text-[17px] tracking-tight text-[var(--text-primary)]">
              Clip<span className="text-[#3B82F6]">lane</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {/* Tools dropdown */}
            <div className="relative" onMouseEnter={() => setToolsOpen(true)} onMouseLeave={() => setToolsOpen(false)}>
              <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors">
                Tools <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {toolsOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] shadow-2xl p-1">
                  {platforms.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/pricing" className="rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors">
              Pricing
            </Link>
            <Link href="/blog" className="rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors">
              Blog
            </Link>
            <Link href="/about" className="rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors">
              About
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="rounded-lg p-2 text-[var(--text-tertiary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link href="/pricing" className="hidden sm:block">
              <Button variant="primary" size="sm">Get Pro</Button>
            </Link>
            <button
              className="md:hidden rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-[var(--bg-secondary)] border-l border-[var(--border)] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
              <span className="font-bold text-[var(--text-primary)]">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="rounded-lg p-1.5 hover:bg-[var(--bg-tertiary)] transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">
              <p className="px-3 pt-2 pb-1 text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wide">Downloaders</p>
              {platforms.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {p.name}
                </Link>
              ))}
              <div className="my-2 h-px bg-[var(--border)]" />
              {[{ label: "Pricing", href: "/pricing" }, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" }].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-[var(--border)]">
              <Link href="/pricing" onClick={() => setMobileOpen(false)}>
                <Button variant="primary" size="md" className="w-full">Get Pro</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
