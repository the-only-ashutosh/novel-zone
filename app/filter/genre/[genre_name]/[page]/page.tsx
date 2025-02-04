import GradBanner from "@/components/Shared/GradBanner";
import { fetchByGenre } from "@/service/dataoperation";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { ALL_GENRE } from "@/service/genre";
import DetailList from "@/components/Elements/DetailCard/DetailList";
import DetailsListSkeleton from "@/components/Elements/DetailCard/DetailsListSkeleton";

export const experimental_ppr = true;

const SingleGenrePage = async ({
  params,
}: {
  params: Promise<{ genre_name: string; page: number }>;
}) => {
  const { genre_name, page } = await params;
  const genre = ALL_GENRE.find(
    (x) => x.route === decodeURIComponent(genre_name)
  );
  return (
    <GradBanner main={`Filtered by Genre`} sub={`${genre?.name}`}>
      <Suspense fallback={<DetailsListSkeleton />}>
        <DetailList
          onPage={`genre/${decodeURIComponent(genre_name)}`}
          func={(page: number) => {
            return fetchByGenre(decodeURIComponent(genre_name), page);
          }}
          params={Promise.resolve({ page })}
        />
      </Suspense>
    </GradBanner>
  );
};

export default SingleGenrePage;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ genre_name: string; page: number }>;
}): Promise<Metadata> {
  const { page, genre_name } = await params;
  const book = await fetchByGenre(decodeURIComponent(genre_name), page);
  const genre = ALL_GENRE.find(
    (x) => x.route === decodeURIComponent(genre_name)
  );

  const books =
    book !== "Invalid Page"
      ? book.data.map((bk) => {
          return bk.title;
        })
      : ["By Genre", genre?.name ?? decodeURIComponent(genre_name)];
  const images =
    book !== "Invalid Page"
      ? book.data.map((bk) => {
          return bk.imageUrl;
        })
      : [];
  return {
    title: `Page ${page} | ${genre?.name}`,
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
      title: `Books filtered by Genre:${decodeURIComponent(genre_name)}`,
      images: [...images], // Must be an absolute URL
    },
  };
}
