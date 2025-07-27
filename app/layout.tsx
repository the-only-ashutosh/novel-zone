import React from "react";
import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import Appbar from "@/components/Shared/Appbar/Appbar";
import Footer from "./Footer";
import { auth } from "@/auth";
import dynamic from "next/dynamic";
import { ProgressBar } from "@/components/Shared/Progressbar/progress-bar";
import Script from "next/script";
import BackToTop from "@/components/Shared/BackToTop";
const MyAvatar = dynamic(
  () => import("@/components/Shared/Appbar/Avatar/MyAvatar"),
  { ssr: true }
);

export const metadata: Metadata = {
  title: {
    template: "%s | Novel Zone",
    default: "Novel Zone",
  },
  authors: [{ name: "Ashutosh" }],
  description:
    "Your stop to read novels at single stop. Read light novel, web novel, korean novel and chinese novel online for free. You can find hundreds of english translated light novel, web novel, korean novel and chinese novel which are daily updated",
  other: {
    "google-site-verification": "ooyq9xvP1155LRyWJpGkd_BehUDxYoLZkkbdVr--YqY",
  },
  robots: {
    index: true,
    googleBot: {
      index: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = React.use(auth());
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="YanAd">{`window.yaContextCb=window.yaContextCb||[]`}</Script>
        <Script
          src="https://yandex.ru/ads/system/context.js"
          async
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <Script strategy="afterInteractive" id="YadTag" type="text/javascript">
          {`(function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=103493404', 'ym');

    ym(103493404, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});`}
        </Script>
      </head>
      <body className={`antialiased relative`}>
        <div
          style={{
            backgroundImage: `url(${process.env.HOST}/bg.webp)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            opacity: 0.3,
            zIndex: -100,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            width: "100vw",
            height: "100vh",
          }}
        />
        <Providers>
          <ProgressBar className="fixed top-0 h-1 bg-primary z-50 rounded-r-lg">
            <Appbar
              ava={
                <MyAvatar
                  session={
                    session
                      ? {
                          name: session.user!.name!,
                          image: session.user!.image!,
                          email: session.user!.email!,
                        }
                      : null
                  }
                />
              }
            />
            {children}
            <Footer />
          </ProgressBar>
        </Providers>
        <BackToTop />
      </body>
    </html>
  );
}

export const preferredRegion = "global";
