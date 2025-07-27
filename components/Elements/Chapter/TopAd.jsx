"use client";
import React, { useEffect } from "react";

const ids = ["R-A-14241249-1","R-A-14241249-2"]

const TopAd = (props) => {
  useEffect(() => {
    window.yaContextCb.push(() => {
      Ya.Context.AdvManager.render({
        blockId: ids[Math.floor(Math.random() * 2)],
        renderTo: "ad-1",
      });
    });
  }, []);
  return (
    <>
      <div id="ad-1" />
      {props.para}
    </>
  );
};

export default TopAd;
