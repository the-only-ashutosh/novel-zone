import { fetchchapters } from "@/service/dataoperation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { page, book } = await req.json();
  return NextResponse.json(await fetchchapters(book, undefined, page));
}
