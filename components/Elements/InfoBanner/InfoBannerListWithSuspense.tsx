import React, { Suspense } from "react";
import NewInfoBannerList, { newBooksData } from "./InfoBannerList";
import SkeletonInfoBannerList from "./SkeletonInfoBannerList";
import { HOST, RecentsData } from "@/types";

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
  const data = await fetch(`${HOST}/api/page/getRecents`, {
    cache: "only-if-cached",
    mode: "same-origin",
    next: { revalidate: 2, tags: ["RecentsRoute"] },
  }).then(async (res) => {
    const data: RecentsData[] | "Error" = await res.json();
    return data;
  });
  if (data === "Error") {
    return <InfoBannerListLoader />;
  }
  return <NewInfoBannerList data={data} />;
}

export default InfoBannerListWithSuspense;
