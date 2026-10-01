import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  isLocale,
  LOCALE_COOKIE,
  negotiateLocale,
} from "@/i18n/config";

function preferredLocale(request: NextRequest) {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;
  return negotiateLocale(request.headers.get("accept-language"));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/uploads") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/sitemap") ||
    pathname.startsWith("/robots") ||
    pathname.includes(".")
  ) {
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
      const token = request.cookies.get("jwits_admin_token")?.value;
      if (!token) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    }
    return NextResponse.next();
  }

  const segment = pathname.split("/")[1];
  if (!isLocale(segment)) {
    const locale = preferredLocale(request);
    const url = request.nextUrl.clone();
    url.pathname =
      pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
    const res = NextResponse.redirect(url);
    res.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return res;
  }

  const res = NextResponse.next();
  res.cookies.set(LOCALE_COOKIE, segment, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
