import { Button, Card, CardBody, Divider } from "@heroui/react";
import React from "react";
import dynamic from "next/dynamic";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GenreGrid from "./GenreGrid";
import { ProgressBarLink } from "@/components/Shared/Progressbar/progress-bar";
import { ColorBookmark } from "@/components/icons";
import CoverImage from "./CoverImage";
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
}) => {
  return (
    <div className="flex flex-row sm:flex-col md:flex-col gap-y-2 items-center mx-[5%] max-h-fit w-[90%]">
      <div
        className="absolute top-16 bottom-0 left-0 right-0"
        style={{
          backgroundImage: `url(${url})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: 0.5,
          zIndex: -1,
          maxHeight: "424px",
        }}
      >
        <div className="bg-gradient-to-b from-transparent to-primary w-full h-full"></div>
      </div>
      <CoverImage src={url} title={title} width={280} />
      <Card className="mb-6 w-[95vw] dark:bg-black opacity-80 lg:ml-6 xl:ml-6 md:mt-6 sm:mt-6">
        <CardBody className="flex colrow p-0 bg-transparent">
          <div className="flex flex-row sm:flex-col md:flex-col w-full justify-between">
            <div className="flex flex-col ml-6 my-5 w-[50%] sm:w-full md:w-full">
              <h1 className="text-2xl font-semibold">{title}</h1>
              <div className="my-3 text-medium">
                <h3 className="mt-1">
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
                <h3>Chapters:&nbsp;{"1111"}</h3>
                <h3 className="mt-1 flex items-center">
                  Views:&nbsp;{views}&nbsp;
                  <VisibilityIcon color="error" />
                </h3>
              </div>
              <div className="flex flex-row mt-auto w-1/2">
                <Button
                  color="primary"
                  className="mr-1 text-medium w-1/2"
                  radius="sm"
                  as="a"
                  href={chOne}
                  isDisabled={chOne === "disabled"}
                >
                  Read First
                </Button>
                <Button
                  color="danger"
                  className="text-medium w-1/2"
                  radius="sm"
                  as="a"
                  href={chOne}
                  isDisabled={chOne === "disabled"}
                >
                  Read Last
                </Button>
              </div>
            </div>
            <div className="flex flex-col w-[40%] sm:w-full md:w-full">
              <div className="flex flex-col mb-12 mt-6 items-center justify-center">
                <h3 className="text-medium bg-clip-text text-transparent bg-gradient-to-b from-[#5EA2EF] to-[#0072F5] my-2">
                  Published by :&nbsp;&nbsp;<strong>{"Novel Zone"}</strong>
                </h3>
                <h3 className="text-medium bg-clip-text text-transparent bg-gradient-to-b from-[#5EA2EF] to-[#0072F5] my-2">
                  Published on :&nbsp;<strong>{"01 Feb 2025"}</strong>
                </h3>
              </div>
              <div className="flex flex-row justify-around mt-1 mb-2">
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
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default InfoCard;
