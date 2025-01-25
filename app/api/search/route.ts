import { searchBook } from "@/service/dataoperation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { search } = await req.json();
  return NextResponse.json(await searchBook(search));
}
