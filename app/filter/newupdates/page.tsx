import React, { Suspense } from "react";
import { fetchRecentUpdatesPage } from "@/service/dataoperation";
import { Metadata } from "next";
import GradBanner from "@/components/Shared/GradBanner";
import NewUpdatesList from "@/components/Elements/NewUpdates/NewUpdatesList";
import NewUpdatesSkeleton from "@/components/Elements/NewUpdates/NewUpdatesSkeleton";
import { newUpdates } from "@/types";
import { KEYWORDS } from "@/types/consts";

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
  const book: newUpdates = await fetchRecentUpdatesPage();
  if (book === "Invalid Page") {
    return {
      title: "Newly Updated Novels",
      keywords: [...KEYWORDS],
    };
  }
  const books = book.data.map((bk) => {
    return bk.book.title;
  });
  const images = book.data.map((bk) => {
    return bk.book.imageUrl;
  });
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
