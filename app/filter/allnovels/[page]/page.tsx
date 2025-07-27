import GradBanner from "@/components/Shared/GradBanner";
import { fetchAllNovelsPage } from "@/service/dataoperation";
import { Metadata } from "next/types";
import React, { Suspense } from "react";
import DetailList from "@/components/Elements/DetailCard/DetailList";
import DetailsListSkeleton from "@/components/Elements/DetailCard/DetailsListSkeleton";
import CosmicChroniclesCard from "@/components/UI/cosmic-chronicles";

export const experimental_ppr = true;

const AllNovelsPage = ({ params }: { params: Promise<{ page: number }> }) => {
  return (
    <div className="mt-4 mb-10">
      <GradBanner main="Novels" sub="All available novels">
        <Suspense fallback={<DetailsListSkeleton />}>
          <DetailList
            func={fetchAllNovelsPage}
            onPage="allnovels"
            params={params}
          />
        </Suspense>
      </GradBanner>
      <CosmicChroniclesCard />
    </div>
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
