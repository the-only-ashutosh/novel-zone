import { newRecents } from "@/service/dataoperation";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await newRecents();
  if (data === "Error") revalidateTag("RecentsRoute");
  return NextResponse.json(data);
}
