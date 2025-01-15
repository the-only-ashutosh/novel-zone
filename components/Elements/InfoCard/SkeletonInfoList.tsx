import React from "react";
import Grid from "@mui/material/Grid2";
import InfoSkele from "./SkeletonInfoCard";

const SkeletonInfoList = () => {
  return (
    <Grid className="mx-[5%] grid justify-center gap-4 maingrid">
      <InfoSkele />
      <InfoSkele />
      <InfoSkele />
      <InfoSkele />
      <InfoSkele />
      <InfoSkele />
      <InfoSkele />
      <InfoSkele />
      <InfoSkele />
      <InfoSkele />
      <InfoSkele />
      <InfoSkele />
    </Grid>
  );
};

export default SkeletonInfoList;
