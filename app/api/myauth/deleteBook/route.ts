import { deleteBook } from "@/service/dataoperation";
import { NextRequest, NextResponse } from "next/server";

const reasons = ["Chapter uploading issue", "Duplicate book"];
export async function POST(req: NextRequest) {
  const { bookUrl, reason }: { bookUrl: string; reason: string } =
    await req.json();
  if (reasons.includes(reason)) {
    await deleteBook(bookUrl);
    return NextResponse.json({ message: "Deleted succesfully!" });
  }
  return NextResponse.json({ message: "Unknown Error!" });
}
