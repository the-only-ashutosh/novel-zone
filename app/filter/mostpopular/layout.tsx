import Script from "next/script";
import React from "react";

const MostPopularLayout = ({
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
    </div>
  );
};

export default MostPopularLayout;
export const revalidate = 0;
