import { NextResponse, userAgent } from "next/server";
import { auth } from "./auth";
import { cookies } from "next/headers";
import { setCookie } from "cookies-next/server";
import { upsertUser } from "./service/useraction";

export default auth(async (req) => {
  const url = req.nextUrl;
  const { device, ua } = userAgent(req);
  if (
    ua.includes("Edg/114.0.1823.43") ||
    ua.includes("GPTBot") ||
    ua.includes("meta-externalagent") ||
    ua.includes("semrush") ||
    ua.includes("Chrome/101.0.4951.67")
  ) {
    return NextResponse.json({ message: "Host is down" }, { status: 403 });
  }

  if (req.auth) {
    await upsertUser(req.auth.user!);
  }
  if (req.auth && url.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/user/profile", req.nextUrl.origin));
  }
  if (!url.pathname.startsWith("/auth")) {
    await setCookie("callbackUrl", url.pathname, {
      cookies,
      sameSite: "strict",
      secure: true,
    });
  }
  if (!req.auth && req.nextUrl.pathname.startsWith("/user")) {
    const newUrl = new URL("/auth/signin", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
  const newHeaders = new Headers(req.headers);
  newHeaders.append("Access-Control-Allow-Origin", "*");
  newHeaders.append("Access-Control-Allow-Origin", "https://mc.yandex.ru");
  newHeaders.append("Access-Control-Allow-Origin", "https://yandex.ru");
  newHeaders.append("Access-Control-Allow-Origin", "https://an.yandex.ru");
  try {
    newHeaders.append("pathname", decodeURIComponent(url.pathname));
  } catch (err) {
    if (err instanceof TypeError) {
      console.log("Error occured in pathname.");
    }
  }
  const viewport = device.type === "mobile" ? "mobile" : "desktop";
  newHeaders.append("viewport", viewport);
  url.searchParams.set("viewport", viewport);
  return NextResponse.rewrite(url, { request: { headers: newHeaders } });
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|fonts|installHook|filter/|api/data|api/myauth|api/sendLogs|book/sitemap|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
