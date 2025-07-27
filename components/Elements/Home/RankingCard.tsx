import { EyeIcon, Rank } from "@/components/icons";
import { ProgressBarLink } from "@/components/Shared/Progressbar/progress-bar";
import { RankingData } from "@/types";
import Image from "next/image";
import React from "react";

const RankingCard = ({ data }: { data: RankingData }) => {
  const { imageUrl, rank, title, views } = data;
  return (
    <ProgressBarLink
      href={`/book/${data.bookUrl}`}
      color="foreground"
      prefetch={false}
    >
      <div className="relative banner transition-transform duration-300 hover:transform hover:scale-[0.98]">
        <Rank
          text={`# ${rank}`}
          props={{ className: "relative -bottom-8 -right-8 anim" }}
        />
        <div className="w-full z-10 flex flex-row rounded-sm overflow-clip h-24">
          <Image
            src={imageUrl}
            width={96 * 0.75}
            height={96}
            alt={title}
            style={{ objectFit: "cover" }}
          />
          <div className="flex flex-col mx-1 justify-around">
            <h3 className="line-clamp-2 text-sm">{title}</h3>
            <div className="flex flex-row h-4">
              <EyeIcon width={12} height={12} className="mt-1" />
              &nbsp;
              <p style={{ fontSize: 12 }}>{views}</p>
            </div>
          </div>
        </div>
      </div>
    </ProgressBarLink>
  );
};

export default RankingCard;
