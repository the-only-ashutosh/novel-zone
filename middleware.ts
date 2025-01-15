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
