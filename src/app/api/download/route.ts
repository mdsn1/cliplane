import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const BACKEND = process.env.API_URL;

  if (!BACKEND) {
    return NextResponse.json(
      { detail: "Backend not configured. Set the API_URL environment variable in Vercel." },
      { status: 503 }
    );
  }

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
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { detail: `Cannot reach backend at ${BACKEND}: ${message}` },
      { status: 502 }
    );
  }
}
