import React, { cache } from "react";
import dynamic from "next/dynamic";
import { fetchBookDetails, fetchMatchingBooks } from "@/service/dataoperation";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import { Typography } from "@mui/material";
import type { Metadata } from "next";
import { getTimeDiff } from "@/service/functions";
import { notFound } from "next/navigation";
import GradBanner from "@/components/Shared/GradBanner";
import InfoList from "@/components/Elements/InfoCard/InfoList";
import Script from "next/script";
import DescCard from "@/components/Elements/NovelPage/DescCard";
import CategoryGrid from "@/components/Elements/NovelPage/CategoryGrid";
import { ChapterLink } from "@/components/Shared/Progressbar/progress-bar";
import { TrackBook } from "@/utils/trackViewedbook";
import CosmicChroniclesCard from "@/components/UI/cosmic-chronicles";
const ChaptersCard = dynamic(
  () => import("@/components/Elements/NovelPage/ChaptersCard")
);
const InfoCard = dynamic(
  () => import("@/components/Elements/NovelPage/InfoCard"),
  { ssr: true }
);
const SmallInfoCard = dynamic(
  () => import("@/components/Elements/NovelPage/SmallInfoCard"),
  { ssr: true }
);

type SearchParams = Promise<{ [key: string]: string }>;

const getBookData = cache((book: string) => {
  return fetchBookDetails(book);
});

const BookPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ book_name: string }>;
  searchParams: SearchParams;
}) => {
  let book_name = decodeURIComponent((await params).book_name);
  if (book_name.endsWith("-novel")) {
    book_name = book_name.substring(0, book_name.length - 6);
  }
  const v = searchParams;
  const b = getBookData(book_name);
  const m = fetchMatchingBooks(decodeURIComponent(book_name));
  const [bookDetail, { viewport }, like] = await Promise.all([b, v, m]);
  if (bookDetail === "Invalid Book") return notFound();
  return (
    <div className="flex items-center flex-col py-[2.5%]">
      <CosmicChroniclesCard />
      <TrackBook bookId={bookDetail.id} />
      {viewport === "desktop" ? (
        <InfoCard
          author={bookDetail.author.name}
          genres={bookDetail.genre}
          status={bookDetail.status}
          title={bookDetail.title}
          url={bookDetail.imageUrl}
          bookUrl={book_name}
          views={bookDetail.views}
          ratings={
            isNaN(Number(bookDetail.ratings)) ? 0 : Number(bookDetail.ratings)
          }
          first={bookDetail.first}
          last={bookDetail.last}
          count={
            bookDetail.chapter.length > 0 ? bookDetail.chapter[0].number : 0
          }
          updated={bookDetail.updatedAt}
        />
      ) : (
        <SmallInfoCard
          author={bookDetail.author.name}
          genres={bookDetail.genre}
          status={bookDetail.status}
          title={bookDetail.title}
          imgUrl={bookDetail.imageUrl}
          bookUrl={book_name}
          views={bookDetail.views}
          ratings={
            isNaN(Number(bookDetail.ratings)) ? 0 : Number(bookDetail.ratings)
          }
          first={bookDetail.first}
          last={bookDetail.last}
          count={
            bookDetail.chapter.length > 0 ? bookDetail.chapter[0].number : 0
          }
        />
      )}
      {bookDetail.category.length > 0 && (
        <CategoryGrid category={bookDetail.category} />
      )}
      <div className="flex flex-row w-[90vw] colrow px-2 sm:px-1 border-t-1 border-b-1 border-dashed py-3 mt-8">
        <div className="flex font-bold text-medium">
          <AutoStoriesRoundedIcon />
          &nbsp; Latest Chapter
        </div>
        <div className="flex colrow justify-between w-[65%] lg:w-[73%] xl:w-[80%] sm:w-full smallmargin">
          {bookDetail.last ? (
            <ChapterLink
              href={`/book/${book_name}/${bookDetail.last.url}?num=${bookDetail.last.number}`}
              className="text-primary"
            >
              {bookDetail.last.title}
            </ChapterLink>
          ) : (
            <Typography className="text-primary">
              Book is updating...
            </Typography>
          )}
          <Typography>
            {bookDetail.last
              ? getTimeDiff(new Date(bookDetail.last.addAt))
              : `Some days`}
            &nbsp;ago
          </Typography>
        </div>
      </div>
      <ChaptersCard
        book={bookDetail.id}
        chapters={
          bookDetail.chapter.length > 0 ? bookDetail.chapter[0].number : 0
        }
        viewport={viewport}
        descCard={<DescCard description={bookDetail.description} />}
      />
      {like !== "Invalid Book" && (
        <GradBanner main={`Genre ${like.random}`} sub={`Books you might like`}>
          <InfoList data={like.data} cls="w-full" r={false} />
        </GradBanner>
      )}
      <Script
        strategy="afterInteractive"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-TESRE0F8SW"
      />
      <Script
        strategy="afterInteractive"
        id="tag-manager"
      >{`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-TESRE0F8SW');`}</Script>
      <Script strategy="afterInteractive" id="YadTag" type="text/javascript">
        {`(function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=103493404', 'ym');
        
            ym(103493404, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});`}
      </Script>
    </div>
  );
};

export default BookPage;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ book_name: string }>;
}): Promise<Metadata> {
  const { book_name } = await params;
  const book = await getBookData(decodeURIComponent(book_name));
  if (book === "Invalid Book") {
    return {
      title: "Books",
      referrer: "origin-when-cross-origin",
      keywords: ["Novel", "Novel Zone", "Novelbin", "lightnovel", "webnovel"],
    };
  }

  return {
    title: {
      template: `%s | ${book.title.trim().substring(0, 55)}`,
      default: `${book.title.trim().substring(0, 55)}`,
    },
    referrer: "origin-when-cross-origin",
    description:
      book.description
        .replaceAll("[hereisbreak]", " ")
        .substring(0, 155)
        .trim() +
      ` Read ${book.title} only on Novel Zone. By Author ${
        book.author.name
      } . ${book.title} has total of ${
        book.last?.number
      } chapters updated. The last chapter was uploaded on ${new Date(
        book.last?.addAt ?? book.first?.addAt ?? book.updatedAt
      ).toLocaleDateString()}`,
    keywords: [
      "Novel",
      "Novel Zone",
      "Novelbin",
      "lightnovel",
      "webnovel",
      book.title,
      ...book.genre.map((e) => e.name),
      ...book.category.map((e) => e.name),
    ],
    twitter: {
      card: "summary_large_image",
      title: book.title,
      description:
        book.description
          .replaceAll("[hereisbreak]", " ")
          .substring(0, 70)
          .trim() +
        ` Read ${book.title} only on Novel Zone. By Author ${
          book.author.name
        } . ${book.title} has total of ${
          book.last?.number
        } chapters updated. The last chapter was uploaded on ${new Date(
          book.last?.addAt ?? book.first?.addAt ?? book.updatedAt
        ).toLocaleDateString()}`,
      images: book.imageUrl,
    },
  };
}
