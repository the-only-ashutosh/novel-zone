import React from "react";
import { Spinner } from "@heroui/react";
import { ProgressBarLink } from "@/components/Shared/Progressbar/progress-bar";
const SearchListitem = ({
  data,
  state,
  clMd,
  viewport,
}: {
  data: { bookUrl: string; title: string; chapters: number } | null;
  state: string | null;
  clMd: () => void;
  viewport: string;
}) => {
  return (
    <div
      className={`flex items-center py-4 px-2 border-b bg-default-400/50 dark:bg-default-500/20`}
    >
      {state === "Error Occured" && (
        <div className="flex justify-center w-full">{state}</div>
      )}
      {state === "Loading" && (
        <div className="flex justify-center w-full">
          <Spinner color="white" size="md" />
        </div>
      )}
      {data && (
        <ProgressBarLink
          href={`/book/${data.bookUrl}`}
          func={() => clMd()}
          className="flex flex-row justify-between min-w-full items-center"
        >
          <div className="flex flex-row dshg items-center">
            <div
              className={`mr-1 text-zinc-900 dark:text-white line-clamp-1 sm:text-sm min-w-[66%]`}
            >
              {data.title}
            </div>
          </div>
          {viewport !== "mobile" && (
            <div
              className={`flex justify-end text-zinc-900 dark:text-white sm:text-sm w-[34%]`}
            >{`Chapters: ${data.chapters}`}</div>
          )}
        </ProgressBarLink>
      )}
      {state === "No Books" && (
        <div className="flex justify-center w-full">
          No books found with matching keywords.
        </div>
      )}
    </div>
  );
};

export default SearchListitem;
