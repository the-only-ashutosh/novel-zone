import prisma from "@/service/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { start }: { start: number } = await req.json();
  const urls = await prisma.chapter
    .findMany({
      cursor: { id: start },
      skip: 1,
      take: 10000,
      select: { book: { select: { bookUrl: true } }, url: true },
    })
    .then((data) => {
      return data.map((e) => {
        return `https://novelzone.fun/book/${e.book.bookUrl}/${e.url}`;
      });
    });
  const res = await axios.post("https://api.indexnow.org", {
    host: "novelzone.fun",
    key: "72386b31e608472c9443a57c787d3177",
    keyLocation: "https://novelzone.fun/72386b31e608472c9443a57c787d3177.txt",
    urlList: urls,
  });
  return NextResponse.json({ message: res.statusText });
}
