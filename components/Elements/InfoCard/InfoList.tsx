import React from "react";
import Grid from "@mui/material/Grid";
import dynamic from "next/dynamic";
import { Decimal } from "@prisma/client/runtime/library";
const InfoCard = dynamic(() => import("./InfoCard"), { ssr: true });

export type bookData = {
  id: number;
  title: string;
  bookUrl: string;
  imageUrl: string;
  aspectRatio: Decimal;
  ratings: Decimal;
  views: number;
  status: string;
  _count: {
    chapter: number;
  };
};

const InfoList = ({
  data,
  cls,
  r,
}: {
  data: Array<bookData>;
  cls: string;
  r: boolean;
}) => {
  const random = r ? Math.floor(Math.random() * 12) : -1;
  return (
    <Grid className={`grid justify-center gap-4 maingrid ${cls}`}>
      {data.map((book, i) => {
        return (
          <InfoCard
            key={book.bookUrl}
            imgUrl={book.imageUrl}
            title={book.title}
            bookUrl={book.bookUrl}
            rating={Number(book.ratings).toFixed(1)}
            views={book.views}
            status={book.status}
            totalChapters={book._count.chapter}
            aspectRatio={Number(book.aspectRatio)}
            priority={i < 2}
            htag={random === i}
          />
        );
      })}
    </Grid>
  );
};

export default InfoList;
