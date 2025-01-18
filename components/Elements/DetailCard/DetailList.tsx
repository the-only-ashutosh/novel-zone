import React from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { detailCardData } from "@/types";

const DetailCard = dynamic(
  () => import("@/components/Elements/DetailCard/DetailCard"),
  { ssr: true }
);
const Pages = dynamic(() => import("@/components/Shared/Pages"));

const DetailList = async ({
  params,
  func,
  onPage,
}: {
  params?: Promise<{ page: number }>;
  func: (page: number) => Promise<"Invalid Page" | detailCardData>;
  onPage: string;
}) => {
  const page = await params;
  const books = await func(page?.page ?? 1);
  if (books === "Invalid Page") notFound();
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="grid updatedlistgrid gap-4 justify-center w-full">
        {books.data.map((book) => {
          return (
            <DetailCard
              aspectRatio={Number(book.aspectRatio)}
              bookUrl={book.bookUrl}
              chapters={book._count.chapter}
              imageUrl={book.imageUrl}
              status={book.status}
              time={book.updatedAt}
              title={book.title}
              key={book.title}
              ratings={(book.totalStars / book.userrated).toFixed(1)}
            />
          );
        })}
      </div>
      {books.pages > 1 && (
        <Pages url={`/filter/${onPage}`} totalPages={books.pages} />
      )}
    </div>
  );
};

export default DetailList;
