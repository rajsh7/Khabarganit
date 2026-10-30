import { NextResponse } from "next/server";
import { ADMIN_CREDENTIALS, ADMIN_COOKIE_NAME, createAdminSessionToken } from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = (body.email || "").trim().toLowerCase();
    const password = body.password || "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "कृपया ईमेल और पासवर्ड दोनों दर्ज करें (Email and password are required)" },
        { status: 400 }
      );
    }

    if (
      email !== ADMIN_CREDENTIALS.EMAIL.toLowerCase() ||
      password !== ADMIN_CREDENTIALS.PASSWORD
    ) {
      return NextResponse.json(
        { error: "अमान्य ईमेल या पासवर्ड (Invalid email or password)" },
        { status: 401 }
      );
    }

    const token = await createAdminSessionToken(email);

    const response = NextResponse.json({
      success: true,
      message: "सफलतापूर्वक लॉगिन किया गया (Login successful)",
      user: {
        email: ADMIN_CREDENTIALS.EMAIL,
        role: "ADMIN",
      },
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err: any) {
    console.error("Admin login error:", err);
    return NextResponse.json(
      { error: "लॉगिन करने में त्रुटि (Failed to login)" },
      { status: 500 }
    );
  }
}
