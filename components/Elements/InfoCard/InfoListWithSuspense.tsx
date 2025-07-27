import React, { Suspense } from "react";
import InfoList, { bookData } from "./InfoList";
import SkeletonInfoList from "./SkeletonInfoList";
import { HOST, PopularData } from "@/types";

const InfoListWithSuspense = ({ data }: { data?: Array<bookData> }) => {
  if (data) {
    return <InfoList data={data} cls="mx-[5%] " r={true} />;
  }
  return (
    <Suspense fallback={<SkeletonInfoList />}>
      <InfoListLoader />
    </Suspense>
  );
};

async function InfoListLoader() {
  const data = await fetch(`${HOST}/api/page/getMostPopular`, {
    cache: "force-cache",
    next: { revalidate: 3600 * 2, tags: ["MostPopularRoute"] },
  }).then(async (res) => {
    const dta: PopularData[] | "Error" = await res.json();
    return dta;
  });
  if (data === "Error") {
    return <SkeletonInfoList />;
  }
  return <InfoList data={data} cls="mx-[5%] " r={true} />;
}

export default InfoListWithSuspense;
