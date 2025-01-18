import React, { Suspense } from "react";
import { fetchRecentUpdatesPage } from "@/service/dataoperation";
import { Metadata } from "next";
import GradBanner from "@/components/Shared/GradBanner";
import NewUpdatesList from "@/components/Elements/NewUpdates/NewUpdatesList";
import NewUpdatesSkeleton from "@/components/Elements/NewUpdates/NewUpdatesSkeleton";

export const experimental_ppr = true;

const NewUpdates = () => {
  return (
    <div className="flex items-center">
      <GradBanner main="New Updates" sub="Recent Updated Chapters">
        <Suspense fallback={<NewUpdatesSkeleton />}>
          <NewUpdatesList />
        </Suspense>
      </GradBanner>
    </div>
  );
};

export default NewUpdates;

export async function generateMetadata(): Promise<Metadata> {
  const book = await fetchRecentUpdatesPage();
  const books =
    book !== "Invalid Page"
      ? book.data.map((bk) => {
          return bk.title;
        })
      : ["Recent Updates", "New Updates"];
  const images =
    book !== "Invalid Page"
      ? book.data.map((bk) => {
          return bk.book.imageUrl;
        })
      : [];
  return {
    title: "Newly Updated Novels",
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
      title: "Newly Updated Books",
      images: [...images], // Must be an absolute URL
    },
  };
}
