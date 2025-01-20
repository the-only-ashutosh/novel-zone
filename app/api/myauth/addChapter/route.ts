import { addChapters } from "@/service/dataoperation";
import { Chapter } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { chapters }: { chapters: Chapter[] } = await req.json();
  addChapters(chapters);
  return NextResponse.json({ message: "Success!" });
}
