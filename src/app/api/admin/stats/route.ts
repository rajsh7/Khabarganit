import { SAMPLE_ARTICLES } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function GET() {
  const totalViews = SAMPLE_ARTICLES.reduce((sum, a) => sum + a.views, 0);
  const stats = {
    totalArticles: SAMPLE_ARTICLES.length,
    publishedArticles: SAMPLE_ARTICLES.length,
    draftArticles: 3,
    totalViews,
    todayViews: 84320,
    monthlyViews: 2450000,
    totalUsers: 12845,
    categoryCounts: {
      rashtriya: 234,
      antarrashtriya: 189,
      rajniti: 156,
      vyapar: 201,
      khel: 178,
      manoranjan: 143,
      takneek: 98,
      swasthya: 87,
      shiksha: 64,
    },
  };
  return NextResponse.json(stats);
}
