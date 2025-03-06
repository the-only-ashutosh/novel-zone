import { Skeleton } from "@heroui/react";
import React from "react";

const RankingSkeleton = () => {
  return (
    <div className="w-full flex-row flex banner">
      <Skeleton className={`min-w-[${96 * 0.75}px] h-24 rounded-l-sm`}>
        <div className={`min-w-[${96 * 0.75}px] h-24`} />
      </Skeleton>
      <div className="flex flex-col mx-1 justify-around w-full">
        <Skeleton className="rounded-sm h-6 w-full">
          <div className="h-6" />
        </Skeleton>
        <Skeleton className="rounded-sm h-4 max-w-14">
          <div className="h-4 max-w-14" />
        </Skeleton>
      </div>
    </div>
  );
};

export default RankingSkeleton;
