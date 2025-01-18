import React, { Suspense } from "react";
import InfoList, { bookData } from "./InfoList";
import { fetchMostPopular } from "@/service/dataoperation";
import SkeletonInfoList from "./SkeletonInfoList";

const InfoListWithSuspense = ({ data }: { data?: Array<bookData> }) => {
  if (data) {
    return <InfoList data={data} cls="mx-[5%] " />;
  }
  return (
    <Suspense fallback={<SkeletonInfoList />}>
      <InfoListLoader />
    </Suspense>
  );
};

async function InfoListLoader() {
  const data = await fetchMostPopular();

  return <InfoList data={data} cls="mx-[5%] " />;
}

export default InfoListWithSuspense;
