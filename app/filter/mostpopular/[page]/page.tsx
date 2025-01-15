import React from "react";
import dynamic from "next/dynamic";
import { fetchMostPopularBooks } from "@/service/dataoperation";
import { Metadata } from "next";
import GradBanner from "@/components/Shared/GradBanner";
import { notFound } from "next/navigation";
const DetailCard = dynamic(
  () => import("@/components/Elements/DetailCard/DetailCard"),
  { ssr: true }
);
const Pages = dynamic(() => import("@/components/Shared/Pages"));

const MostPopularPage = async ({
  params,
}: {
  params: Promise<{ page: number }>;
}) => {
  const { page } = await params;
  const books = await fetchMostPopularBooks(page);
  return (
    <div className="flex mt-4 mb-10 w-full">
      <GradBanner
        main="Most Popular"
        sub={`Popular novels selected by readers`}
      >
        {books !== "Invalid Page" ? (
          <div className="flex flex-col justify-center items-center w-full">
            <div className="grid updatedlistgrid gap-4 justify-center w-full">
              {books.fData.map((book) => {
                return (
                  <DetailCard
                    aspectRatio={Number(book.aspectRatio)}
                    bookUrl={book.bookUrl}
                    chapters={book._count.chapter}
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
              <Pages url="/filter/mostpopular" totalPages={books.pages} />
            )}
          </div>
        ) : (
          <div className="flex w-[90%] h-[90vh] justify-center items-center">
            {notFound()}
          </div>
        )}
      </GradBanner>
    </div>
  );
};

export default MostPopularPage;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: number }>;
}): Promise<Metadata> {
  const { page } = await params;
  const book = await fetchMostPopularBooks(page);
  const books =
    book !== "Invalid Page"
      ? book.fData.map((bk) => {
          return bk.title;
        })
      : ["Most Popular Novels"];
  const images =
    book !== "Invalid Page"
      ? book.fData.map((bk) => {
          return bk.imageUrl;
        })
      : [];
  return {
    title: "Most Popular Novels",
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
      title: "Most Popular Books",
      images: [...images], // Must be an absolute URL
    },
  };
}
