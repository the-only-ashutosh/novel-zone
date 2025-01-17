import React from "react";
import { Skeleton, Card, CardBody } from "@heroui/react";

const SkeletonInfoBanner = () => {
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 rounded-sm"
    >
      <CardBody className="flex flex-row rounded-sm h-full p-0">
        <Skeleton className="rounded-l-sm rounded-r-none">
          <div className="w-[80px] h-[104px]" />
        </Skeleton>
        <div className="flex flex-col items-start ml-8 justify-between margin-y">
          <Skeleton className="rounded-lg mt-[2px] mb-[1px]">
            <div className="h-[20px] w-[207px]" />
          </Skeleton>
          <Skeleton className="rounded-lg mt-[1px] mb-[2px] bannerskelebig">
            <div className="h-[20px] w-[290px]" />
          </Skeleton>
          <div className="flex flex-col bannerskelesmall">
            <Skeleton className="rounded-lg mt-[1px] mb-[1px]">
              <div className="h-[20px] w-[159px]" />
            </Skeleton>
            <Skeleton className="rounded-lg mt-[1px] mb-[2px]">
              <div className="h-[20px] w-[159px]" />
            </Skeleton>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default SkeletonInfoBanner;
