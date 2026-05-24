import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const BACKEND = process.env.API_URL;

  if (!BACKEND) {
    return NextResponse.json(
      { detail: "Backend not configured. Set the API_URL environment variable in Vercel." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const res = await fetch(`${BACKEND}/api/resolve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({ detail: `Backend returned status ${res.status} with no JSON body.` }));
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { detail: `Cannot reach backend at ${BACKEND}: ${message}` },
      { status: 502 }
    );
  }
}
