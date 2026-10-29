import { SAMPLE_ARTICLES } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  let articles = SAMPLE_ARTICLES;
  if (category) articles = articles.filter((a) => a.category.slug === category);
  if (featured === "true") articles = articles.filter((a) => a.featured);

  const start = (page - 1) * limit;
  const paginated = articles.slice(start, start + limit);

  return NextResponse.json({
    articles: paginated,
    total: articles.length,
    page,
    totalPages: Math.ceil(articles.length / limit),
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  // In production: validate and save to DB via Prisma
  return NextResponse.json({ success: true, message: "Article created", data: body }, { status: 201 });
}
