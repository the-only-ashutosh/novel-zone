import React, { Suspense } from "react";
import { fetchMostPopularBooks } from "@/service/dataoperation";
import { Metadata } from "next";
import GradBanner from "@/components/Shared/GradBanner";
import DetailList from "@/components/Elements/DetailCard/DetailList";
import DetailsListSkeleton from "@/components/Elements/DetailCard/DetailsListSkeleton";

export const experimental_ppr = true;

const MostPopularPage = ({ params }: { params: Promise<{ page: number }> }) => {
  return (
    <div className="flex mt-4 mb-10 w-full">
      <GradBanner
        main="Most Popular"
        sub={`Popular novels selected by readers`}
      >
        <Suspense fallback={<DetailsListSkeleton />}>
          <DetailList
            func={fetchMostPopularBooks}
            params={params}
            onPage="mostpopular"
          />
        </Suspense>
      </GradBanner>
    </div>
  );
};

export default MostPopularPage;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: number }>;
}): Promise<Metadata> {
  const { page } = await params;
  const book = await fetchMostPopularBooks(page);
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
