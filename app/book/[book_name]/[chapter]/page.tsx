import ChangeChapters from "@/components/Elements/Chapter/ChangeChapters";
import ChapterContent from "@/components/Elements/Chapter/ChapterContent";
import { fetchChapter } from "@/service/dataoperation";
import Link from "next/link";
import type { Metadata } from "next";
import React from "react";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import { correctString } from "@/service/functions";

/*
 * @param {Object} props - The component props.//+
 * @param {Object} props.params - The route parameters.//+
 * @param {string} props.params.chapter - The chapter identifier or name.//+
 * @returns {Promise<JSX.Element>} A Promise that resolves to a React element displaying the chapter content.//+
 */
type SearchParams = Promise<{ [key: string]: string }>;

const ChapterPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ chapter: string; book_name: string }>;
  searchParams: SearchParams;
}) => {
  const { chapter, book_name } = await params;
  const chapterData = await fetchChapter(
    book_name,
    chapter.replaceAll(`%E2%80%93`, "–")
  );
  // await addChapterView(chapter, book_name);
  const { viewport } = await searchParams;
  const fontStyle = await getCookie("fontStyle", { cookies });
  const fontSize = await getCookie("fontSize", { cookies });
  const content = correctString(chapterData!.content).split("[hereisbreak]");

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="flex flex-col justify-center items-center mb-6">
        <Link href={`/book/${chapterData!.book.bookUrl}`}>
          <h1 className="font-bold text-2xl">{chapterData!.book.title}</h1>
        </Link>
        {/* <Typography variant="subtitle1" className="text-sm text-gray-700">
          {chapterData!.addAt.toDateString()}
        </Typography> */}
      </div>
      <ChangeChapters
        book_name={book_name}
        prevUrl={chapterData!.prevChapter!}
        nextUrl={chapterData!.nextChapter!}
        currentCh={Number(chapterData!.number)}
        device={viewport}
      />
      <ChapterContent
        content={content}
        title={chapterData!.title}
        fStyle={fontStyle !== undefined ? String(fontStyle) : "Rubik"}
        fSize={fontSize !== undefined ? String(fontSize) : "18"}
      />
      <ChangeChapters
        book_name={book_name}
        prevUrl={chapterData!.prevChapter!}
        nextUrl={chapterData!.nextChapter!}
        currentCh={Number(chapterData!.number)}
        device={viewport}
      />
      {viewport === "desktop" && (
        <div className="border-1 border-dotted py-1 px-[6px] rounded-md mt-4 border-primary dark:border-white">
          Note: To change chapters use Z and N or ← and →
        </div>
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
  const chapterData = await fetchChapter(book_name, chapter);

  return {
    title: `${chapterData!.title} | ${chapterData!.book!.title}`,
    applicationName: chapterData!.title,
    referrer: "origin-when-cross-origin",
    keywords: [
      "Novel",
      "Novel Zone",
      "Novelbin",
      "lightnovel",
      "webnovel",
      chapterData!.title,
      chapterData!.book!.title,
      `This chapter belongs to ${chapterData!.book!.title} novel.`,
      `${chapterData!.book!.title} chapter ${chapterData!.number}.`,
      `${chapterData!.book!.title} book.`,
      `${chapterData!.book!.title} new chapters.`,
      `${chapterData!.book!.title} latest chapters.`,
      `${chapterData!.book!.title} all chapters.`,
      `Novel ${chapterData!.book!.title}`,
      `Novelbin ${chapterData!.book!.title}`,
      `Novel Zone ${chapterData!.book!.title}`,
      `Lightnovel ${chapterData!.book!.title}. ${chapterData!.book!.title}`,
    ],
    twitter: {
      card: "summary_large_image",
      title: chapterData!.title,
      description: `This chapter belongs to ${
        chapterData!.book!.title
      } novel. ${chapterData!.book!.title} chapter ${chapterData!.number}. ${
        chapterData!.book!.title
      } book. ${chapterData!.book!.title} new chapters. ${
        chapterData!.book!.title
      } latest chapters. ${chapterData!.book!.title} all chapters. Novel ${
        chapterData!.book!.title
      }. Novelbin ${chapterData!.book!.title}. Novel Zone ${
        chapterData!.book!.title
      }. Lightnovel ${chapterData!.book!.title}. ${chapterData!.book!.title}`,
    },
  };
}
