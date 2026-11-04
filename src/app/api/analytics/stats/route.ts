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

export async function GET() {
  const visits = loadVisits();
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;

  // Real counting
  const todayVisits = visits.filter((v) => now - v.timestamp <= oneDayMs);
  const lastDayVisits = visits.filter(
    (v) => now - v.timestamp > oneDayMs && now - v.timestamp <= 2 * oneDayMs
  );

  // Device counts
  const deviceCounts = { Mobile: 0, Desktop: 0, Tablet: 0 };
  visits.forEach((v) => {
    if (v.device in deviceCounts) {
      deviceCounts[v.device]++;
    } else {
      deviceCounts.Desktop++;
    }
  });

  const total = visits.length || 1;
  const mobilePct = Math.round((deviceCounts.Mobile / total) * 100);
  const desktopPct = Math.round((deviceCounts.Desktop / total) * 100);
  const tabletPct = Math.max(0, 100 - mobilePct - desktopPct);

  // Section breakdown
  const sectionCounts: Record<string, number> = {};
  visits.forEach((v) => {
    const sec = v.section || "TRENDING";
    sectionCounts[sec] = (sectionCounts[sec] || 0) + 1;
  });

  const sectionBreakdown = Object.entries(sectionCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({
      name,
      count: `${count} views`,
      percentage: Math.round((count / total) * 100),
    }));

  // Daily trend over last 5 days
  const dailyTrend = [];
  const dayNames = ["4d ago", "3d ago", "2d ago", "Last Day (Yesterday)", "Today"];

  for (let i = 4; i >= 0; i--) {
    const start = now - (i + 1) * oneDayMs;
    const end = now - i * oneDayMs;
    const count = visits.filter((v) => v.timestamp > start && v.timestamp <= end).length;
    dailyTrend.push({
      day: dayNames[4 - i],
      visitors: count,
      isLastDay: i === 1,
      isToday: i === 0,
    });
  }

  return NextResponse.json({
    realData: true,
    todayCount: todayVisits.length,
    lastDayCount: lastDayVisits.length,
    totalCount: visits.length,
    deviceBreakdown: {
      mobile: mobilePct,
      desktop: desktopPct,
      tablet: tabletPct,
    },
    sectionBreakdown,
    dailyTrend,
  });
}
