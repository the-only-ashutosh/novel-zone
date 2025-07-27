import ChapterContent from "@/components/Elements/Chapter/ChapterContent";
import type { Metadata } from "next";
import React, { cache } from "react";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import { correctString } from "@/service/functions";
import { notFound } from "next/navigation";
import { Typography } from "@mui/material";
import SelectChapterList from "@/components/Elements/Chapter/SelectChapterList";
import { fetchChapter } from "@/service/dataoperation";
import { ProgressBarLink } from "@/components/Shared/Progressbar/progress-bar";
import CosmicChroniclesCard from "@/components/UI/cosmic-chronicles";
import AddView from "@/utils/addView";

type SearchParams = Promise<{ [key: string]: string }>;

const getChapterData = cache(
  async (book: string, chapter: string, num?: number) => {
    return fetchChapter(book, chapter, num);
  }
);
const ChapterPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ chapter: string; book_name: string }>;
  searchParams: SearchParams;
}) => {
  const [{ chapter, book_name }, { viewport, num }] = await Promise.all([
    params,
    searchParams,
  ]);
  let bn = decodeURIComponent(book_name);
  if (bn.endsWith("-novel")) {
    bn = bn.substring(0, bn.length - 6);
  }
  const number = Number(num);
  const c = getChapterData(
    bn,
    decodeURIComponent(chapter),
    isNaN(number) ? undefined : number
  );

  const fst = getCookie("fontStyle", { cookies });
  const fs = getCookie("fontSize", { cookies });
  const [chapterData, fontStyle, fontSize] = await Promise.all([c, fst, fs]);
  if (chapterData === "Invalid Chapter") return notFound();
  if (!chapterData) return notFound();
  const content = correctString(chapterData.content).split("[hereisbreak]");
  const { prevChapter, nextChapter } = chapterData;
  return (
    <div className="flex justify-center flex-col items-center px-[5%] sm:px-[2%] md:px-[3.5%] py-[2%] dark:bg-[#121212]">
      <div className="flex flex-col justify-center items-center mb-6">
        <ProgressBarLink href={`/book/${chapterData.book.bookUrl}`}>
          <h1 className="font-bold text-2xl px-6 pt-6 pb-2 sm:text-xl text-center">
            {chapterData.book.title}
          </h1>
        </ProgressBarLink>
        <CosmicChroniclesCard />
        <AddView />
        <Typography variant="subtitle1" className="text-gray-700">
          {`${new Date(chapterData.addAt).toDateString()}`}
        </Typography>
      </div>
      <SelectChapterList
        book_name={book_name}
        current={Number(chapterData.number)}
        device={viewport}
        next={nextChapter}
        prev={prevChapter}
      />
      <ChapterContent
        content={content}
        title={chapterData.title}
        fStyle={
          fontStyle !== undefined
            ? String(fontStyle).replaceAll(" ", "")
            : "Rubik"
        }
        fSize={fontSize !== undefined ? String(fontSize) : "18"}
      />
      <SelectChapterList
        book_name={book_name}
        current={Number(chapterData.number)}
        device={viewport}
        next={nextChapter}
        prev={prevChapter}
      />
      {viewport === "desktop" && (
        <div className="border-1 border-dotted py-1 px-[6px] rounded-md mt-4 border-primary dark:border-white">
          Note: To change chapter use Z and N or ← and →
        </div>
      )}
    </div>
  );
};

export default ChapterPage;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ chapter: string; book_name: string }>;
  searchParams: SearchParams;
}): Promise<Metadata> {
  const [{ chapter, book_name }, { num }] = await Promise.all([
    params,
    searchParams,
  ]);
  let bn = decodeURIComponent(book_name);
  if (bn.endsWith("-novel")) {
    bn = bn.substring(0, bn.length - 6);
  }
  const number = Number(num);
  const chapterData = await getChapterData(
    bn,
    decodeURIComponent(chapter),
    isNaN(number) ? undefined : number
  );

  if (chapterData && chapterData !== "Invalid Chapter") {
    return {
      title: `Chapter ${chapterData.number}`,
      applicationName: "Novel Zone",
      referrer: "origin-when-cross-origin",
      description: chapterData.content
        .replaceAll("[hereisbreak]", " ")
        .substring(0, 155),
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
