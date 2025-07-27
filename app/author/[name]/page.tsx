/* eslint-disable @typescript-eslint/no-unused-vars */
import DetailList from "@/components/Elements/DetailCard/DetailList";
import DetailsListSkeleton from "@/components/Elements/DetailCard/DetailsListSkeleton";
import GradBanner from "@/components/Shared/GradBanner";
import { fetchByAuthor } from "@/service/dataoperation";
import Script from "next/script";
import React, { Suspense } from "react";

const AuthorPage = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}) => {
  const { name } = await params;

  return (
    <div className="flex mt-4 mb-10 w-full">
      <GradBanner main="Author" sub={`Books by ${decodeURI(name)}`}>
        <Suspense fallback={<DetailsListSkeleton />}>
          <DetailList
            func={(page: number) => {
              return fetchByAuthor(name);
            }}
            onPage={`author/${decodeURI(name)}`}
          />
        </Suspense>
      </GradBanner>
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
      <Script strategy="afterInteractive" id="YadTag" type="text/javascript">
        {`(function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=103493404', 'ym');

    ym(103493404, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});`}
      </Script>
    </div>
  );
};

export default AuthorPage;
