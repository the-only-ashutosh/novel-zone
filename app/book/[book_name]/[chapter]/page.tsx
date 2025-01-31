import ChangeChapters from "@/components/Elements/Chapter/ChangeChapters";
import ChapterContent from "@/components/Elements/Chapter/ChapterContent";
import { addChapterView, fetchChapter } from "@/service/dataoperation";
import Link from "next/link";
import type { Metadata } from "next";
import React from "react";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import { correctString } from "@/service/functions";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Typography } from "@mui/material";

type SearchParams = Promise<{ [key: string]: string }>;

const ChapterPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ chapter: string; book_name: string }>;
  searchParams: SearchParams;
}) => {
  const { chapter, book_name } = await params;
  const c = fetchChapter(
    decodeURIComponent(book_name),
    decodeURIComponent(chapter)
  );
  const v = searchParams;
  const fst = getCookie("fontStyle", { cookies });
  const fs = getCookie("fontSize", { cookies });
  const [chapterData, { viewport }, fontStyle, fontSize] = await Promise.all([
    c,
    v,
    fst,
    fs,
    addChapterView(decodeURIComponent(chapter), decodeURIComponent(book_name)),
  ]);
  const content =
    chapterData && chapterData !== "Invalid Chapter"
      ? correctString(chapterData.content).split("[hereisbreak]")
      : [""];

  return (
    <div className="flex justify-center flex-col items-center px-[2.5%] py-[2%] dark:bg-[#121212]">
      {chapterData && chapterData !== "Invalid Chapter" ? (
        <>
          <div className="flex flex-col justify-center items-center mb-6">
            <Link href={`/book/${chapterData.book.bookUrl}`}>
              <h1 className="font-bold text-2xl">{chapterData.book.title}</h1>
            </Link>
            <Typography variant="subtitle1" className="text-gray-700">
              {chapterData.addAt.toDateString()}
            </Typography>
          </div>
          <ChangeChapters
            book_name={book_name}
            prevUrl={chapterData.prevChapter!}
            nextUrl={chapterData.nextChapter!}
            currentCh={Number(chapterData.number)}
            device={viewport}
          />
          <ChapterContent
            content={content}
            title={chapterData.title}
            fStyle={fontStyle !== undefined ? String(fontStyle) : "Rubik"}
            fSize={fontSize !== undefined ? String(fontSize) : "18"}
          />
          <ChangeChapters
            book_name={book_name}
            prevUrl={chapterData.prevChapter!}
            nextUrl={chapterData.nextChapter!}
            currentCh={Number(chapterData.number)}
            device={viewport}
          />
          {viewport === "desktop" && (
            <div className="border-1 border-dotted py-1 px-[6px] rounded-md mt-4 border-primary dark:border-white">
              Note: To change chapters use Z and N or ← and →
            </div>
          )}
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
        </>
      ) : (
        notFound()
      )}
    </div>
  );
};

export default ChapterPage;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapter: string; book_name: string }>;
}): Promise<Metadata> {
  const { chapter, book_name } = await params;
  const chapterData = await fetchChapter(book_name, decodeURI(chapter));

  if (chapterData && chapterData !== "Invalid Chapter") {
    return {
      title: `${chapterData.title} | ${chapterData.book.title}`,
      applicationName: chapterData.title,
      referrer: "origin-when-cross-origin",
      description: chapterData.content.replaceAll("[hereisbreak]", " "),
      keywords: [
        "Novel",
        "Novel Zone",
        "Novelbin",
        "lightnovel",
        "webnovel",
        chapterData.title,
        chapterData.book.title,
        `This chapter belongs to ${chapterData.book.title} novel.`,
        `${chapterData.book.title} chapter ${chapterData.number}.`,
        `${chapterData.book.title} book.`,
        `${chapterData.book.title} new chapters.`,
        `${chapterData.book.title} latest chapters.`,
        `${chapterData.book.title} all chapters.`,
        `Novel ${chapterData.book.title}`,
        `Novelbin ${chapterData.book.title}`,
        `Novel Zone ${chapterData.book.title}`,
        `Lightnovel ${chapterData.book.title}. ${chapterData.book.title}`,
      ],
      twitter: {
        card: "summary_large_image",
        title: chapterData.title,
        description: `This chapter belongs to ${chapterData.book.title} novel. ${chapterData.book.title} chapter ${chapterData.number}. ${chapterData.book.title} book. ${chapterData.book.title} new chapters. ${chapterData.book.title} latest chapters. ${chapterData.book.title} all chapters. Novel ${chapterData.book.title}. Novelbin ${chapterData.book.title}. Novel Zone ${chapterData.book.title}. Lightnovel ${chapterData.book.title}. ${chapterData.book.title}`,
      },
    };
  } else {
    return {
      title: `Novel Zone`,
      applicationName: "Novel Zone",
      referrer: "origin-when-cross-origin",
      keywords: ["Novel", "Novel Zone", "Novelbin", "lightnovel", "webnovel"],
      twitter: {
        card: "summary_large_image",
        title: "Novel Zone",
      },
    };
  }
}
