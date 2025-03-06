import React from "react";
import { Card, CardBody, Chip } from "@heroui/react";
import Image from "next/image";
import { checkNew } from "@/service/functions";
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
}: Readonly<{
  img: string;
  book: string;
  bookUrl: string;
  last: RecentsChapter;
  secondLast: RecentsChapter;
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
            minHeight: `184px`,
            maxHeight: `184px`,
            minWidth: `${184 * 0.75}px`,
            maxWidth: `${184 * 0.75}px`,
          }}
          loading="lazy"
          fetchPriority="low"
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
          <div className="flex flex-col py-1 w-[152px]">
            <div className="flex flex-row justify-between items-center mb-1">
              <Chip
                radius="sm"
                variant="solid"
                className="text-white"
                color="primary"
              >
                <ChapterLink
                  href={`/book/${bookUrl}/${last.url}`}
                  color="foreground"
                  id={last.number}
                >
                  {`Chapter ${last.number}`}
                </ChapterLink>
              </Chip>
              {checkNew(last.addAt) ? (
                <span className="flex justify-center items-center text-[16px] h-[28px] font-semibold w-10 bg-clip-text text-transparent bg-gradient-to-b from-[#FF72E1] to-[#F54C7A]">
                  New
                </span>
              ) : (
                <span className="text-[0.92rem] font-semibold w-10 flex justify-center items-center h-[28px]">{`${last.addAt.getDate()} ${
                  MONTHS[last.addAt.getMonth()]
                }`}</span>
              )}
            </div>
            <div className="flex flex-row justify-between items-center mt-1">
              <Chip
                radius="sm"
                variant="solid"
                className="text-white"
                color="primary"
              >
                <ChapterLink
                  href={`/book/${bookUrl}/${secondLast.url}`}
                  color="foreground"
                  id={secondLast.number}
                >
                  {`Chapter ${secondLast.number}`}
                </ChapterLink>
              </Chip>
              {checkNew(secondLast.addAt) ? (
                <span className="flex justify-center items-center text-[16px] h-[28px] font-semibold w-10 bg-clip-text text-transparent bg-gradient-to-b from-[#FF72E1] to-[#F54C7A]">
                  New
                </span>
              ) : (
                <span className="text-[0.92rem] font-semibold w-10 flex justify-center items-center h-[28px]">{`${secondLast.addAt.getDate()} ${
                  MONTHS[secondLast.addAt.getMonth()]
                }`}</span>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default RecentInfo;
