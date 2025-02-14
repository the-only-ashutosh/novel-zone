import { Decimal } from "@prisma/client/runtime/library";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const HOST =
  process.env.NODE_ENV === "production"
    ? process.env.HOST
    : "http://localhost:3000";

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
  source: string;
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

export type Chapter = {
  bookId: number;
  number: number;
  views: number;
  likes: number;
  url: string;
  content: string[];
  title: string;
};

export type IncomingUser = {
  name: string;
  image: string;
  id: string;
  email: string;
};

export type IncomingSettings = {
  userId: string;
  theme: string;
  font: string;
  size: string;
  lineHeight: string;
  indent: boolean;
  customFont: string | null;
};

export type IncomingHistory = {
  userId: string;
  bookUrl: string;
  url: string;
  title: string;
};

export type Profile = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  age: Date | null | undefined;
  gender: "M" | "F" | "O" | null;
  bio: string;
  userId: string;
  id: string;
};
