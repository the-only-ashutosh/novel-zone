import { fetchAllBooks } from "@/service/dataoperation";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await fetchAllBooks());
}
