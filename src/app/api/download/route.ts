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

    // Use redirect: "manual" so we receive the 302 instead of following it and proxying
    const res = await fetch(backendUrl.toString(), { redirect: "manual" });

    // Backend returns 302 to CDN URL — forward the redirect to the browser so it downloads directly
    if (res.status === 301 || res.status === 302 || res.status === 307 || res.status === 308) {
      const location = res.headers.get("location");
      if (location) {
        return NextResponse.redirect(location, { status: 302 });
      }
    }

    // Fallback for non-redirect responses
    return new Response(res.body, { status: res.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { detail: `Cannot reach backend at ${BACKEND}: ${message}` },
      { status: 502 }
    );
  }
}
