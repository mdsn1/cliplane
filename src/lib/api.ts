const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface VideoFormat {
  quality: string;
  size: number | null;
  format_id: string;
  url: string;
  ext: string;
  has_audio: boolean;
  is_video: boolean;
  fps: number | null;
  vcodec: string | null;
  acodec: string | null;
}

export interface ResolveResponse {
  title: string;
  thumbnail: string | null;
  duration: number | null;
  author: string | null;
  platform: string;
  formats: VideoFormat[];
  error?: string;
}

export interface PublicStats {
  total_downloads: number;
  platforms_supported: number;
}

export interface ApiError {
  detail: string;
  code?: string;
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const err: ApiError = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(err.detail ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function resolveUrl(url: string): Promise<ResolveResponse> {
  return apiFetch<ResolveResponse>("/api/resolve", {
    method: "POST",
    body: JSON.stringify({ url }),
  });
}

export async function getPublicStats(): Promise<PublicStats> {
  return apiFetch<PublicStats>("/api/stats/public");
}

export function buildDownloadUrl(formatId: string, url: string): string {
  const params = new URLSearchParams({ format_id: formatId, url });
  return `${API_BASE}/api/download?${params.toString()}`;
}
