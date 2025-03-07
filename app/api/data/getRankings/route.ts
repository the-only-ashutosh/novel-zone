import { getRankingDetails } from "@/service/dataoperation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { ranking }: { ranking: string } = await req.json();
  console.log(ranking);
  const res = await getRankingDetails();
  return NextResponse.json(res);
}
