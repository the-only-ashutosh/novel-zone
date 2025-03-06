import ViewMoreButton from "@/components/UI/ViewMoreButton";
import React from "react";
import InfoBannerListWithSuspense from "../InfoBanner/InfoBannerListWithSuspense";
import { newBooksData } from "../InfoBanner/InfoBannerList";
import Ranking from "./Ranking";

const RecentAndRanking = async () => {
  let chapterData: newBooksData[] | undefined;
  return (
    <div className="flex flex-col xl:flex-row w-[90vw] mt-8  mx-[5%] xl:justify-between lg:justify-between">
      <div className=" w-[90vw] xl:w-[70vw]">
        <div className="heading_main rounded-md bg-gradient-to-r from-blue-700 via-teal-500 to-green-300 pl-2 pb-1">
          <div className="px-2 flex justify-between items-center bg-white/80 dark:bg-gray-900/80 rounded-tr-md rounded-bl-md">
            <div>
              <h3 className="main_heading_h3 font-semibold">New Updates</h3>
              <p className="mb-1 main_heading_p">Recent Updated Chapters</p>
            </div>
            <ViewMoreButton url="/filter/newupdates" />
          </div>
        </div>
        <InfoBannerListWithSuspense data={chapterData} />
      </div>
      <div className="xl:w-[17.5vw] w-[90vw]">
        <div className="headings rounded-md bg-gradient-to-r from-blue-700 via-teal-500 to-green-300 xl:from-green-300 xl:to-blue-700 sm:pl-2 md:pl-2 pb-1 xl:pr-2 lg:pr-2">
          <div className="px-2 h-14 flex justify-between items-center bg-white/80 dark:bg-gray-900/80 sm:rounded-tr-md sm:rounded-bl-md md:rounded-tr-md md:rounded-bl-md lg:rounded-tl-md lg:rounded-br-md xl:rounded-tl-md xl:rounded-br-md">
            <div>
              <h3 className="main_heading_h3 font-semibold">Novel Rankings</h3>
              <p className="flex mb-1 main_heading_p xl:hidden">
                Ranked by chapters read
              </p>
            </div>
          </div>
        </div>
        <Ranking />
      </div>
    </div>
  );
};

export default RecentAndRanking;
