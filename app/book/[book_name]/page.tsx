import React from "react";
import dynamic from "next/dynamic";
import { addView, fetchBookDetails } from "@/service/dataoperation";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import { Typography } from "@mui/material";
import Link from "next/link";
import type { Metadata } from "next";
import { getTimeDiff } from "@/service/functions";
import { notFound } from "next/navigation";
const ChaptersCard = dynamic(
  () => import("@/components/Elements/NovelPage/ChaptersCard")
);
const InfoCard = dynamic(
  () => import("@/components/Elements/NovelPage/InfoCard"),
  { ssr: true }
);
const SmallInfoCard = dynamic(
  () => import("@/components/Elements/NovelPage/SmallInfoCard"),
  { ssr: true }
);

type SearchParams = Promise<{ [key: string]: string }>;

const BookPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ book_name: string }>;
  searchParams: SearchParams;
}) => {
  const { book_name } = await params;
  const v = searchParams;
  const b = fetchBookDetails(book_name);
  const [bookDetail, { viewport }] = await Promise.all([
    b,
    v,
    addView(book_name),
  ]);
  return (
    <div className="flex items-center flex-col py-[2.5%]">
      {bookDetail !== "Invalid Book" ? (
        <>
          {viewport === "desktop" && (
            <InfoCard
              author={bookDetail!.author.name}
              genres={bookDetail!.genre}
              status={bookDetail!.status}
              title={bookDetail!.title}
              url={bookDetail!.imageUrl}
              tags={bookDetail!.category}
              aspectRatio={Number(bookDetail!.aspectRatio)}
              views={bookDetail!.views}
              ratings={Number(bookDetail!.Ratings)}
              chOne={
                bookDetail!.chapter.length > 0
                  ? `/book/${bookDetail!.bookUrl}/${
                      bookDetail!.chapter.filter((x) => x.number === 1)[0].url
                    }`
                  : "disabled"
              }
            />
          )}
          {viewport === "mobile" && (
            <SmallInfoCard
              author={bookDetail!.author.name}
              genres={bookDetail!.genre}
              status={bookDetail!.status}
              title={bookDetail!.title}
              imgUrl={bookDetail!.imageUrl}
              views={bookDetail!.views}
              tags={bookDetail!.category}
              ratings={Number(bookDetail!.Ratings)}
              aspectRatio={Number(bookDetail!.aspectRatio)}
              chOne={
                bookDetail!.chapter.length > 0
                  ? `/book/${bookDetail!.bookUrl}/${
                      bookDetail!.chapter.filter((x) => x.number === 1)[0].url
                    }`
                  : "disabled"
              }
            />
          )}
          <div className="flex flex-row w-[90vw] colrow px-2 sm:px-1 border-t-1 border-b-1 border-dashed py-3 mt-4">
            <div className="flex font-bold text-medium">
              <AutoStoriesRoundedIcon />
              &nbsp; Latest Chapter
            </div>
            <div className="flex colrow justify-between w-[65%] lg:w-[73%] xl:w-[80%] sm:w-full smallmargin">
              <Link
                href={
                  bookDetail!.chapter.length > 1
                    ? `/book/${bookDetail!.bookUrl}/${
                        bookDetail!.chapter.filter((x) => x.number !== 1)[0].url
                      }`
                    : "#"
                }
              >
                <Typography className="text-primary">
                  {bookDetail!.chapter.length > 1
                    ? bookDetail!.chapter.filter((x) => x.number !== 1)[0].title
                    : `Book is updating...`}
                </Typography>
              </Link>
              <Typography>
                {bookDetail!.chapter.length > 1
                  ? getTimeDiff(
                      bookDetail!.chapter.filter((x) => x.number !== 1)[0].addAt
                    )
                  : `Some days`}
                &nbsp;ago
              </Typography>
            </div>
          </div>
          <ChaptersCard
            book={bookDetail!.id}
            chapters={bookDetail!._count.chapter}
            description={String.fromCharCode(...bookDetail!.description)}
          />
        </>
      ) : (
        <div className="w-ful h-full flex justify-center items-center">
          {notFound()}
        </div>
      )}
    </div>
  );
};

export default BookPage;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ book_name: string }>;
}): Promise<Metadata> {
  const { book_name } = await params;
  const book = await fetchBookDetails(book_name);

  if (book !== "Invalid Book") {
    return {
      title: book!.title,
      referrer: "origin-when-cross-origin",
      keywords: [
        "Novel",
        "Novel Zone",
        "Novelbin",
        "lightnovel",
        "webnovel",
        book!.title,
        ...book!.genre.map((e) => e.name),
        //...book!.Tags.split(", "),
      ],
      twitter: {
        card: "summary_large_image",
        title: book!.title,
        description: String.fromCharCode(...book!.description),
        images: [book!.imageUrl], // Must be an absolute URL
      },
    };
  }
  return {
    title: "Books",
    referrer: "origin-when-cross-origin",
    keywords: ["Novel", "Novel Zone", "Novelbin", "lightnovel", "webnovel"],
  };
}
