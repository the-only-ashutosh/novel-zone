import { fetchchapters } from "@/service/dataoperation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { url } = req;
  const page: number = Number(url.split("?")[1].split("=")[1]);
  const book: number = Number(url.split("?")[2].split("=")[1]);
  return NextResponse.json(await fetchchapters(book, page));
}
