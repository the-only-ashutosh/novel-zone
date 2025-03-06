import React from "react";
import { Skeleton, Card, CardBody } from "@heroui/react";

const SkeletonInfoBanner = () => {
  return (
    <Card
      isBlurred
      className="flex w-full banner bg-primary/10 rounded-sm shadow-md"
    >
      <CardBody className="flex flex-row rounded-sm h-full p-0">
        <Skeleton className="rounded-l-sm min-w-fit">
          <div className={`w-[138px] h-[184px]`} />
        </Skeleton>
        <div className="flex flex-col ml-2 w-full py-2 justify-around rounded-r-sm">
          <div>
            <Skeleton className="rounded-sm w-[95%]">
              <div className="h-7 w-full" />
            </Skeleton>
            <Skeleton className="rounded-sm w-[95%] mt-2">
              <div className="h-7 w-full" />
            </Skeleton>
          </div>
          <div className="flex flex-col py-1 w-[152px]">
            <Skeleton className="rounded-sm mt-[1px] mb-1">
              <div className="h-7 w-[144px]" />
            </Skeleton>
            <Skeleton className="rounded-sm mt-1">
              <div className="h-7 w-[144px]" />
            </Skeleton>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default SkeletonInfoBanner;
