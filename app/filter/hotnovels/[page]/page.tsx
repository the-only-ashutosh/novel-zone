import React, { Suspense } from "react";
import { fetchHotBook } from "@/service/dataoperation";
import { Metadata } from "next";
import GradBanner from "@/components/Shared/GradBanner";
import DetailList from "@/components/Elements/DetailCard/DetailList";
import DetailsListSkeleton from "@/components/Elements/DetailCard/DetailsListSkeleton";

export const experimental_ppr = true;
const HotNovelsPage = ({ params }: { params: Promise<{ page: number }> }) => {
  return (
    <GradBanner main="Hot Novels" sub="New Books like by Readers">
      <Suspense fallback={<DetailsListSkeleton />}>
        <DetailList func={fetchHotBook} params={params} onPage="hotnovels" />
      </Suspense>
    </GradBanner>
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
      title: "Hot Books",
      images: [...images], // Must be an absolute URL
    },
  };
}
