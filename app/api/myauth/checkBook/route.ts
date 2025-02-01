import prisma from "@/service/client";
import { checkBook } from "@/service/dataoperation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const book = await req.json();
  return NextResponse.json(await checkBook(book));
}

export async function GET() {
  const books = await prisma.book.findMany({
    select: { bookUrl: true, imageUrl: true },
    orderBy: { id: "asc" },
  });
  return NextResponse.json({ books });
}
