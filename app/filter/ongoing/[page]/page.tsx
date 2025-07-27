import React, { Suspense } from "react";
import type { Metadata } from "next";
import { fetchOngoingBook } from "@/service/dataoperation";
import GradBanner from "@/components/Shared/GradBanner";
import DetailList from "@/components/Elements/DetailCard/DetailList";
import DetailsListSkeleton from "@/components/Elements/DetailCard/DetailsListSkeleton";

export const experimental_ppr = true;

const OngoingPage = ({ params }: { params: Promise<{ page: number }> }) => {
  return (
    <GradBanner main="Ongoing Novels" sub="Available for updates">
      <Suspense fallback={<DetailsListSkeleton />}>
        <DetailList params={params} func={fetchOngoingBook} onPage="ongoing" />
      </Suspense>
    </GradBanner>
  );
};

export default OngoingPage;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: number }>;
}): Promise<Metadata> {
  const { page } = await params;
  const book = await fetchOngoingBook(page);
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
