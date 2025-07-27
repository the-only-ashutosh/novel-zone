"use server";
import React from "react";
import dynamic from "next/dynamic";
import { Decimal } from "@prisma/client/runtime/library";
import { RecentsChapter } from "@/types";
const RecentInfo = dynamic(() => import("./InfoBanner"), { ssr: true });

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

export type newBooksData = {
  bookUrl: string;
  imageUrl: string;
  title: string;
  last: RecentsChapter;
  secondLast: RecentsChapter;
  updatedAt: Date;
};

const NewInfoBannerList = async ({ data }: { data: Array<newBooksData> }) => {
  return (
    <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 mt-6 mb-10 mx-1">
      {data.map((book) => {
        return (
          <RecentInfo
            key={book.title}
            book={book.title}
            bookUrl={book.bookUrl}
            img={book.imageUrl}
            last={book.last}
            secondLast={book.secondLast}
            updated={book.updatedAt}
          />
        );
      })}
    </div>
  );
};

export default NewInfoBannerList;
