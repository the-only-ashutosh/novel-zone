import React from "react";
import { Card, CardBody, Chip } from "@heroui/react";
import Image from "next/image";
import { checkNew, getRecentTime } from "@/service/functions";
import {
  ChapterLink,
  ProgressBarLink,
} from "@/components/Shared/Progressbar/progress-bar";
import { MONTHS } from "@/types/consts";
import { RecentsChapter } from "@/types";

const RecentInfo = ({
  img,
  book,
  bookUrl,
  last,
  secondLast,
  updated,
}: Readonly<{
  img: string;
  book: string;
  bookUrl: string;
  last: RecentsChapter;
  secondLast: RecentsChapter;
  updated: Date;
}>) => {
  return (
    <Card className="flex w-full banner bg-primary/10 rounded-sm transition-transform duration-300 hover:transform hover:scale-95 shadow-md">
      <CardBody className="flex flex-row rounded-sm p-0 self-end bg-white/50 backdrop-blur-lg dark:bg-black/40">
        <Image
          src={img}
          alt={book}
          width={Math.ceil(184 * 0.75)}
          height={184}
          style={{
            borderTopLeftRadius: "0.125rem",
            borderBottomLeftRadius: "0.125rem",
            borderBottomRightRadius: "0px",
            borderTopRightRadius: "0px",
          }}
          fetchPriority="low"
          className={`h-[160px] w-[${160 * 0.75}px] xl:w-[${
            184 * 0.75
          }px] xl:h-[184px]`}
        />
        <div className="flex flex-col ml-2 w-full py-2 justify-around rounded-r-sm">
          <ProgressBarLink
            href={`/book/${bookUrl}`}
            color="foreground"
            prefetch={false}
          >
            <h2 className="h-14 sm:h-[50px] line-clamp-2 w-[95%] text-lg sm:text-medium font-semibold">
              {book}
            </h2>
          </ProgressBarLink>
          <div className="flex flex-col py-1 w-[156px]">
            <div className="flex flex-row justify-between items-center mb-1">
              <Chip
                radius="sm"
                variant="solid"
                className="text-white"
                color="primary"
              >
                <ChapterLink
                  href={`/book/${bookUrl}/${last.url}?num=${last.number}`}
                  color="foreground"
                >
                  {`Chapter ${last.number}`}
                </ChapterLink>
              </Chip>
              {checkNew(new Date(last.addAt)) ? (
                <span className="flex justify-center items-center text-[16px] h-[28px] font-semibold w-10 bg-clip-text text-transparent bg-gradient-to-b from-[#FF72E1] to-[#F54C7A]">
                  New
                </span>
              ) : (
                <span className="text-[0.85rem] font-semibold w-12 flex justify-center items-center h-[28px]">{`${new Date(
                  last.addAt
                ).getDate()} ${MONTHS[new Date(last.addAt).getMonth()]}`}</span>
              )}
            </div>
            {secondLast && (
              <div className="flex flex-row justify-between items-center mt-1">
                <Chip
                  radius="sm"
                  variant="solid"
                  className="text-white"
                  color="primary"
                >
                  <ChapterLink
                    href={`/book/${bookUrl}/${secondLast.url}?num=${secondLast.number}`}
                    color="foreground"
                  >
                    {`Chapter ${secondLast.number}`}
                  </ChapterLink>
                </Chip>
                {checkNew(new Date(secondLast.addAt)) ? (
                  <span className="flex justify-center items-center text-[16px] h-[28px] font-semibold w-10 bg-clip-text text-transparent bg-gradient-to-b from-[#FF72E1] to-[#F54C7A]">
                    New
                  </span>
                ) : (
                  <span className="text-[0.85rem] font-semibold w-12 flex justify-center items-center h-[28px]">{`${new Date(
                    secondLast.addAt
                  ).getDate()} ${
                    MONTHS[new Date(secondLast.addAt).getMonth()]
                  }`}</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="vertical-writing flex justify-center rounded-r-sm bg-primary px-[2px] text-xs text-white">
          {getRecentTime(new Date(updated))}
        </div>
      </CardBody>
    </Card>
  );
};

export default RecentInfo;
