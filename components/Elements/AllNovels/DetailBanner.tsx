import { Card, Chip, CardBody } from "@heroui/react";
import Image from "next/image";
import React from "react";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";

const DetailBanner = ({
  url,
  title,
  aspectRatio,
  author,
  bookUrl,
  totalChapters,
  statu,
  ratings,
  users,
  viewport,
  views,
}: {
  url: string;
  title: string;
  aspectRatio: number;
  author: string;
  bookUrl: string;
  totalChapters: number;
  statu: string;
  ratings: number;
  users: number;
  viewport: string;
  views: number;
}) => {
  return (
    <Card className="flex border-none bg-background/60 dark:bg-default-100/50 rounded-md w-full">
      <CardBody
        className="flex flex-row h-full p-0"
        as={"a"}
        href={`/book/${bookUrl}`}
      >
        <Image src={url} alt={title} width={176 * aspectRatio} height={176} />
        <div className="flex flex-col ml-2 py-2">
          <h1 className="sm:text-large text-xl font-semibold line-clamp-2">
            {title}
          </h1>
          <div className="flex flex-col mt-auto">
            <h2 className="line-clamp-1 text-gray-700 flex items-center">
              <ModeEditRoundedIcon sx={{ fontSize: "21px" }} />
              &nbsp;{author}
            </h2>
            <h2>Chapters:&nbsp;{totalChapters}</h2>
            {viewport === "desktop" && <h2>Views:&nbsp;{views}</h2>}
            <h2>
              Ratings:&nbsp;{`${Number(ratings / users).toFixed(1)} (${users})`}
            </h2>
            <h2>
              Status:&nbsp;
              <Chip
                variant="light"
                color={
                  statu === "Completed"
                    ? "success"
                    : statu === "Ongoing"
                    ? "primary"
                    : "danger"
                }
                classNames={{ content: "px-0" }}
              >
                {statu.toUpperCase()}
              </Chip>
            </h2>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default DetailBanner;
