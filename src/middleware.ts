import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/adminAuth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const authStatus = await verifyAdminSessionToken(sessionCookie);

  // If visiting /admin/login
  if (pathname === "/admin/login") {
    // If already logged in, redirect directly to admin dashboard
    if (authStatus.valid) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    // Otherwise allow viewing login page
    return NextResponse.next();
  }

  // Any other /admin route: must be authenticated
  if (!authStatus.valid) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
