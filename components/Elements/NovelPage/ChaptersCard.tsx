"use client";
import React, { Suspense } from "react";
import { Tabs, Tab, Card, Pagination } from "@heroui/react";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getTimeDiff } from "@/service/functions";
import ChapterSkele from "./ChapterSkele";
import Comments from "./Comments";
import dynamic from "next/dynamic";
const DescCard = dynamic(() => import("./DescCard"), {
  ssr: true,
});

export type SingleChapter = {
  url: string;
  title: string;
  number: number;
  addAt: Date;
};

const ChListSkele = (
  <Grid container spacing={1} className="mt-2 w-full">
    <ChapterSkele />
    <ChapterSkele />
    <ChapterSkele />
    <ChapterSkele />
    <ChapterSkele />
    <ChapterSkele />
    <ChapterSkele />
    <ChapterSkele />
    <ChapterSkele />
    <ChapterSkele />
  </Grid>
);

const ChaptersCard = ({
  chapters,
  book,
  description,
}: {
  chapters: number;
  book: number;
  description: string;
}) => {
  const [chaptersList, setChaptersList] = React.useState<Array<SingleChapter>>(
    []
  );
  const [page, setPage] = React.useState(1);
  const pathname = usePathname();

  React.useEffect(() => {
    async function fetchData() {
      const axios = (await import("axios")).default;
      await axios
        .post(`/api/getChapters`, { page: 1, book: book })
        .then((response) => {
          setChaptersList(response.data);
        });
    }
    fetchData();
  }, [book]);

  return (
    <div className="mx-[5%] flex justify-center flex-col items-center mt-4 w-[90vw]">
      <Tabs
        variant="light"
        aria-label="book-tabs"
        classNames={{ panel: "w-full" }}
      >
        <Tab key={"description"} title={"Description"}>
          <DescCard description={description} />
        </Tab>
        <Tab
          key={"chapters"}
          title={"Chapters"}
          className="flex justify-center flex-col items-center"
        >
          <Pagination
            isCompact
            showControls
            initialPage={1}
            page={page}
            total={Math.ceil(chapters / 100)}
            onChange={async (pageNum) => {
              setPage(pageNum);
              const axios = (await import("axios")).default;
              await axios
                .post(`/api/getChapters`, { page: pageNum, book: book })
                .then((response) => {
                  setChaptersList(response.data);
                });
            }}
          />
          <Suspense fallback={ChListSkele}>
            <Grid container spacing={1} className="mt-2 w-full">
              {chaptersList.map((chapters, index) => {
                index++;
                return (
                  <Grid
                    key={`${chapters.number}${index}`}
                    size={{ xs: 12, sm: 12, md: 6, lg: 6 }}
                    className="transition-transform duration-300 hover:transform hover:scale-95"
                  >
                    <Card className={`flex flex-row pr-2 rounded-sm`}>
                      <div className="flex justify-center items-center min-w-20 border-small rounded-l-sm border-gray-800 dark:border-white">
                        {chapters.number}
                      </div>
                      <div className={`flex flex-col p-2`}>
                        <Link
                          href={`${pathname}/${chapters.url}`}
                          className="line-clamp-1"
                          prefetch={false}
                        >
                          {chapters.title}
                        </Link>
                        <p>{getTimeDiff(chapters.addAt)}&nbsp;ago</p>
                      </div>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Suspense>
        </Tab>
        <Tab
          key={"comments"}
          title={"Comments"}
          className="flex justify-center flex-col items-center w-full"
        >
          <Comments />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ChaptersCard;
