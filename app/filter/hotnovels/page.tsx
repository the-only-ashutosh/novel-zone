import React, { Suspense } from "react";
import { fetchHotBook } from "@/service/dataoperation";
import { Metadata } from "next";
import GradBanner from "@/components/Shared/GradBanner";
import DetailList from "@/components/Elements/DetailCard/DetailList";
import DetailsListSkeleton from "@/components/Elements/DetailCard/DetailsListSkeleton";

export const experimental_ppr = true;
const HotNovels = () => {
  return (
    <GradBanner main="Hot Novels" sub="New Books like by Readers">
      <Suspense fallback={<DetailsListSkeleton />}>
        <DetailList func={fetchHotBook} onPage="hotnovels" />
      </Suspense>
    </GradBanner>
  );
};

export default HotNovels;

export async function generateMetadata(): Promise<Metadata> {
  const book = await fetchHotBook();
  const books =
    book !== "Invalid Page"
      ? book.data.map((bk) => {
          return bk.title;
        })
      : ["Hot Novels"];
  const images =
    book !== "Invalid Page"
      ? book.data.map((bk) => {
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
      title: "Hot Novels",
      images: [...images], // Must be an absolute URL
    },
  };
}
