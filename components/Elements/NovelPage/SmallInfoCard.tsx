import React from "react";
import { Button, Card, Divider } from "@heroui/react";
import Image from "next/image";
import dynamic from "next/dynamic";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GenreGrid from "./GenreGrid";
import {
  ChapterLink,
  ProgressBarLink,
} from "@/components/Shared/Progressbar/progress-bar";
import { ColorBookmark } from "@/components/icons";
import { chM } from "./InfoCard";
const RateModal = dynamic(() => import("./RateModal"));

const SmallInfoCard = ({
  imgUrl,
  bookUrl,
  title,
  genres,
  author,
  status,
  views,
  first,
  last,
  ratings,
  count,
}: {
  imgUrl: string;
  bookUrl: string;
  title: string;
  genres: {
    name: string;
    route: string;
  }[];
  author: string;
  status: string;
  views: number;
  first: chM;
  last: chM;
  ratings: number;
  count: number;
}) => {
  return (
    <div className={`flex flex-col gap-y-2 items-center rounded-sm`}>
      <div
        className="absolute top-16 bottom-0 left-0 right-0"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: 0.5,
          zIndex: -1,
          height: "792px",
        }}
      >
        <div className="bg-gradient-to-b from-transparent to-primary w-full h-full"></div>
      </div>
      <Card className="w-fit">
        <Image
          priority
          src={imgUrl}
          alt={title}
          width={280}
          height={Math.ceil(280 / 0.75)}
          style={{
            objectFit: "cover",
          }}
        />
      </Card>
      <Card className="mx-[5%] w-[90vw] bg-opacity-70 dark:bg-opacity-80 dark:bg-black">
        <div className="flex flex-col mx-3 my-5 p-0">
          <h1 className="text-lg font-semibold line-clamp-2">{title}</h1>
          <div className="mt-1 text-medium">
            <h3 className="text-lg mt-1">
              Author:&nbsp;
              <ProgressBarLink
                href={`/author/${author}`}
                className="hover:text-primary dark:hover:text-primary"
                prefetch={false}
              >
                {author}
              </ProgressBarLink>
            </h3>
            {genres.length > 0 && <GenreGrid genres={genres} />}
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
                  <ProgressBarLink
                    href={
                      status === "Completed"
                        ? "/filter/completed"
                        : "/filter/ongoing"
                    }
                    prefetch={false}
                  >
                    {status.toUpperCase()}
                  </ProgressBarLink>
                </span>
              }
            </h3>
            <h3 className="mt-1 flex items-center">Chapters:&nbsp;{count}</h3>
            <h3 className="mt-1 flex items-center">
              Views:&nbsp;{views}&nbsp;
              <VisibilityIcon color="error" />
            </h3>
          </div>
          <div className="flex flex-row justify-around mt-1">
            <div className="flex flex-col items-center justify-center w-[40%]">
              <Button
                isIconOnly
                variant="light"
                className="data-[hover=true]:bg-transparent"
                disableRipple
              >
                <ColorBookmark width={24} height={24} />
              </Button>
              <h4 className="font-semibold text-xl bg-clip-text text-transparent bg-gradient-to-b from-[#5EA2EF] to-[#0072F5]">
                Bookmark
              </h4>
              <h4 className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-b from-[#5EA2EF] to-[#0072F5]">
                {"(44)"}
              </h4>
            </div>
            <Divider
              orientation="vertical"
              className="bg-danger my-2 mx-4 w-[2px] rounded-full h-[96px]"
            />
            <div className="flex flex-col items-center justify-center w-[40%]">
              <RateModal bkTitle={title} />
              <h4 className="font-semibold text-xl bg-clip-text text-transparent bg-gradient-to-b from-[#ffcd0f] to-[#ff6f47]">
                Rating
              </h4>
              <h4 className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-b from-[#ffcd0f] to-[#ff6f47]">
                {`(${ratings.toFixed(1)})`}
              </h4>
            </div>
          </div>
          <div className="flex flex-row mt-3 w-full">
            <Button
              color="primary"
              className="mr-1 text-medium w-1/2"
              radius="sm"
              isDisabled={!first}
            >
              {first ? (
                <ChapterLink
                  href={`/book/${bookUrl}/${first.url}?num=${first.number}`}
                >
                  Read First
                </ChapterLink>
              ) : (
                "Read First"
              )}
            </Button>
            <Button
              color="danger"
              className="text-medium w-1/2"
              radius="sm"
              isDisabled={!last}
            >
              {last ? (
                <ChapterLink
                  href={`/book/${bookUrl}/${last.url}?num=${last.number}`}
                >
                  Read Last
                </ChapterLink>
              ) : (
                "Read Last"
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SmallInfoCard;
