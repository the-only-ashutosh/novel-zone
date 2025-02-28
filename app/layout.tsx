import React from "react";
import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import Appbar from "@/components/Shared/Appbar/Appbar";
import Footer from "./Footer";
import "@/service/fonts";
import { auth } from "@/auth";
import dynamic from "next/dynamic";
import { ProgressBar } from "@/components/Shared/Progressbar/progress-bar";
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
      <body className={`antialiased`}>
        <Providers>
          <ProgressBar className="fixed top-0 h-[2px] bg-primary z-50 rounded-r-lg">
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
      </body>
    </html>
  );
}

export const preferredRegion = "global";
