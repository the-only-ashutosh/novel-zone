import { Decimal } from "@prisma/client/runtime/library";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type IncomingBook = {
  bookUrl: string;
  title: string;
  author: string;
  genre: Array<string>;
  status: string;
  categories: Array<string>;
  description: Array<string>;
  isHot: boolean;
  userrated: number;
  totalStars: number;
  imageUrl: string;
  views: number;
  authId: number;
  aspectRatio: Decimal;
};

export type IncomingChapter = {
  url: string;
  bookUrl: string;
  title: string;
  content: Array<string>;
  bookId: number;
};

export type detailCardData = {
  data: {
    aspectRatio: Decimal;
    title: string;
    bookUrl: string;
    imageUrl: string;
    status: string;
    updatedAt: Date;
    totalStars: number;
    userrated: number;
    _count: {
      chapter: number;
    };
  }[];
  pages: number;
};

export type newUpdates =
  | "Invalid Page"
  | {
      data: {
        book: {
          author: {
            name: string;
          };
          title: string;
          bookUrl: string;
          imageUrl: string;
          aspectRatio: Decimal;
        };
        title: string;
        addAt: Date;
        url: string;
      }[];
      pages: number;
    };
