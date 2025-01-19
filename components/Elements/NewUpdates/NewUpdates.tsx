import { getTimeDiff } from "@/service/functions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card, CardBody } from "@heroui/react";

const NewUpdatesItem = ({
  url,
  title,
  time,
  chapTitle,
  chapUrl,
  aspectratio,
  bookUrl,
  author,
}: {
  url: string;
  title: string;
  time: Date;
  chapTitle: string;
  chapUrl: string;
  aspectratio: number;
  bookUrl: string;
  author: string;
}) => {
  return (
    <Card className="w-full my-2 rounded-sm">
      <CardBody className="flex flex-row p-0">
        <Image
          src={url}
          alt={title}
          height={108}
          width={Math.ceil(108 * aspectratio)}
        />
        <div className="flex flex-row justify-between w-full m-2">
          <div className="w-[65%] flex flex-col justify-around">
            <Link
              href={`/book/${bookUrl}`}
              className="hover:dark:text-primary hover:text-primary dark:text-white"
            >
              <h2 className="font-semibold text-medium line-clamp-1 sm:line-clamp-2 md:line-clamp-2 lg:text-lg xl:text-xl">
                {title}
              </h2>
            </Link>
            <div className="mt-auto flex flex-col">
              <p className="sm:text-small line-clamp-1">{author}</p>
              <p className="sm:text-small mt-1">
                Updated:&nbsp;{getTimeDiff(time)}
                &nbsp;ago
              </p>
            </div>
          </div>
          <div className="w-[25%]">
            <Link
              href={chapUrl}
              className="line-clamp-4 hover:dark:text-primary hover:text-primary dark:text-white"
            >
              {chapTitle}
            </Link>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default NewUpdatesItem;
