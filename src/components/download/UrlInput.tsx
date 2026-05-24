"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { ClipboardPaste, Download, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resolveUrl, type ResolveResponse } from "@/lib/api";
import { detectPlatform, isValidUrl, PLATFORM_LABELS } from "@/lib/utils";
import { ResultCard } from "@/components/download/ResultCard";
import { Skeleton } from "@/components/ui/skeleton";
import { AffiliateCard } from "@/components/AffiliateCard";
import { AdSlot } from "@/components/AdSlot";

interface UrlInputProps {
  defaultPlatform?: string;
}

export function UrlInput({ defaultPlatform }: UrlInputProps) {
  const [url, setUrl] = useState("");
  const [detectedPlatform, setDetectedPlatform] = useState<string | null>(defaultPlatform ?? null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResolveResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Ctrl+V focuses and pastes
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "v" && document.activeElement !== inputRef.current) {
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        reset();
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(val: string) {
    setUrl(val);
    setError(null);
    const platform = detectPlatform(val);
    setDetectedPlatform(platform);
  }

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      handleChange(text);
      inputRef.current?.focus();
    } catch {
      inputRef.current?.focus();
    }
  }

  function reset() {
    setUrl("");
    setResult(null);
    setError(null);
    setDetectedPlatform(defaultPlatform ?? null);
  }

  const handleSubmit = useCallback(async () => {
    if (!url.trim()) {
      setError("Please paste a video URL.");
      return;
    }
    if (!isValidUrl(url.trim())) {
      setError("Please enter a valid URL starting with http:// or https://");
      return;
    }
    const platform = detectPlatform(url.trim());
    if (!platform) {
      setError("This platform is not supported. We support TikTok, Pinterest, Twitter, Reddit, Facebook, Vimeo, and Dailymotion.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await resolveUrl(url.trim());
      setResult(data);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [url]);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      {/* Input bar */}
      <div className="relative flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="url"
            value={url}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Paste a video URL here..."
            className="w-full h-14 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] pl-5 pr-14 text-base text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-all focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6]"
            style={{ fontSize: "clamp(14px, 2vw, 16px)" }}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          {url ? (
            <button
              onClick={reset}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Clear URL"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handlePaste}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[var(--text-tertiary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Paste URL"
            >
              <ClipboardPaste className="h-4 w-4" />
            </button>
          )}
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={handleSubmit}
          loading={loading}
          className="h-14 sm:w-auto w-full rounded-2xl px-8 text-base font-semibold shrink-0"
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>

      {/* Platform detection badge */}
      {detectedPlatform && (
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
          Detected: <span className="font-medium text-[#10B981]">{PLATFORM_LABELS[detectedPlatform]}</span>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-[#EF4444]/30 bg-[#EF4444]/10 px-4 py-3 text-sm text-[#EF4444]">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="space-y-3">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-10 w-2/3 rounded-xl" />
          <Skeleton className="h-10 w-1/2 rounded-xl" />
        </div>
      )}

      {/* Result */}
      {result && !loading && (
        <div className="space-y-4">
          <ResultCard result={result} />
          <AdSlot position="in-content" id="ez-after-result" />
          <AffiliateCard />
        </div>
      )}
    </div>
  );
}
