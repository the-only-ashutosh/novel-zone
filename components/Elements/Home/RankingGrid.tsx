import React from "react";
import RankingCard from "./RankingCard";
import { RankingData } from "@/types";

const RankingGrid = ({ data }: { data: RankingData[] }) => {
  return (
    <div className="grid xl:grid-cols-1 sm:grid-cols-1 grid-cols-2 gap-2 mt-4 ml-1">
      {data.map((e, _) => {
        return <RankingCard data={e} key={"This is rank Card No " + _} />;
      })}
    </div>
  );
};

export default RankingGrid;
