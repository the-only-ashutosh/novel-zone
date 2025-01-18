import { Card, CardBody, Skeleton } from "@heroui/react";
import React from "react";

const DetailSkeleton = () => (
  <Card className="flex flex-row border-none bg-background/60 dark:bg-default-100/50 rounded-md w-full">
    <CardBody className="flex flex-row h-full p-0">
      <Skeleton
        style={{
          borderTopLeftRadius: "0.375rem",
          borderBottomLeftRadius: "0.375rem",
          borderBottomRightRadius: "0px",
          borderTopRightRadius: "0px",
        }}
      >
        <div style={{ height: "176px", width: `${Math.ceil(176 * 0.75)}px` }} />
      </Skeleton>
      <div className="flex flex-col ml-4 sm:ml-3 mt-4 sm:pr-1">
        <Skeleton className="rounded-xl w-fit">
          <div className="h-9 sm:w-[232px] w-[300px] lg:w-[420px]" />
        </Skeleton>
        <div className="flex flex-col mt-5">
          <Skeleton className="rounded-xl mb-1 w-fit">
            <div className="h-6 w-[155px]" />
          </Skeleton>
          <Skeleton className="rounded-xl mb-1 w-fit">
            <div className="h-6 w-[155px]" />
          </Skeleton>
          <Skeleton className="rounded-xl mb-1 w-fit">
            <div className="h-6 w-[155px]" />
          </Skeleton>
        </div>
      </div>
    </CardBody>
  </Card>
);

const DetailsListSkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="grid updatedlistgrid gap-4 justify-center w-full">
        <DetailSkeleton />
        <DetailSkeleton />
        <DetailSkeleton />
        <DetailSkeleton />
        <DetailSkeleton />
        <DetailSkeleton />
        <DetailSkeleton />
        <DetailSkeleton />
        <DetailSkeleton />
        <DetailSkeleton />
        <DetailSkeleton />
        <DetailSkeleton />
        <DetailSkeleton />
        <DetailSkeleton />
        <DetailSkeleton />
        <DetailSkeleton />
        <DetailSkeleton />
        <DetailSkeleton />
        <DetailSkeleton />
        <DetailSkeleton />
      </div>
    </div>
  );
};

export default DetailsListSkeleton;
