import React from "react";
import { Skeleton, Card } from "@nextui-org/react";
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
        <div className={`flex flex-col p-2`}>
          <Skeleton>
            <div className="w-[75%] h-6" />
          </Skeleton>
          <Skeleton>
            <div className="w-[45%] h-6" />
          </Skeleton>
        </div>
      </Card>
    </Grid>
  );
};

export default ChapterSkele;
