"use server";
import React from "react";
import { Tooltip, Badge } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import Grid from "@mui/material/Grid2";
import StarRateIcon from "@mui/icons-material/StarRate";
import VisibilityIcon from "@mui/icons-material/Visibility";

const InfoCard = ({
  imgUrl,
  title,
  bookUrl,
  rating,
  views,
  status,
  totalChapters,
  aspectRatio,
}: {
  imgUrl: string | null;
  title: string | null;
  bookUrl: string | null;
  rating: string | null;
  views: number | null;
  status: string;
  totalChapters: number | null;
  aspectRatio: number;
}) => {
  const badgePos = {
    Ongoing: " top-[8px] right-[31.5px]",
    Completed: " top-[8px] right-[37px]",
    Dropped: " top-[8px] right-[30px]",
  };

  const getPos = (status: string) => {
    if (status === "Completed") {
      return badgePos.Completed;
    }
    if (status === "Ongoing") {
      return badgePos.Ongoing;
    }
    if (status === "Dropped") {
      return badgePos.Dropped;
    }
  };

  return (
    <Grid
      className="justify-center flex items-center transition-transform duration-300 hover:transform hover:scale-95"
      size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
    >
      <Link
        href={`/book/${bookUrl}`}
        className="flex flex-col items-center"
        color="foreground"
        prefetch={false}
      >
        <Badge
          color={
            status === "Completed"
              ? "success"
              : status === "Dropped"
              ? "danger"
              : "primary"
          }
          content={status.toUpperCase()}
          size="sm"
          placement="top-right"
          className={`${
            status === "Completed" ? "dark:text-[#080808]" : "dark:text-white"
          }  rounded-md rounded-br-none rounded-tl-none ${getPos(status)}`}
          showOutline={false}
        >
          <Image
            alt={title ?? "Novel Zone Cover"}
            src={imgUrl!}
            width={Math.ceil(210 * aspectRatio)}
            height={210}
            loading="eager"
            fetchPriority="low"
            style={{
              borderRadius: "0.375rem",
              height: "210px",
              width: `${Math.ceil(210 * aspectRatio)}px`,
            }}
          />
        </Badge>
        <div className="flex flex-col w-full text-sm px-[2px]">
          <Tooltip
            showArrow
            classNames={{
              base: [
                // arrow color
                "before:bg-neutral-400 dark:before:bg-white",
              ],
              content: [
                "py-2 px-4 shadow-xl",
                "text-black bg-gradient-to-br from-white to-neutral-400",
              ],
            }}
            content={title}
            placement="top"
          >
            <span className="line-clamp-1">{title}</span>
          </Tooltip>
          <div className="flex flex-row justify-between w-full">
            <span>Chapters</span>
            <span>{totalChapters ?? "750"}</span>
          </div>
          <div className="flex flex-row justify-between w-full">
            <span className="flex items-center">
              {rating ?? "4.5 "}
              <StarRateIcon
                color="warning"
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  marginLeft: "0.25rem",
                }}
              />
            </span>
            <span className="flex items-center">
              {views ?? "1234 "}
              <VisibilityIcon
                color="error"
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  marginLeft: "0.25rem",
                }}
              />
            </span>
          </div>
        </div>
      </Link>
    </Grid>
  );
};

export default InfoCard;
