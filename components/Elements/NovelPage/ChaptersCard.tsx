"use client";
import React from "react";
import { Tabs, Tab, Pagination, ScrollShadow } from "@heroui/react";
import Grid from "@mui/material/Grid2";
import { usePathname } from "next/navigation";
import ChapterSkele from "./ChapterSkele";
import Comments from "./Comments";
import dynamic from "next/dynamic";
import Chapters from "./Chapters";
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
  viewport,
}: {
  chapters: number;
  book: number;
  description: string;
  viewport: string;
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
          {Math.ceil(chapters / 100) > 0 && (
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
          )}
          {chaptersList.length === 0 ? (
            ChListSkele
          ) : viewport === "desktop" ? (
            <Chapters chaptersList={chaptersList} pathname={pathname} />
          ) : (
            <ScrollShadow className="h-[736px] my-4" size={0}>
              <Chapters chaptersList={chaptersList} pathname={pathname} />
            </ScrollShadow>
          )}
          {/* <ScrollShadow > */}

          {/* </ScrollShadow> */}
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
