import { addAuthor } from "@/service/dataoperation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { author } = await req.json();
  return NextResponse.json(await addAuthor(author));
}
