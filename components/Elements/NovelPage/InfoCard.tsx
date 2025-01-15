import { Button, Card, CardBody, ScrollShadow } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Rating from "@mui/material/Rating";
import dynamic from "next/dynamic";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GenreGrid from "./GenreGrid";
import CategoryGrid from "./CategoryGrid";
const RateModal = dynamic(() => import("./RateModal"));

const InfoCard = ({
  url,
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
  url: string;
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
    <Card className="mb-6 w-[95vw]">
      <CardBody className="flex colrow p-0">
        <Image
          priority
          src={url}
          alt={title}
          width={240}
          height={Math.ceil(240 / aspectRatio)}
          style={{
            objectFit: "cover",
          }}
        />
        <div className="flex flex-col ml-6 my-5">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="my-3 text-medium">
            <h3 className="mt-1">
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
                  <Link href={`/filter/status/${status}`}>
                    {status.toUpperCase()}
                  </Link>
                </span>
              }
            </h3>
            <h3 className="mt-1 flex items-center">
              Ratings:&nbsp;
              <Rating
                precision={0.05}
                readOnly
                value={ratings}
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
          <div className="flex flex-row mt-auto justify-between">
            <div className="flex flex-row">
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
            {/* <TagIcon height={32} width={32} /> */}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default InfoCard;
