import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  console.log(searchParams.get("sitemap"));
  return NextResponse.json({ message: searchParams.get("sitemap") });
}
