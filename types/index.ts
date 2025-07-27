import { GENRE } from "@/service/genre";
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
          chapter: {
            number: number;
            title: string;
            url: string;
          }[];
          title: string;
          bookUrl: string;
          imageUrl: string;
          aspectRatio: Decimal;
        };
        addAt: Date;
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

export type RecentsChapter = {
  number: number;
  addAt: Date;
  url: string;
};

export type RankingData = {
  imageUrl: string;
  bookUrl: string;
  title: string;
  views: string;
  rank: number;
};
export type CommonData =
  | {
      daily: RankingData[];
      weekly: RankingData[];
      monthly: RankingData[];
    }
  | "Error";

export type ChapterData =
  | {
      content: string;
      prevChapter: {
        number: number;
        url: string;
      } | null;
      nextChapter: {
        number: number;
        url: string;
      } | null;
      number: number;
      book: {
        title: string;
        bookUrl: string;
      };
      title: string;
      addAt: Date;
      likes: number;
    }
  | "Invalid Chapter"
  | undefined;

export type BookData =
  | {
      first: {
        number: number;
        title: string;
        url: string;
        addAt: Date;
      } | null;
      last: {
        number: number;
        title: string;
        url: string;
        addAt: Date;
      } | null;
      id: number;
      status: string;
      title: string;
      imageUrl: string;
      bookUrl: string;
      aspectRatio: Decimal;
      updatedAt: Date;
      views: number;
      author: {
        id: number;
        name: string;
        route: string;
      };
      category: {
        name: string;
        route: string;
      }[];
      chapter: {
        number: number;
      }[];
      genre: {
        name: string;
        route: string;
      }[];
      description: string;
      ratings: Decimal;
    }
  | "Invalid Book";

export type FooterData = {
  randomCategories: {
    name: string;
    id: number;
    route: string;
  }[];
  randomGenres: GENRE[];
  randomBooks: {
    title: string;
    id: number;
    bookUrl: string;
  }[];
};

export type PopularData = {
  title: string;
  id: number;
  bookUrl: string;
  imageUrl: string;
  aspectRatio: Decimal;
  ratings: Decimal;
  views: number;
  status: string;
  _count: {
    chapter: number;
  };
};

export type RecentsData = {
  bookUrl: string;
  imageUrl: string;
  title: string;
  last: {
    number: number;
    addAt: Date;
    url: string;
  };
  secondLast: {
    number: number;
    addAt: Date;
    url: string;
  };
  updatedAt: Date;
};

export type Ranking = {
  daily: {
    rank: number;
    views: string;
    title: string;
    bookUrl: string;
    imageUrl: string;
    daily: number;
  }[];
  weekly: {
    rank: number;
    views: string;
    title: string;
    bookUrl: string;
    imageUrl: string;
    weekly: number;
  }[];
  monthly: {
    rank: number;
    views: string;
    title: string;
    bookUrl: string;
    imageUrl: string;
    monthly: number;
  }[];
};
