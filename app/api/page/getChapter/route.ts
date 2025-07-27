import { fetchChapter } from "@/service/dataoperation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    book,
    chapter,
    num,
  }: { book: string; chapter: string; num?: number } = await req.json();
  return NextResponse.json(
    JSON.stringify(await fetchChapter(book, chapter, num)),
    { status: 200 }
  );
}
