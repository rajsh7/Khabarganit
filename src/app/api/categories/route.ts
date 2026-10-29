import { CATEGORIES } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ categories: CATEGORIES });
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ success: true, message: "Category created", data: body }, { status: 201 });
}
