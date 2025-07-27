import { getRankingDetails } from "@/service/dataoperation";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getRankingDetails();
  if (data === "Error") revalidateTag("RankingRoute");
  return NextResponse.json(data);
}
