import React from "react";
import { Skeleton } from "@heroui/react";
import Grid from "@mui/material/Grid";

export const InfoSkele = () => {
  return (
    <Grid
      className="justify-center flex items-center flex-col"
      size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
    >
      <Skeleton className="rounded-md">
        <div className="w-[160px] h-[210px]" />
      </Skeleton>
      <div className="flex flex-col w-[160px] text-sm px-[2px]">
        <Skeleton className="rounded-md mb-px mt-[4px]">
          <div className="h-[18px] w-[156px]" />
        </Skeleton>
        <Skeleton className="rounded-md my-px">
          <div className="h-[18px] w-[156px]" />
        </Skeleton>
        <Skeleton className="rounded-md mt-px">
          <div className="h-[18px] w-[156px]" />
        </Skeleton>
      </div>
    </Grid>
  );
};

export default InfoSkele;
