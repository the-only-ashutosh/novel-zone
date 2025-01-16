import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./providers";
import "./globals.css";
import Appbar from "@/components/Shared/Appbar/Appbar";
import Footer from "./Footer";
import { headers } from "next/headers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Novel Zone",
    default: "Novel Zone",
  },
  authors: [{ name: "Ashutosh" }],
  description:
    "Your stop to read novels at single stop. Read light novel, web novel, korean novel and chinese novel online for free. You can find hundreds of english translated light novel, web novel, korean novel and chinese novel which are daily updated! Read novels online, read light novel online, read online free, free light novel online. ",
  other: {
    "google-site-verification": "ooyq9xvP1155LRyWJpGkd_BehUDxYoLZkkbdVr--YqY",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const viewport = headersList.get("viewport");
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Appbar viewport={viewport} />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

export const preferredRegion = "global";
