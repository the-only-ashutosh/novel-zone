import GradBanner from "@/components/Shared/GradBanner";
import { fetchAllNovelsPage } from "@/service/dataoperation";
import { Metadata } from "next/types";
import React, { Suspense } from "react";
import DetailList from "@/components/Elements/DetailCard/DetailList";
import DetailsListSkeleton from "@/components/Elements/DetailCard/DetailsListSkeleton";
import Script from "next/script";
import CosmicChroniclesCard from "@/components/UI/cosmic-chronicles";

export const experimental_ppr = true;

const AllNovels = () => {
  return (
    <div className="mt-4 mb-10">
      <GradBanner main="Novels" sub="All available novels">
        <Suspense fallback={<DetailsListSkeleton />}>
          <DetailList func={fetchAllNovelsPage} onPage="allnovels" />
        </Suspense>
      </GradBanner>
      <CosmicChroniclesCard />
      <Script
        strategy="afterInteractive"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-TESRE0F8SW"
      />
      <Script
        strategy="afterInteractive"
        id="tag-manager"
      >{`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-TESRE0F8SW');`}</Script>
    </div>
  );
};

export default AllNovels;

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const book = await fetchAllNovelsPage();
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
