import { addAuthor } from "@/service/dataoperation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { author, authorRoute }: { author: string; authorRoute: string } =
    await req.json();
  return NextResponse.json(await addAuthor(author, authorRoute));
}
