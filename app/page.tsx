import ScrollProgress from "@/components/Shared/ScrollProgress";
import ViewMoreButton from "@/components/UI/ViewMoreButton";
import type { Metadata } from "next";
import { fetchMostPopular, fetchRecentUpdates } from "@/service/dataoperation";
import InfoListWithSuspense from "@/components/Elements/InfoCard/InfoListWithSuspense";
import { headers } from "next/headers";
import { bookData } from "@/components/Elements/InfoCard/InfoList";
import { booksData } from "@/components/Elements/InfoBanner/InfoBannerList";
import InfoBannerListWithSuspense from "@/components/Elements/InfoBanner/InfoBannerListWithSuspense";

export default async function Home() {
  let data: bookData[] | undefined;
  let chapterData: booksData[] | undefined;
  if ((await headers()).get("accept")?.includes("text/html")) {
    const dat = fetchMostPopular();
    const chapterDat = fetchRecentUpdates();
    [data, chapterData] = await Promise.all([dat, chapterDat]);
  }

  return (
    <>
      <ScrollProgress />
      <div className="mt-8">
        <div className="mx-[5%] mb-5 rounded-md bg-gradient-to-r from-blue-700 via-teal-500 to-green-300 pl-2 pb-1 z-10">
          <div className="px-2 flex justify-between items-center bg-white dark:bg-gray-900 rounded-tr-md rounded-bl-md">
            <div>
              <h3 className="font-semibold main_heading_h3">Most Popular</h3>
              <p className="mb-1 main_heading_p">
                Popular novels selected by readers
              </p>
            </div>
            <ViewMoreButton url="/filter/mostpopular" />
          </div>
        </div>
        <InfoListWithSuspense data={data} />
        <div className="mt-8 mx-[5%] rounded-md bg-gradient-to-r from-blue-700 via-teal-500 to-green-300 pl-2 pb-1">
          <div className="px-2 flex justify-between items-center bg-white dark:bg-gray-900 rounded-tr-md rounded-bl-md">
            <div>
              <h3 className="main_heading_h3 font-semibold">New Updates</h3>
              <p className="mb-1 main_heading_p">Recent Updated Chapters</p>
            </div>
            <ViewMoreButton url="/filter/newupdates" />
          </div>
        </div>
        <InfoBannerListWithSuspense data={chapterData} />
      </div>
    </>
  );
}

export const metadata: Metadata = {
  title: "Home | Read novels for free",
  authors: [{ name: "Ashutosh" }],
};
