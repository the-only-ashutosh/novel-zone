import React from "react";
import SkeletonInfoBanner from "./SkeletonInfoBanner";

const SkeletonInfoBannerList = () => {
  return (
    <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 mt-6 mb-10 mx-1">
      {[...Array(20)].map((e, _) => (
        <SkeletonInfoBanner key={"Infos" + _} />
      ))}
    </div>
  );
};

export default SkeletonInfoBannerList;
