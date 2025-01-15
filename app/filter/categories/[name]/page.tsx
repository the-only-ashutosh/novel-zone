import {
  fetchByCategory,
  fetchCategoryFromRoute,
} from "@/service/dataoperation";
import React from "react";
import dynamic from "next/dynamic";
import GradBanner from "@/components/Shared/GradBanner";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const DetailCard = dynamic(
  () => import("@/components/Elements/DetailCard/DetailCard"),
  { ssr: true }
);
const Pages = dynamic(() => import("@/components/Shared/Pages"));

const SingleCategoriesPage = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}) => {
  const { name } = await params;
  const d = fetchByCategory(decodeURI(name));
  const c = fetchCategoryFromRoute(name);
  const [data, Category] = await Promise.all([d, c]);
  return (
    <div className="mt-4 mb-10">
      <GradBanner main="Filtered by Categories" sub={`${Category}`}>
        {data !== "Invalid Page" ? (
          <div className="flex flex-col justify-center items-center w-full">
            <div className="grid updatedlistgrid gap-4 justify-center w-full">
              {data.booksData.map((book) => {
                return (
                  <DetailCard
                    aspectRatio={Number(book.aspectRatio)}
                    bookUrl={book.bookUrl}
                    chapters={book._count.chapter}
                    imageUrl={book.imageUrl}
                    status={book.status}
                    time={
                      book.chapter.length > 0
                        ? book.chapter[0].addAt
                        : book.updatedAt
                    }
                    title={book.title}
                    key={book.title + book.status}
                    ratings={book.Ratings.toFixed(1)}
                  />
                );
              })}
            </div>
            {data.pages > 1 && (
              <Pages
                url={`/filter/categories/${name}`}
                totalPages={data.pages}
              />
            )}
          </div>
        ) : (
          <div className="flex w-[90%] h-full justify-center items-center">
            {notFound()}
          </div>
        )}
      </GradBanner>
    </div>
  );
};

export default SingleCategoriesPage;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const book = await fetchByCategory(name);
  const books =
    book !== "Invalid Page"
      ? book.booksData.map((bk) => {
          return bk.title;
        })
      : ["By Genre", name];
  const images =
    book !== "Invalid Page"
      ? book.booksData.map((bk) => {
          return bk.imageUrl;
        })
      : [];
  return {
    title: `${name}`,
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
      title: `Books filtered by Category: ${name}`,
      images: [...images], // Must be an absolute URL
    },
  };
}
