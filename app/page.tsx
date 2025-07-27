import ScrollProgress from "@/components/Shared/ScrollProgress";
import ViewMoreButton from "@/components/UI/ViewMoreButton";
import type { Metadata } from "next";
import InfoListWithSuspense from "@/components/Elements/InfoCard/InfoListWithSuspense";
import { bookData } from "@/components/Elements/InfoCard/InfoList";
import Script from "next/script";
import RecentAndRanking from "@/components/Elements/Home/RecentAndRanking";
import { KEYWORDS } from "@/types/consts";

export const experimental_ppr = true;
export const dynamic = "force-dynamic";

export default function Home() {
  let data: bookData[] | undefined;

  return (
    <>
      <ScrollProgress />
      {/* <Notice /> */}
      <div className="mt-8">
        <div className="heading_main mx-[5%] mb-5 rounded-md bg-gradient-to-r from-blue-700 via-teal-500 to-green-300 pl-2 pb-1 z-10">
          <div className="px-2 flex justify-between items-center bg-white/80 dark:bg-gray-900/80 rounded-tr-md rounded-bl-md">
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
        <RecentAndRanking />
      </div>
      <Script
        strategy="afterInteractive"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-TESRE0F8SW"
      />
      <Script
        strategy="afterInteractive"
        id="tag-manager"
      >{`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-TESRE0F8SW');`}</Script>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Home | Read novels for free",
    authors: [{ name: "Ashutosh" }],
    keywords: [...KEYWORDS],
    robots: { index: true, follow: true },
  };
}
