import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { tag }: { tag: string } = await req.json();
  revalidateTag(tag);
  return NextResponse.json({ message: "Success" }, { status: 200 });
}
