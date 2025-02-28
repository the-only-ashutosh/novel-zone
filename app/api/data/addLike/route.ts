import { chapterLiked } from "@/service/dataoperation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { book, number }: { book: string; number: number } = await req.json();
  return NextResponse.json(await chapterLiked(book, number));
}
