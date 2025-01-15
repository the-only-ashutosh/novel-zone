import GradBanner from "@/components/Shared/GradBanner";
import { fetchByGenre } from "@/service/dataoperation";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import React from "react";
import { ALL_GENRE } from "@/service/genre";
const DetailCard = dynamic(
  () => import("@/components/Elements/DetailCard/DetailCard"),
  { ssr: true }
);
const Pages = dynamic(() => import("@/components/Shared/Pages"));

const SingleGenre = async ({
  params,
}: {
  params: Promise<{ genre_name: string }>;
}) => {
  const { genre_name } = await params;
  const genreData = await fetchByGenre(genre_name);
  const genre = ALL_GENRE.find((x) => x.route === genre_name);
  return (
    <div className="mt-4 mb-10">
      <GradBanner main={`Filtered by Genre`} sub={`${genre?.name}`}>
        {genreData !== "Invalid Page" && (
          <div className="flex flex-col justify-center items-center w-full">
            <div className="grid updatedlistgrid gap-4 w-full">
              {genreData.fData.map((book) => {
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
            {Math.ceil(genreData.total / 20) > 1 && (
              <Pages
                totalPages={Math.ceil(genreData.total / 20)}
                url={`/filter/genre/${genre_name}`}
              />
            )}
          </div>
        )}
        {genreData !== "Invalid Page" && genreData.fData.length === 0 && (
          <div className="w-[90vw] h-[100vh] flex justify-center items-center">
            {notFound()}
          </div>
        )}
      </GradBanner>
    </div>
  );
};

export default SingleGenre;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ genre_name: string }>;
}): Promise<Metadata> {
  const { genre_name } = await params;
  const book = await fetchByGenre(genre_name);
  const genre = ALL_GENRE.find((x) => x.route === genre_name);
  const books =
    book !== "Invalid Page"
      ? book.fData.map((bk) => {
          return bk.title;
        })
      : ["By Genre", genre?.name ?? genre_name];
  const images =
    book !== "Invalid Page"
      ? book.fData.map((bk) => {
          return bk.imageUrl;
        })
      : [];

  return {
    title: `${genre?.name ?? genre_name}`,
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
      title: `Books filtered by Genre:${genre_name}`,
      images: [...images], // Must be an absolute URL
    },
  };
}
