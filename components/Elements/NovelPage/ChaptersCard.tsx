"use client";
import React, { ReactElement, useState, useRef } from "react";
import { Tabs, Tab, Pagination, ScrollShadow } from "@heroui/react";
import Grid from "@mui/material/Grid";
import { usePathname } from "next/navigation";
import ChapterSkele from "./ChapterSkele";
import Comments from "./Comments";
import Chapters from "./Chapters";

export type SingleChapter = {
  url: string;
  title: string;
  number: number;
  addAt: Date;
  likes: number;
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
  viewport,
  descCard,
}: {
  chapters: number;
  book: number;
  viewport: string;
  descCard: ReactElement;
}) => {
  const [chaptersList, setChaptersList] = React.useState<Array<SingleChapter>>(
    []
  );
  const [page, setPage] = React.useState(1);
  const pathname = usePathname();
  const [section, setSection] = useState("description");
  const isMounted = useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      async function fetchChapter() {
        const axios = (await import("axios")).default;
        await axios
          .post(`/api/data/getChapters`, { page, book })
          .then((response) => {
            setChaptersList(response.data);
          });
      }
      fetchChapter();
    } else {
      isMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  return (
    <div className="mx-[5%] flex justify-center flex-col items-center mt-4 w-[90vw]">
      <Tabs
        variant="light"
        aria-label="book-tabs"
        classNames={{ panel: "w-full", base: "w-full", tabList: "w-full" }}
        color="primary"
        selectedKey={section}
        onSelectionChange={(k) => {
          setSection(k.toString());
        }}
      >
        <Tab key={"description"} title={"Description"} className="w-full">
          {descCard}
        </Tab>
        <Tab
          key={"chapters"}
          title={"Chapters"}
          className="flex justify-center flex-col items-center w-full"
        >
          {Math.ceil(chapters / 100) > 0 && (
            <Pagination
              isCompact
              showControls
              initialPage={1}
              page={page}
              total={Math.ceil(chapters / 100)}
              onChange={setPage}
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
