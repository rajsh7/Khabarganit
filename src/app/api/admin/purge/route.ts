import { NextResponse } from "next/server";
import { newsPipeline } from "@/lib/newsPipeline";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    let hours = 24;
    try {
      const body = await request.json();
      if (body && typeof body.hours === "number" && body.hours > 0) {
        hours = body.hours;
        newsPipeline.setAutoPurgeHours(hours);
      }
    } catch {}

    const result = newsPipeline.pruneExpiredNews(hours);

    return NextResponse.json({
      success: true,
      message: `Pruned ${result.prunedCount} stories older than ${hours} hours (1 day).`,
      prunedCount: result.prunedCount,
      remainingUpdates: result.remainingUpdates,
      autoPurgeHours: hours,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to prune expired news" },
      { status: 500 }
    );
  }
}
