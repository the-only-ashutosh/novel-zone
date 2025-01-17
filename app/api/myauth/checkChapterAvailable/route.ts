import { checkChapter } from "@/service/dataoperation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    chapter,
    book,
  }: { chapter: { ch: string; num: number; bookId: number }[]; book: string } =
    await req.json();

  return NextResponse.json({ chapters: await checkChapter(book, chapter) });
}
