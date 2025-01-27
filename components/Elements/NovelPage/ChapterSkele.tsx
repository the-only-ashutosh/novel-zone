import React from "react";
import { Skeleton, Card } from "@heroui/react";
import Grid from "@mui/material/Grid2";

const ChapterSkele = () => {
  return (
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
      <Card className={`flex flex-row pr-2 rounded-sm`}>
        <div className="flex justify-center items-center min-w-20 border-small rounded-l-sm border-gray-800 dark:border-white">
          <Skeleton className="rounded-sm">
            <div className="h-6 w-6"></div>
          </Skeleton>
        </div>
        <div className={`flex flex-col p-2 w-full`}>
          <Skeleton className="rounded-sm w-[75%] mb-1">
            <div className="w-[75%] h-5" />
          </Skeleton>
          <Skeleton className="rounded-sm w-[45%] mt-1">
            <div className="w-[45%] h-5" />
          </Skeleton>
        </div>
      </Card>
    </Grid>
  );
};

export default ChapterSkele;
