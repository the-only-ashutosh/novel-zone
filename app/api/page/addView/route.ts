import { addChapterView } from "@/service/dataoperation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (origin != process.env.HOST) {
    return new NextResponse(null, {
      status: 403,
      statusText: "An Error Occured!",
    });
  }
  const { pathname }: { pathname: string } = await req.json();
  const [book, chapter] = pathname.split("/").slice(-2);
  await addChapterView(decodeURIComponent(chapter), decodeURIComponent(book));

  return new NextResponse(null, { status: 200, statusText: "Success!" });
}
