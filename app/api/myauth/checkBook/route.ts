import prisma from "@/service/client";
import { checkBook } from "@/service/dataoperation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const book = await req.json();
  return NextResponse.json(await checkBook(book));
}

export async function GET() {
  return NextResponse.json({
    books: await prisma.book.findMany({
      where: { aspectRatio: { not: 0.75 } },
      select: { bookUrl: true, imageUrl: true },
    }),
  });
}
