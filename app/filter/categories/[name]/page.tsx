/* eslint-disable @typescript-eslint/no-unused-vars */
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

const SingleCategoriesPage = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}) => {
  const { name } = await params;
  const c = await fetchCategoryFromRoute(decodeURIComponent(name));
  return (
    <GradBanner main="Filtered by Categories" sub={`${c}`}>
      <Suspense fallback={<DetailsListSkeleton />}>
        <DetailList
          onPage={`categories/${name}`}
          func={(_page: number) => {
            return fetchByCategory(decodeURIComponent(name));
          }}
        />
      </Suspense>
    </GradBanner>
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
