import { NextRequest } from "next/server";

const BACKEND = process.env.API_URL ?? "http://localhost:8000";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const backendUrl = new URL(`${BACKEND}/api/download`);
    searchParams.forEach((value, key) => backendUrl.searchParams.set(key, value));

    const res = await fetch(backendUrl.toString());

    const headers = new Headers();
    const contentType = res.headers.get("Content-Type");
    const contentDisposition = res.headers.get("Content-Disposition");
    const contentLength = res.headers.get("Content-Length");
    if (contentType) headers.set("Content-Type", contentType);
    if (contentDisposition) headers.set("Content-Disposition", contentDisposition);
    if (contentLength) headers.set("Content-Length", contentLength);

    return new Response(res.body, { status: res.status, headers });
  } catch {
    return new Response(JSON.stringify({ detail: "Failed to reach the download server." }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}
