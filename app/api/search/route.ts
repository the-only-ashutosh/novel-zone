import { searchBook } from "@/service/dataoperation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { url } = req;
  const toSearch: string = url.split("?")[1].split("=")[1];

  return NextResponse.json(await searchBook(toSearch));
}
