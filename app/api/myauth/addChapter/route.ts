import { addNewChapter } from "@/service/dataoperation";
import { IncomingChapter } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const chapter: IncomingChapter = await req.json();

  return NextResponse.json(await addNewChapter(chapter));
}
