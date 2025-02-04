import React, { Suspense } from "react";
import { fetchMostPopularBooks } from "@/service/dataoperation";
import { Metadata } from "next";
import GradBanner from "@/components/Shared/GradBanner";
import DetailList from "@/components/Elements/DetailCard/DetailList";
import DetailsListSkeleton from "@/components/Elements/DetailCard/DetailsListSkeleton";

export const experimental_ppr = true;

const MostPopular = () => {
  return (
    <GradBanner main="Most Popular" sub={`Popular novels selected by readers`}>
      <Suspense fallback={<DetailsListSkeleton />}>
        <DetailList func={fetchMostPopularBooks} onPage="mostpopular" />
      </Suspense>
    </GradBanner>
  );
};

export default MostPopular;

export async function generateMetadata(): Promise<Metadata> {
  const book = await fetchMostPopularBooks();
  const books =
    book !== "Invalid Page"
      ? book.data.map((bk) => {
          return bk.title;
        })
      : ["Most Popular Novels"];
  const images =
    book !== "Invalid Page"
      ? book.data.map((bk) => {
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
