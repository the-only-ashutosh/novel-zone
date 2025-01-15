import DetailCard from "@/components/Elements/DetailCard/DetailCard";
import GradBanner from "@/components/Shared/GradBanner";
import { fetchByAuthor } from "@/service/dataoperation";
import { notFound } from "next/navigation";
import React from "react";

const AuthorPage = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}) => {
  const { name } = await params;
  const author = await fetchByAuthor(name);

  return (
    <div className="flex mt-4 mb-10 w-full">
      <GradBanner main="Author" sub={`Books by ${decodeURI(name)}`}>
        {author !== "Invalid Author" ? (
          <div className="grid updatedlistgrid gap-4 justify-center w-full">
            {author.book.map((book) => {
              return (
                <DetailCard
                  aspectRatio={Number(book.aspectRatio)}
                  bookUrl={book.bookUrl}
                  chapters={book._count.chapter}
                  imageUrl={book.imageUrl}
                  status={book.status}
                  time={
                    book.chapter.length > 0
                      ? book.chapter[0].addAt
                      : book.updatedAt
                  }
                  title={book.title}
                  key={book.title}
                  ratings={(book.totalStars / book.userrated).toFixed(1)}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex w-[90%] h-full justify-center items-center">
            {notFound()}
          </div>
        )}
      </GradBanner>
    </div>
  );
};

export default AuthorPage;
