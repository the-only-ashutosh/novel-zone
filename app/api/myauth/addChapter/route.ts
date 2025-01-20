import { addChapters } from "@/service/dataoperation";
import { Chapter } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const chapters: Chapter[] = await req.json();

  return NextResponse.json(await addChapters(chapters));
}
