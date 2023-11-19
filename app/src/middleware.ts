// ** next
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ** config
import { COOKIE_NAMES } from "@/config";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const isToken = request.cookies.has(COOKIE_NAMES.TOKEN);

  if (isToken && request.nextUrl.pathname.includes("/admin/login")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (
    !isToken &&
    !request.nextUrl.pathname.includes("/admin/login") &&
    request.nextUrl.pathname.includes("/admin")
  ) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return response;
}

export const config = {
  matcher: "/admin/:path*",
};
