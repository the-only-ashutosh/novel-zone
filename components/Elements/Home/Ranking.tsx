import React, { Suspense } from "react";
import RankingSection from "./RankingSection";
import RankingSkeletonGrid from "./RankingSkeletonGrid";
import { CommonData, HOST } from "@/types";
async function getRanking() {
  return fetch(`${HOST}/api/page/getRanking`, {
    cache: "force-cache",
    next: { revalidate: 3600 * 2, tags: ["RankingRoute"] },
  }).then(async (res) => {
    const data: CommonData = await res.json();
    return data;
  });
}

export default async function Ranking() {
  const data = await getRanking();
  if (data === "Error") {
    return <RankingSkeletonGrid />;
  }
  return (
    <Suspense fallback={<RankingSkeletonGrid />}>
      <RankingSection rankings={data} />
    </Suspense>
  );
}
