"use client";
import React, { useState } from "react";
import { Tabs, Tab } from "@heroui/react";
import RankingGrid from "./RankingGrid";
import { CommonData } from "@/types";
import RankingSkeletonGrid from "./RankingSkeletonGrid";

const RankingSection = ({ rankings }: { rankings: CommonData }) => {
  const [selected, setSelected] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );
  if (rankings === "Error") return <RankingSkeletonGrid />;
  return (
    <div className="w-full flex flex-col items-center">
      <Tabs
        aria-label="Ranking Tabs"
        variant="light"
        className="mt-4 mb-2 w-full"
        color="primary"
        selectedKey={selected}
        classNames={{ tabList: "w-full" }}
        onSelectionChange={(k) => {
          if (k.toString() === "daily") {
            setSelected("daily");
          } else if (k.toString() === "weekly") {
            setSelected("weekly");
          } else {
            setSelected("monthly");
          }
        }}
      >
        <Tab key="daily" title="Daily" className="w-full xl:text-sm" />
        <Tab key="weekly" title="Weekly" className="w-full xl:text-sm" />
        <Tab key="monthly" title="Monthly" className="w-full xl:text-sm" />
      </Tabs>
      <RankingGrid data={rankings[selected]} />
    </div>
  );
};

export default RankingSection;
