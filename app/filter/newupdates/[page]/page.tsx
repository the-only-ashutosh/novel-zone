import NewUpdatesItem from "@/components/Elements/NewUpdates/NewUpdates";
import { fetchRecentUpdatesPage } from "@/service/dataoperation";
import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import GradBanner from "@/components/Shared/GradBanner";
import { notFound } from "next/navigation";
const Pages = dynamic(() => import("@/components/Shared/Pages"));

const NewUpdatesPage = async ({
  params,
}: {
  params: Promise<{ page: number }>;
}) => {
  const { page } = await params;
  const newUpdates = await fetchRecentUpdatesPage(page);
  return (
    <div className="flex items-center">
      {newUpdates !== "Invalid Page" ? (
        <GradBanner main="New Updates" sub="Recent Updated Chapters">
          <div className="flex flex-col justify-center items-center w-full">
            {newUpdates.data.map((element) => {
              return (
                <NewUpdatesItem
                  chapTitle={element.title}
                  chapUrl={`/book/${element.book!.bookUrl}/${element.url}`}
                  time={element.addAt}
                  title={element.book!.title}
                  url={element.book!.imageUrl}
                  key={String(element.addAt) + element.title}
                  aspectratio={Number(element.book!.aspectRatio)}
                  bookUrl={element.book!.bookUrl}
                  author={element.book!.author.name}
                />
              );
            })}

            <Pages url="/filter/newupdates" totalPages={5} />
          </div>
        </GradBanner>
      ) : (
        <div className="flex w-[90%] h-full justify-center items-center">
          {notFound()}
        </div>
      )}
    </div>
  );
};

export default NewUpdatesPage;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: number }>;
}): Promise<Metadata> {
  const { page } = await params;
  const book = await fetchRecentUpdatesPage(page);
  const books =
    book !== "Invalid Page"
      ? book.data.map((bk) => {
          return bk.title;
        })
      : ["Recent Updates", "New Updates"];
  const images =
    book !== "Invalid Page"
      ? book.data.map((bk) => {
          return bk.book!.imageUrl;
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
