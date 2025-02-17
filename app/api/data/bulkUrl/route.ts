import { fetchChapterUrl } from "@/service/dataoperation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { page }: { page: number } = await req.json();
  return NextResponse.json(await fetchChapterUrl(page));
}
