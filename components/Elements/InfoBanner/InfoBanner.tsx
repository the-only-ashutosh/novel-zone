import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";
import Link from "next/link";
import Image from "next/image";
import { getTimeDiff } from "@/service/functions";

const InfoBanner = ({
  img,
  book,
  bookUrl,
  number,
  time,
  aspectRatio,
}: Readonly<{
  img: string;
  book: string;
  bookUrl: string;
  number: number;
  time: Date;
  aspectRatio: number;
}>) => {
  return (
    <Card className="border-none bg-background/60 dark:bg-default-100/50 rounded-sm transition-transform duration-300 hover:transform hover:scale-95">
      <Link href={`/book/${bookUrl}`} color="foreground" prefetch={false}>
        <CardBody className="flex flex-row rounded-sm h-full p-0">
          <Image
            src={img}
            alt={book}
            width={Math.ceil(104 * aspectRatio)}
            height={104}
            style={{
              borderTopLeftRadius: "0.125rem",
              borderBottomLeftRadius: "0.125rem",
              borderBottomRightRadius: "0px",
              borderTopRightRadius: "0px",
              width: `${Math.ceil(104 * aspectRatio)}px`,
              height: "104px",
            }}
            loading="lazy"
            fetchPriority="low"
          />
          <div className="flex flex-col items-start ml-8 justify-between margin-y max-w-full">
            <span className="h-6 line-clamp-1">{book}</span>

            <div className="flex justify-between text-sm colrow">
              <span className="flex items-center">
                <CalendarMonthRoundedIcon className="text-md" />
                &nbsp;
                {`Updated ${getTimeDiff(time)} ago`}
              </span>
              <span className="smallmargin flex items-center">
                <HistoryEduRoundedIcon className="text-md" />
                &nbsp; {` Chapter ${number}`}
              </span>
            </div>
          </div>
        </CardBody>
      </Link>
    </Card>
  );
};

export default InfoBanner;
