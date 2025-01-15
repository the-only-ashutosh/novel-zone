import { fetchChaptersList } from "@/service/dataoperation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { book }: { book: string } = await req.json();
  const response = await fetchChaptersList(book);
  if (response) {
    return NextResponse.json({ message: "Success", content: response });
  } else {
    return NextResponse.json({ message: "Failed", failed: [] });
  }
}
