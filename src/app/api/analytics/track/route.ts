import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";

export const dynamic = "force-dynamic";

const ANALYTICS_FILE = path.join(os.tmpdir(), "khabarganit_real_analytics.json");

interface VisitRecord {
  timestamp: number;
  section: string;
  device: "Mobile" | "Desktop" | "Tablet";
}

function loadVisits(): VisitRecord[] {
  try {
    if (fs.existsSync(ANALYTICS_FILE)) {
      const raw = fs.readFileSync(ANALYTICS_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch {}
  return [];
}

function saveVisits(visits: VisitRecord[]) {
  try {
    // Keep max 5,000 recent visits
    const trimmed = visits.slice(-5000);
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(trimmed), "utf-8");
  } catch {}
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const userAgent = request.headers.get("user-agent") || "";

    const device: VisitRecord["device"] =
      body.device ||
      (/Mobi|Android|iPhone/i.test(userAgent)
        ? "Mobile"
        : /iPad|Tablet/i.test(userAgent)
        ? "Tablet"
        : "Desktop");

    const section = (body.section || "TRENDING").toUpperCase();

    const newRecord: VisitRecord = {
      timestamp: Date.now(),
      section,
      device,
    };

    const visits = loadVisits();
    visits.push(newRecord);
    saveVisits(visits);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
