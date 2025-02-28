import React from "react";
import { SingleChapter } from "./ChaptersCard";
import { getTimeDiff } from "@/service/functions";
import Grid from "@mui/material/Grid2";
import { Card } from "@heroui/react";
import { ProgressBarLink } from "@/components/Shared/Progressbar/progress-bar";
import Like from "./Like";

const Chapters = ({
  chaptersList,
  pathname,
}: {
  chaptersList: SingleChapter[];
  pathname: string;
}) => {
  return (
    <Grid container spacing={1} className="mt-2 w-full">
      {chaptersList.map((chapters, index) => {
        index++;
        return (
          <Grid
            key={`${chapters.number}${index}`}
            size={{ xs: 12, sm: 12, md: 6, lg: 6 }}
            className="transition-transform duration-300 hover:transform hover:scale-95"
          >
            <Card className={`flex flex-row rounded-sm justify-between`}>
              <ProgressBarLink
                href={`${pathname}/${chapters.url}`}
                prefetch={false}
                className="flex flex-row pr-2"
              >
                <div className="flex justify-center items-center min-w-20 border-small rounded-l-sm border-gray-800 dark:border-white">
                  {chapters.number}
                </div>
                <div className={`flex flex-col p-2`}>
                  <p className="line-clamp-1">{chapters.title}</p>
                  <p>{getTimeDiff(chapters.addAt)}&nbsp;ago</p>
                </div>
              </ProgressBarLink>
              <Like
                book={pathname.split("/")[2]}
                number={chapters.number}
                likes={chapters.likes}
              />
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Chapters;
