/* eslint-disable @typescript-eslint/no-unused-vars */
import DetailList from "@/components/Elements/DetailCard/DetailList";
import DetailsListSkeleton from "@/components/Elements/DetailCard/DetailsListSkeleton";
import GradBanner from "@/components/Shared/GradBanner";
import { fetchByAuthor } from "@/service/dataoperation";
import React, { Suspense } from "react";

const AuthorPage = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}) => {
  const { name } = await params;

  return (
    <div className="flex mt-4 mb-10 w-full">
      <GradBanner main="Author" sub={`Books by ${decodeURI(name)}`}>
        <Suspense fallback={<DetailsListSkeleton />}>
          <DetailList
            func={(page: number) => {
              return fetchByAuthor(name);
            }}
            onPage={`author/${decodeURI(name)}`}
          />
        </Suspense>
      </GradBanner>
    </div>
  );
};

export default AuthorPage;
