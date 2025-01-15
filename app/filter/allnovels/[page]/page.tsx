import DetailBanner from "@/components/Elements/AllNovels/DetailBanner";
import GradBanner from "@/components/Shared/GradBanner";
import { fetchAllNovelsPage } from "@/service/dataoperation";
import { Metadata } from "next";
import React from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
const Pages = dynamic(() => import("@/components/Shared/Pages"));

type SearchParams = Promise<{ [key: string]: string }>;

const AllNovelsPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ page: number }>;
  searchParams: SearchParams;
}) => {
  const { page } = await params;
  const { viewport } = await searchParams;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const books = await fetchAllNovelsPage(page);
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

export default AllNovelsPage;

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: number }>;
}): Promise<Metadata> {
  const { page } = await params;
  const book = await fetchAllNovelsPage(page);
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
