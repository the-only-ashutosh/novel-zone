/* eslint-disable @typescript-eslint/no-unused-vars */
import GradBanner from "@/components/Shared/GradBanner";
import { fetchByGenre } from "@/service/dataoperation";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { ALL_GENRE } from "@/service/genre";
import DetailList from "@/components/Elements/DetailCard/DetailList";
import DetailsListSkeleton from "@/components/Elements/DetailCard/DetailsListSkeleton";

export const experimental_ppr = true;

const SingleGenre = async ({
  params,
}: {
  params: Promise<{ genre_name: string }>;
}) => {
  const { genre_name } = await params;
  const genre = ALL_GENRE.find(
    (x) => x.route === decodeURIComponent(genre_name)
  );
  return (
    <GradBanner main={`Filtered by Genre`} sub={`${genre?.name}`}>
      <Suspense fallback={<DetailsListSkeleton />}>
        <DetailList
          onPage={`genre/${decodeURIComponent(genre_name)}`}
          func={(page: number) => {
            return fetchByGenre(decodeURIComponent(genre_name));
          }}
        />
      </Suspense>
    </GradBanner>
  );
};

export default SingleGenre;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ genre_name: string }>;
}): Promise<Metadata> {
  const genre_name = decodeURIComponent((await params).genre_name);
  const book = await fetchByGenre(genre_name);
  const genre = ALL_GENRE.find((x) => x.route === genre_name);
  const books =
    book !== "Invalid Page"
      ? book.data.map((bk) => {
          return bk.title;
        })
      : ["By Genre", genre?.name ?? genre_name];
  const images =
    book !== "Invalid Page"
      ? book.data.map((bk) => {
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
