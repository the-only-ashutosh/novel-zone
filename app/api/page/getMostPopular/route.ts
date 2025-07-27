import { fetchMostPopular } from "@/service/dataoperation";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await fetchMostPopular();
  if (data === "Error") revalidateTag("MostPopularRoute");
  return NextResponse.json(data);
}
