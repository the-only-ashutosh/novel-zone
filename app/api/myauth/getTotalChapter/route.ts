import { getTotalChapter } from "@/service/dataoperation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { book }: { book: string } = await req.json();
  return NextResponse.json(await getTotalChapter(book));
}
