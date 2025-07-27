import CosmicChroniclesCard from "@/components/UI/cosmic-chronicles";
import Script from "next/script";
import React from "react";

const CategoriesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="py-4">
      {children}
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
      <CosmicChroniclesCard />
      <Script
        strategy="afterInteractive"
        id="YadTagCategory"
        type="text/javascript"
      >
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

export default CategoriesLayout;

export const revalidate = 0;
