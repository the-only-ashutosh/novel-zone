import { newRating } from "@/service/dataoperation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { stars, title } = await req.json();
  return NextResponse.json({
    message: "Success",
    newrating: await newRating(stars, title),
  });
}
