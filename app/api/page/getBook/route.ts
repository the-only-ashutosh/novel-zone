import { fetchBookDetails } from "@/service/dataoperation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { book }: { book: string } = await req.json();

  const res = await fetchBookDetails(book);
  return NextResponse.json(res);
}
