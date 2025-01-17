"use server";
import React from "react";
import { Card, CardBody, Chip, Badge } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";
import UpdateRoundedIcon from "@mui/icons-material/UpdateRounded";
import Rating from "@mui/material/Rating";
import { getTimeDiff } from "@/service/functions";

const DetailCard = ({
  aspectRatio,
  title,
  bookUrl,
  imageUrl,
  chapters,
  time,
  status,
  ratings,
}: {
  aspectRatio: number;
  title: string;
  bookUrl: string;
  imageUrl: string;
  chapters: number;
  time: Date;
  status: string;
  ratings: string;
}) => {
  return (
    <Link
      href={`/book/${bookUrl}`}
      color="foreground"
      className="transition-transform duration-700 hover:transform hover:scale-[.99]"
      prefetch={false}
    >
      <Badge
        color="warning"
        variant="solid"
        content={
          <Rating
            value={Number(ratings)}
            precision={0.1}
            readOnly
            size="small"
            name={`${title} Rating`}
            style={{ color: "#ffffff" }}
          />
        }
        placement="top-right"
        size="md"
        showOutline={false}
        classNames={{
          base: "flex",
          badge:
            "rounded-md rounded-br-none rounded-tl-none dark:text-white top-[9px] right-[49px]",
        }}
      >
        <Card className="flex flex-row border-none bg-background/60 dark:bg-default-100/50 rounded-md w-full dark:text-white hover:dark:text-primary hover:text-primary">
          <CardBody className="flex flex-row h-full p-0">
            <Image
              src={imageUrl}
              alt={`${title}`}
              height={176}
              width={Math.ceil(176 * aspectRatio)}
              style={{
                height: "176px",
                width: `${Math.ceil(176 * aspectRatio)}px`,
                borderTopLeftRadius: "0.375rem",
                borderBottomLeftRadius: "0.375rem",
                borderBottomRightRadius: "0px",
                borderTopRightRadius: "0px",
              }}
              loading="eager"
            />
            <div className="flex flex-col ml-4 sm:ml-3 mt-4 sm:pr-1">
              <p
                className="text-lg sm:text-medium font-semibold mt-2 sm:line-clamp-2 line-clamp-3 h-11"
                style={{ lineHeight: "1.25rem" }}
              >
                {title}
              </p>
              <div className="flex flex-col mt-3 sm:text-sm">
                <span className="flex items-center text-black dark:text-white">
                  <HistoryEduRoundedIcon className="text-md" />
                  &nbsp; {`${chapters} Chapters`}
                </span>
                <span className="flex items-center text-black dark:text-white">
                  <UpdateRoundedIcon className="text-md" />
                  &nbsp; {`Updated ${getTimeDiff(time)} ago`}
                </span>
                <span className="text-black dark:text-white">
                  {`Status: `}
                  <Chip
                    variant="light"
                    color={
                      status === "Completed"
                        ? "success"
                        : status === "Ongoing"
                        ? "primary"
                        : "danger"
                    }
                    classNames={{ content: "px-0" }}
                  >
                    {status.toUpperCase()}
                  </Chip>
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </Badge>
    </Link>
  );
};

export default DetailCard;
