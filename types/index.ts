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
};
