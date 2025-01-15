import React from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { fetchCompletedBook } from "@/service/dataoperation";
import GradBanner from "@/components/Shared/GradBanner";
const DetailCard = dynamic(
  () => import("@/components/Elements/DetailCard/DetailCard"),
  { ssr: true }
);

const Pages = dynamic(() => import("@/components/Shared/Pages"));

const Completed = async () => {
  const books = await fetchCompletedBook();
  return (
    <GradBanner main="Completed Novels" sub="Completed by Author">
      {books !== "Invalid Page" ? (
        <div className="flex flex-col justify-center items-center w-full">
          <div className="grid updatedlistgrid gap-4 justify-center w-full">
            {books.fData.map((book) => {
              return (
                <DetailCard
                  aspectRatio={Number(book.aspectRatio)}
                  bookUrl={book.bookUrl}
                  chapters={book.chapters}
                  imageUrl={book.imageUrl}
                  status={book.status}
                  time={book.updatedAt}
                  title={book.title}
                  key={book.title + book.id}
                  ratings={(book.totalStars / book.userrated).toFixed(1)}
                />
              );
            })}
          </div>
          {books.pages > 1 && (
            <Pages url="/filter/completed" totalPages={books.pages} />
          )}
        </div>
      ) : (
        <div className="flex w-[90%] h-full justify-center items-center">
          Please enter a valid page
        </div>
      )}
    </GradBanner>
  );
};

export default Completed;

export async function generateMetadata(): Promise<Metadata> {
  const book = await fetchCompletedBook();
  const books =
    book !== "Invalid Page"
      ? book.fData.map((bk) => {
          return bk.title;
        })
      : ["Completed Novels"];
  const images =
    book !== "Invalid Page"
      ? book.fData.map((bk) => {
          return bk.imageUrl;
        })
      : [];
  return {
    title: "Completed Novels",
    keywords: [
      "Novel",
      "Novel Zone",
      "Novelbin",
      "lightnovel",
      "webnovel",
      ...books,
    ],
    twitter: {
      card: "summary_large_image",
      title: "Completed Books",
      images: [...images], // Must be an absolute URL
    },
  };
}
