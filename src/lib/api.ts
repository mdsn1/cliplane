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

function getProToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("cliplane_token") ?? "";
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getProToken();
  const res = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "X-Pro-Token": token } : {}),
      ...options?.headers,
    },
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

export function buildDownloadUrl(
  formatId: string,
  url: string,
  title?: string,
  platform?: string,
  quality?: string,
): string {
  const token = getProToken();
  const params = new URLSearchParams({ format_id: formatId, url });
  if (token) params.set("pro_token", token);
  if (title) params.set("title", title);
  if (platform) params.set("platform", platform);
  if (quality) params.set("quality", quality);
  return `/api/download?${params.toString()}`;
}
