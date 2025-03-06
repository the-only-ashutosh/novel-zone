"use client";
import React from "react";
import RankingSkeleton from "./RankingSkeleton";
import { Tab, Tabs } from "@heroui/react";

const RankingSkeletonGrid = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Tabs
        aria-label="Ranking Tabs"
        variant="light"
        className="mt-4 mb-2"
        color="primary"
        defaultSelectedKey={"weekly"}
      >
        <Tab key="daily" title="Daily" />
        <Tab key="weekly" title="Weekly" />
        <Tab key="monthly" title="Monthly" />
      </Tabs>
      <div className="grid xl:grid-cols-1 grid-col-2 gap-2 mt-4 ml-1 w-full">
        {[...Array(20)].map((_, i) => (
          <RankingSkeleton key={"Skeleton Rank Card No " + i} />
        ))}
      </div>
    </div>
  );
};

export default RankingSkeletonGrid;
