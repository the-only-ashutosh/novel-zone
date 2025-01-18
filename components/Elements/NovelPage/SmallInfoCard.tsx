import React from "react";
import { Button, Card, ScrollShadow } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import dynamic from "next/dynamic";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GenreGrid from "./GenreGrid";
import CategoryGrid from "./CategoryGrid";
const RateModal = dynamic(() => import("./RateModal"));

const SmallInfoCard = ({
  imgUrl,
  title,
  genres,
  author,
  status,
  aspectRatio,
  chOne,
  views,
  ratings,
  tags,
}: {
  imgUrl: string;
  title: string;
  genres: {
    name: string;
    route: string;
  }[];
  author: string;
  status: string;
  aspectRatio: number;
  chOne: string;
  views: number;
  ratings: number;
  tags: Array<{ name: string; route: string }>;
}) => {
  return (
    <div className={`flex flex-col gap-y-2 items-center`}>
      <Card className="w-fit">
        <Image
          priority
          src={imgUrl}
          alt={title}
          width={280}
          height={Math.ceil(280 / aspectRatio)}
          style={{
            objectFit: "cover",
          }}
        />
      </Card>
      <Card className="mx-[5%] w-[90vw]">
        <div className="flex flex-col mx-3 my-5 p-0">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="mt-3 text-medium">
            <h3 className="text-lg mt-1">
              Author:&nbsp;
              <Link
                href={`/author/${author}`}
                className="hover:text-primary dark:hover:text-primary"
              >
                {author}
              </Link>
            </h3>
            {genres.length > 0 && <GenreGrid genres={genres} />}
            {tags.length > 0 && (
              <ScrollShadow hideScrollBar className="h-[50px]" size={10}>
                <CategoryGrid category={tags} />
              </ScrollShadow>
            )}
            <h3 className="mt-1">
              Status:&nbsp;
              {
                <span
                  className={`${
                    status === "Completed"
                      ? "text-success"
                      : status === "Dropped"
                      ? "text-danger"
                      : "text-primary"
                  }`}
                >
                  <Link
                    href={
                      status === "Completed"
                        ? "/filter/completed"
                        : "filter/ongoing"
                    }
                  >
                    {status.toUpperCase()}
                  </Link>
                </span>
              }
            </h3>
            <h3 className="mt-1 flex items-center">
              Ratings:&nbsp;
              <Rating
                value={ratings}
                precision={0.05}
                readOnly
                size="small"
                name={`${title} Rating`}
                //style={{ color: "#ffffff" }}
              />
              &nbsp;
              <span className="rate-info">{`(${ratings.toFixed(1)})`}</span>
            </h3>
            <h3 className="mt-1 flex items-center">
              Views:&nbsp;{views}&nbsp;
              <VisibilityIcon color="error" />
            </h3>
          </div>
          <div className="flex flex-row mt-3">
            <Button
              color="primary"
              className="mr-1 text-medium"
              radius="sm"
              as="a"
              href={chOne}
              isDisabled={chOne === "disabled"}
            >
              Read
            </Button>
            <RateModal bkTitle={title} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SmallInfoCard;
