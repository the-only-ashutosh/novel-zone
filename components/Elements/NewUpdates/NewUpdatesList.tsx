import React from "react";
import dynamic from "next/dynamic";
import NewUpdatesItem from "@/components/Elements/NewUpdates/NewUpdates";
import { fetchRecentUpdatesPage } from "@/service/dataoperation";
import { notFound } from "next/navigation";
import { newUpdates } from "@/types";

const Pages = dynamic(() => import("@/components/Shared/Pages"));

const NewUpdatesList = async ({
  params,
}: {
  params?: Promise<{ page: number }>;
}) => {
  const page = await params;
  const newUpdates: newUpdates = await fetchRecentUpdatesPage(page?.page ?? 1);
  if (newUpdates === "Invalid Page") notFound();
  return (
    <div className="flex flex-col justify-center items-center w-full">
      {newUpdates.data.map((element, i) => {
        return (
          <NewUpdatesItem
            chapTitle={element.book.chapter[0].title}
            chapUrl={`/book/${element.book.bookUrl}/${element.book.chapter[0].url}?num=${element.book.chapter[0].number}`}
            time={element.addAt}
            title={element.book.title}
            url={element.book.imageUrl}
            key={String(element.addAt) + i}
            aspectratio={Number(element.book.aspectRatio)}
            bookUrl={element.book.bookUrl}
            author={element.book.author.name}
          />
        );
      })}
      <Pages url="/filter/newupdates" totalPages={newUpdates.pages} />
    </div>
  );
};

export default NewUpdatesList;
