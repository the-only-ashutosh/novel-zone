import { Card, CardBody, Skeleton } from "@heroui/react";
import React from "react";

const NewSkeleton = () => (
  <Card className="w-full my-2 rounded-sm">
    <CardBody className="flex flex-row p-0">
      <Skeleton className="rounded-sm">
        <div className={`h-[108px] w-[${108 * 0.75}px]`} />
      </Skeleton>
      <div className="flex flex-row justify-between w-full m-2">
        <div className="w-[65%] flex flex-col justify-around">
          <Skeleton className="rounded-sxl w-fit">
            <div className="h-[24px] sm:w-[150px] md:w-[338px] w-[520px]" />
          </Skeleton>
          <div className={`mt-auto flex flex-col`}>
            <Skeleton className="rounded-xl my-1 w-fit">
              <div className="h-[22px] w-[156px] sm:w-[100px]" />
            </Skeleton>
            <Skeleton className="rounded-xl my-1 w-fit">
              <div className="h-[22px] w-[156px] sm:w-[100px]" />
            </Skeleton>
          </div>
        </div>
        <div className="w-[25%]">
          <Skeleton className="rounded-xl my-1 w-fit">
            <div className="h-[22px] sm:w-[56px] md:w-[92px] lg:w-[128px] xl:w-[200px]" />
          </Skeleton>
          <Skeleton className="rounded-xl my-1 w-fit">
            <div className="h-[22px] sm:w-[56px] md:w-[92px] lg:w-[128px] xl:w-[200px]" />
          </Skeleton>
          <Skeleton className="rounded-xl my-1 w-fit">
            <div className="h-[22px] sm:w-[56px] md:w-[92px] lg:w-[128px] xl:w-[200px]" />
          </Skeleton>
        </div>
      </div>
    </CardBody>
  </Card>
);
const NewUpdatesSkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <NewSkeleton />
      <NewSkeleton />
      <NewSkeleton />
      <NewSkeleton />
      <NewSkeleton />
      <NewSkeleton />
      <NewSkeleton />
      <NewSkeleton />
      <NewSkeleton />
      <NewSkeleton />
      <NewSkeleton />
      <NewSkeleton />
      <NewSkeleton />
      <NewSkeleton />
      <NewSkeleton />
      <NewSkeleton />
      <NewSkeleton />
      <NewSkeleton />
      <NewSkeleton />
      <NewSkeleton />
    </div>
  );
};

export default NewUpdatesSkeleton;
