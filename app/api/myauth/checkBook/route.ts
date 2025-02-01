import { checkBook } from "@/service/dataoperation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const book = await req.json();
  return NextResponse.json(await checkBook(book));
}
