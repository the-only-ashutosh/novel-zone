import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { device } = userAgent(request);
  const newHeaders = new Headers(request.headers);
  newHeaders.append("pathname", url.pathname);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";
  newHeaders.append("viewport", viewport);
  url.searchParams.set("viewport", viewport);
  return NextResponse.rewrite(url, { request: { headers: newHeaders } });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|api|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
