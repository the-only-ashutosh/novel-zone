import { getRankingDetails } from "@/service/dataoperation";
import React, { Suspense } from "react";
import RankingSection from "./RankingSection";
import RankingSkeletonGrid from "./RankingSkeletonGrid";

export default async function Ranking() {
  const data = await getRankingDetails();
  return (
    <Suspense fallback={<RankingSkeletonGrid />}>
      <RankingSection rankings={data} />
    </Suspense>
  );
}
