import Script from "next/script";
import React from "react";

const NewUpdatesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="py-4">
      {children}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-TESRE0F8SW"
      />
      <Script id="tag-manager">{`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-TESRE0F8SW');`}</Script>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1624293945329553"
        crossOrigin="anonymous"
      />
    </div>
  );
};

export default NewUpdatesLayout;

export const revalidate = 0;
