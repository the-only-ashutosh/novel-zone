import { newRecents } from "@/service/dataoperation";
import React, { Suspense } from "react";
import NewInfoBannerList, { newBooksData } from "./InfoBannerList";
import SkeletonInfoBannerList from "./SkeletonInfoBannerList";

const InfoBannerListWithSuspense = ({
  data,
}: {
  data?: Array<newBooksData>;
}) => {
  if (data) {
    return <NewInfoBannerList data={data} />;
  }
  return (
    <Suspense fallback={<SkeletonInfoBannerList />}>
      <InfoBannerListLoader />
    </Suspense>
  );
};

async function InfoBannerListLoader() {
  const data = await newRecents();
  return <NewInfoBannerList data={data} />;
}

export default InfoBannerListWithSuspense;
