import React from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { fetchHotBook } from "@/service/dataoperation";
import GradBanner from "@/components/Shared/GradBanner";
import { notFound } from "next/navigation";
const DetailCard = dynamic(
  () => import("@/components/Elements/DetailCard/DetailCard"),
  { ssr: true }
);

const Pages = dynamic(() => import("@/components/Shared/Pages"));

const HotNovelsPage = async ({
  params,
}: {
  params: Promise<{ page: number }>;
}) => {
  const { page } = await params;
  const books = await fetchHotBook(page);

  return (
    <div className="flex mt-4 mb-10">
      <GradBanner main="Hot Novels" sub="New Books like by Readers">
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
              <Pages url="/filter/hotnovels" totalPages={books.pages} />
            )}
          </div>
        ) : (
          <div className="flex w-[90%] h-full justify-center items-center">
            {notFound()}
          </div>
        )}
      </GradBanner>
    </div>
  );
};

export default HotNovelsPage;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: number }>;
}): Promise<Metadata> {
  const { page } = await params;
  const book = await fetchHotBook(page);
  const books =
    book !== "Invalid Page"
      ? book.fData.map((bk) => {
          return bk.title;
        })
      : ["Hot Novels"];
  const images =
    book !== "Invalid Page"
      ? book.fData.map((bk) => {
          return bk.imageUrl;
        })
      : [];
  return {
    title: "Hot Novels",
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
      title: "Hot Books",
      images: [...images], // Must be an absolute URL
    },
  };
}
