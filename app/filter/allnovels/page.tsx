import DetailBanner from "@/components/Elements/AllNovels/DetailBanner";
import GradBanner from "@/components/Shared/GradBanner";
import { fetchAllNovelsPage } from "@/service/dataoperation";
import { Metadata } from "next/types";
import React from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
const Pages = dynamic(() => import("@/components/Shared/Pages"));

type SearchParams = Promise<{ [key: string]: string }>;

const AllNovels = async ({ searchParams }: { searchParams: SearchParams }) => {
  const books = await fetchAllNovelsPage();
  const { viewport } = await searchParams;
  return (
    <GradBanner main="Novels" sub="All available novels">
      {books !== "Invalid Page" ? (
        <>
          <div className="w-full gap-y-2 grid">
            {books.data.map((book) => {
              return (
                <DetailBanner
                  aspectRatio={Number(book.aspectRatio)}
                  url={book.imageUrl}
                  title={book.title}
                  bookUrl={book.bookUrl}
                  author={book.author.name}
                  statu={book.status}
                  totalChapters={book._count.chapter}
                  key={`${book.imageUrl}`}
                  ratings={book.totalStars}
                  users={book.userrated}
                  viewport={viewport}
                  views={book.views}
                />
              );
            })}
          </div>
          <Pages url={`/filter/allnovels`} totalPages={books.pages} />
        </>
      ) : (
        notFound()
      )}
    </GradBanner>
  );
};

export default AllNovels;

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const book = await fetchAllNovelsPage();
  const books =
    book !== "Invalid Page"
      ? book.data.map((bk) => {
          return bk.title;
        })
      : [""];

  const images =
    book !== "Invalid Page"
      ? book.data.map((bk) => {
          return bk.imageUrl;
        })
      : [""];

  return {
    title: "All Novels",
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
