import { addBook } from "@/service/dataoperation";
import { IncomingBook } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const book: IncomingBook = await req.json();
  return NextResponse.json(await addBook(book));
}
