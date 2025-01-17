"use server";
import React from "react";
import dynamic from "next/dynamic";
import { Decimal } from "@prisma/client/runtime/library";
const InfoBanner = dynamic(() => import("./InfoBanner"), { ssr: true });

export type booksData = {
  book: {
    bookUrl: string;
    aspectRatio: Decimal;
    title: string;
    imageUrl: string;
    _count: {
      chapter: number;
    };
  };
  bookId: number;
  addAt: Date;
};

const InfoBannerList = ({ data }: { data: Array<booksData> }) => {
  return (
    <div className="grid updatedlistgrid gap-4 mt-8 mx-[5%] justify-center mb-10">
      {data.map((chap) => {
        return (
          <InfoBanner
            key={chap.addAt.toISOString()}
            book={chap.book.title}
            bookUrl={chap.book.bookUrl}
            img={chap.book.imageUrl}
            number={chap.book._count.chapter}
            time={chap.addAt}
            aspectRatio={Number(chap.book.aspectRatio)}
          />
        );
      })}
    </div>
  );
};

export default InfoBannerList;
