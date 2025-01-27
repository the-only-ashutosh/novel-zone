import {
  fetchByCategory,
  fetchCategoryFromRoute,
} from "@/service/dataoperation";
import React, { Suspense } from "react";
import GradBanner from "@/components/Shared/GradBanner";
import { Metadata } from "next";
import DetailList from "@/components/Elements/DetailCard/DetailList";
import DetailsListSkeleton from "@/components/Elements/DetailCard/DetailsListSkeleton";

export const experimental_ppr = true;

const NumberCategoriesPage = async ({
  params,
}: {
  params: Promise<{ name: string; page: number }>;
}) => {
  const { name, page } = await params;
  const c = await fetchCategoryFromRoute(decodeURI(name));
  return (
    <div className="mt-4 mb-10">
      <GradBanner main="Filtered by Categories" sub={`${c}`}>
        <Suspense fallback={<DetailsListSkeleton />}>
          <DetailList
            onPage={`categories/${name}`}
            func={(page: number) => {
              return fetchByCategory(decodeURI(name), page);
            }}
            params={Promise.resolve({ page })}
          />
        </Suspense>
      </GradBanner>
    </div>
  );
};

export default NumberCategoriesPage;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string; page: number }>;
}): Promise<Metadata> {
  const { name, page } = await params;
  const book = await fetchByCategory(name, page);
  const books =
    book !== "Invalid Page"
      ? book.data.map((bk) => {
          return bk.title;
        })
      : ["By Genre", name];
  const images =
    book !== "Invalid Page"
      ? book.data.map((bk) => {
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
