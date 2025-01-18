import React, { Suspense } from "react";
import type { Metadata } from "next";
import { fetchCompletedBook } from "@/service/dataoperation";
import GradBanner from "@/components/Shared/GradBanner";
import DetailList from "@/components/Elements/DetailCard/DetailList";
import DetailsListSkeleton from "@/components/Elements/DetailCard/DetailsListSkeleton";

export const experimental_ppr = true;
const Completed = () => {
  return (
    <GradBanner main="Completed Novels" sub="Completed by Author">
      <Suspense fallback={<DetailsListSkeleton />}>
        <DetailList func={fetchCompletedBook} onPage="completed" />
      </Suspense>
    </GradBanner>
  );
};

export default Completed;

export async function generateMetadata(): Promise<Metadata> {
  const book = await fetchCompletedBook();
  const books =
    book !== "Invalid Page"
      ? book.data.map((bk) => {
          return bk.title;
        })
      : ["Completed Novels"];
  const images =
    book !== "Invalid Page"
      ? book.data.map((bk) => {
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
