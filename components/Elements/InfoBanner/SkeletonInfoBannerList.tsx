import React, { ReactElement } from "react";
import SkeletonInfoBanner from "./SkeletonInfoBanner";

const Infos: Array<ReactElement> = [];

for (let i = 0; i < 10; i++) {
  Infos.push(<SkeletonInfoBanner key={"Infos" + i} />);
}

const SkeletonInfoBannerList = () => {
  return (
    <div className="grid updatedlistgrid gap-4 mt-8 mx-[5%] justify-center mb-10">
      {Infos}
    </div>
  );
};

export default SkeletonInfoBannerList;
