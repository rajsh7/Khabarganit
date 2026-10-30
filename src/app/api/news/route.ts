import { NextResponse } from "next/server";
import { newsPipeline, PublishPayload } from "@/lib/newsPipeline";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET /api/news -> Returns all broadsheet sections with real-time updates
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section");

  await newsPipeline.syncFromCloud().catch(() => {});

  const headers = {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    "CDN-Cache-Control": "no-store",
    "Vercel-CDN-Cache-Control": "no-store",
  };

  if (section) {
    const page = newsPipeline.getSection(section);
    return NextResponse.json({ page }, { headers });
  }

  const all = newsPipeline.getAllPages();
  return NextResponse.json(all, { headers });
}

// POST /api/news -> Direct publishing API endpoint
export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const secret = process.env.PIPELINE_SECRET || process.env.NEXTAUTH_SECRET;

    // Optional secret check if PIPELINE_SECRET is set
    if (secret && process.env.PIPELINE_SECRET && authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as PublishPayload;

    if (!body.headline) {
      return NextResponse.json({ error: "Headline is required" }, { status: 400 });
    }

    const result = newsPipeline.publish(body);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to publish news" }, { status: 500 });
  }
}
