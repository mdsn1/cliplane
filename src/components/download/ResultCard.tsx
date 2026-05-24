"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, Music, Clock, User, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ResolveResponse, VideoFormat } from "@/lib/api";
import { buildDownloadUrl } from "@/lib/api";
import { formatBytes, formatDuration, PLATFORM_LABELS } from "@/lib/utils";

interface ResultCardProps {
  result: ResolveResponse;
}

export function ResultCard({ result }: ResultCardProps) {
  const [selectedFormat, setSelectedFormat] = useState<VideoFormat | null>(
    result.formats[0] ?? null
  );
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const videoFormats = result.formats.filter((f) => f.is_video);
  const audioFormats = result.formats.filter((f) => !f.is_video);

  function handleDownload() {
    if (!selectedFormat) return;
    setDownloading(true);
    const url = buildDownloadUrl(selectedFormat.format_id, result.formats[0]?.url ?? "");
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    }, 1000);
  }

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-4 p-5">
        {/* Thumbnail */}
        {result.thumbnail && (
          <div className="relative shrink-0 overflow-hidden rounded-xl bg-[var(--bg-tertiary)]" style={{ width: "100%", maxWidth: "200px" }}>
            <div className="aspect-video relative w-full">
              <Image
                src={result.thumbnail}
                alt={result.title}
                fill
                className="object-cover"
                unoptimized
              />
              {result.duration && (
                <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white font-mono">
                  {formatDuration(result.duration)}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-[#3B82F6] uppercase tracking-wide">
                {PLATFORM_LABELS[result.platform] ?? result.platform}
              </span>
            </div>
            <h3 className="font-semibold text-[var(--text-primary)] text-sm leading-snug line-clamp-2">
              {result.title}
            </h3>
            {result.author && (
              <div className="mt-1 flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
                <User className="h-3 w-3" />
                {result.author}
              </div>
            )}
          </div>

          {/* Quality selector */}
          <div>
            <p className="text-xs text-[var(--text-tertiary)] mb-2 font-medium uppercase tracking-wide">Select Quality</p>
            <div className="flex flex-wrap gap-1.5">
              {videoFormats.map((fmt) => (
                <button
                  key={fmt.format_id}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                    selectedFormat?.format_id === fmt.format_id
                      ? "border-[#3B82F6] bg-[#3B82F6]/10 text-[#3B82F6]"
                      : "border-[var(--border)] bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)]"
                  }`}
                >
                  {fmt.quality}
                  {fmt.size && (
                    <span className="ml-1 text-[10px] opacity-60">{formatBytes(fmt.size)}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Download buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="primary"
              size="md"
              onClick={handleDownload}
              loading={downloading}
              className="gap-2"
            >
              {downloaded ? (
                <><Check className="h-4 w-4" /> Downloaded!</>
              ) : (
                <><Download className="h-4 w-4" /> Download Video</>
              )}
            </Button>
            {audioFormats.length > 0 && (
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  const af = audioFormats[0];
                  if (af) {
                    setSelectedFormat(af);
                    window.open(buildDownloadUrl(af.format_id, af.url), "_blank", "noopener,noreferrer");
                  }
                }}
                className="gap-2"
              >
                <Music className="h-4 w-4" /> MP3
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Footer info */}
      {selectedFormat && (
        <div className="border-t border-[var(--border)] bg-[var(--bg-tertiary)] px-5 py-3 flex flex-wrap gap-4 text-xs text-[var(--text-tertiary)]">
          {selectedFormat.size && (
            <span className="flex items-center gap-1">
              <Download className="h-3 w-3" /> {formatBytes(selectedFormat.size)}
            </span>
          )}
          {result.duration && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {formatDuration(result.duration)}
            </span>
          )}
          <span className="uppercase">{selectedFormat.ext}</span>
        </div>
      )}
    </div>
  );
}
