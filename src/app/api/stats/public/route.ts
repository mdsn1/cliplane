import { NextResponse } from "next/server";

export async function GET() {
  const BACKEND = process.env.API_URL;

  if (!BACKEND) {
    return NextResponse.json({ total_downloads: 0, platforms_supported: 7 }, { status: 200 });
  }

  try {
    const res = await fetch(`${BACKEND}/api/stats/public`, { next: { revalidate: 60 } });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ total_downloads: 0, platforms_supported: 7 }, { status: 200 });
  }
}
