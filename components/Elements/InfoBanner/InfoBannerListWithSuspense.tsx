import { fetchRecentUpdates } from "@/service/dataoperation";
import React, { Suspense } from "react";
import InfoBannerList, { booksData } from "./InfoBannerList";
import SkeletonInfoBannerList from "./SkeletonInfoBannerList";

const InfoBannerListWithSuspense = ({ data }: { data?: Array<booksData> }) => {
  if (data) {
    return <InfoBannerList data={data} />;
  }
  return (
    <Suspense fallback={<SkeletonInfoBannerList />}>
      <InfoBannerListLoader />
    </Suspense>
  );
};

async function InfoBannerListLoader() {
  const data = await fetchRecentUpdates();
  return <InfoBannerList data={data} />;
}

export default InfoBannerListWithSuspense;
