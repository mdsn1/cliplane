import { NextResponse } from "next/server";

export async function GET() {
  const BACKEND = process.env.API_URL;

  if (!BACKEND) {
    return NextResponse.json({
      status: "misconfigured",
      problem: "API_URL environment variable is not set in Vercel.",
      fix: "Go to Vercel → your project → Settings → Environment Variables and add API_URL pointing to your deployed backend.",
    }, { status: 503 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`${BACKEND}/api/stats/public`, { signal: controller.signal });
    clearTimeout(timeout);

    return NextResponse.json({
      status: "ok",
      backend: BACKEND,
      backend_status: res.status,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({
      status: "unreachable",
      backend: BACKEND,
      problem: message,
      fix: "Ensure your backend server is running and publicly accessible at the URL set in API_URL.",
    }, { status: 502 });
  }
}
