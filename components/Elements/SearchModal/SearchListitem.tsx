import React from "react";
import { Spinner } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const SearchListitem = ({
  data,
  state,
  clMd,
}: {
  data: { bookUrl: string; title: string; chapters: number } | null;
  state: string | null;
  clMd: () => void;
}) => {
  const router = useRouter();
  return (
    <div
      className={`flex items-center py-4 px-2 border-b border-gray-500 dark:border-gray-200 bg-default-400/50 dark:bg-default-500/20`}
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
        <Link
          href={`/book/${data.bookUrl}`}
          onClick={(e) => {
            e.preventDefault();
            router.push(`/book/${data.bookUrl}`);
            clMd();
          }}
          className="flex flex-row justify-between min-w-full items-center"
        >
          <div className="flex flex-row dshg items-center">
            <div
              className={`mr-1 text-zinc-900 dark:text-white/100 line-clamp-1 sm:text-sm min-w-[66%]`}
              //   style={{
              //     "--font-size":
              //       data.cartoon_name.length > 13 ? "0.7rem" : "1.125rem",
              //   }}
            >
              {data.title}
            </div>
          </div>
          <div
            className={`flex justify-end text-zinc-900 dark:text-white/100 sm:text-sm w-[34%]`}
          >{`Chapters: ${data.chapters}`}</div>
        </Link>
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
