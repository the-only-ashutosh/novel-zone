import { addSingleChapter } from "@/service/dataoperation";
import { Chapter } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { chapter }: { chapter: Chapter } = await req.json();
  return NextResponse.json(await addSingleChapter(chapter));
}
