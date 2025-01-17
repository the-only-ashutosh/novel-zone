/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IncomingBook, IncomingChapter } from "@/types";
import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { correctString, titleToUrl } from "./functions";
import { ALL_GENRE } from "./genre";
import "server-only";

//String.fromCharCode(...singleData.description)

export const fetchMostPopular = async () => {
  const prisma = new PrismaClient();
  return await prisma.book.findMany({
    orderBy: { ratings: "desc" },
    take: 12,
    select: {
      bookUrl: true,
      imageUrl: true,
      title: true,
      ratings: true,
      views: true,
      status: true,
      id: true,
      aspectRatio: true,
      _count: { select: { chapter: true } },
    },
  });
};

export async function fetchRecentUpdates() {
  const prisma = new PrismaClient();
  const data = await prisma.chapter.findMany({
    distinct: ["bookId"],
    orderBy: { id: "desc" },
    take: 30,
    select: {
      addAt: true,
      bookId: true,
      book: {
        select: {
          imageUrl: true,
          title: true,
          bookUrl: true,
          aspectRatio: true,
          _count: { select: { chapter: true } },
        },
      },
    },
  });
  await prisma.$disconnect();
  return data;
}

export const fetchChapter = async (book_name: string, chapter: string) => {
  const prisma = new PrismaClient();

  return await prisma.chapter
    .findFirst({
      where: { book: { bookUrl: book_name }, url: chapter },
      select: {
        content: true,
        title: true,
        likes: true,
        addAt: true,
        number: true,
        book: { select: { title: true, bookUrl: true } },
      },
    })
    .then(async (chapter) => {
      if (chapter) {
        const prev = prisma.chapter.findFirst({
          where: {
            number: chapter.number - 1,
            book: { bookUrl: book_name },
          },
          select: { url: true },
        });
        const next = prisma.chapter.findFirst({
          where: {
            number: chapter.number + 1,
            book: { bookUrl: book_name },
          },
          select: { url: true },
        });
        const [prevChapter, nextChapter] = await Promise.all([prev, next]);
        await prisma.$disconnect();
        return {
          ...chapter,
          content: String.fromCharCode(...chapter.content),
          prevChapter: prevChapter ? prevChapter.url : null,
          nextChapter: nextChapter ? nextChapter.url : null,
        };
      }
    });
};

export async function searchBook(toSearch: string) {
  const prisma = new PrismaClient();
  const bookData = await prisma.book.findMany({
    where: {
      title: {
        contains: toSearch,
      },
    },
    select: {
      bookUrl: true,
      title: true,
      id: true,
      _count: { select: { chapter: true } },
    },
    orderBy: { updatedAt: "desc" },
  });
  await prisma.$disconnect();
  if (bookData.length === 0) {
    return "No Books";
  }
  return bookData;
}

export async function fetchByGenre(genre: string, page: number = 1) {
  const prisma = new PrismaClient();
  let bookData: Array<{
    id: number;
    title: string;
    bookUrl: string;
    imageUrl: string;
    updatedAt: Date;
    totalStars: number;
    userrated: number;
    aspectRatio: Decimal;
    status: string;
    _count: {
      chapter: number;
    };
  }> = [];
  try {
    if (page > 1) {
      const cursor = (
        await prisma.book.findMany({
          where: { genre: { some: { route: genre } } },
          orderBy: { id: "desc" },
          take: (page - 1) * 20,
          select: { id: true },
        })
      )[(page - 1) * 20 - 1].id;
      bookData = await prisma.book.findMany({
        where: { genre: { some: { route: genre } } },
        orderBy: { id: "desc" },
        skip: 1,
        cursor: { id: cursor },
        take: 20,
        select: {
          aspectRatio: true,
          title: true,
          bookUrl: true,
          imageUrl: true,
          status: true,
          id: true,
          updatedAt: true,
          userrated: true,
          totalStars: true,
          _count: { select: { chapter: true } },
        },
      });
    } else {
      bookData = await prisma.book.findMany({
        where: { genre: { some: { route: genre } } },
        orderBy: { id: "desc" },
        take: 20,
        select: {
          aspectRatio: true,
          title: true,
          bookUrl: true,
          imageUrl: true,
          status: true,
          id: true,
          updatedAt: true,
          userrated: true,
          totalStars: true,
          _count: { select: { chapter: true } },
        },
      });
    }
    if (!bookData) {
      await prisma.$disconnect();
      return { fData: [], total: 0 };
    }

    const total = await prisma.book.count({
      where: { genre: { some: { route: genre } } },
    });
    await prisma.$disconnect();
    return { fData: bookData, total };
  } catch (e) {
    await prisma.$disconnect();
    return "Invalid Page";
  }
}

export async function fetchMostPopularBooks(page: number = 1) {
  const prisma = new PrismaClient();
  const pages = await prisma.book
    .findMany({
      where: { ratings: { gt: -1 } },
      orderBy: [{ id: "asc" }, { ratings: "desc" }],
      select: { id: true },
    })
    .then((data) => {
      return Math.ceil(data.length / 20);
    });
  const finalData: Array<{
    id: number;
    title: string;
    bookUrl: string;
    imageUrl: string;
    updatedAt: Date;
    totalStars: number;
    userrated: number;
    aspectRatio: Decimal;
    status: string;
    chapters: number;
  }> = [];
  let bookData: Array<{
    id: number;
    title: string;
    bookUrl: string;
    imageUrl: string;
    updatedAt: Date;
    totalStars: number;
    userrated: number;
    aspectRatio: Decimal;
    status: string;
  }> = [];
  try {
    if (page > 1) {
      const cursor = (
        await prisma.book.findMany({
          where: { ratings: { gt: -1 } },
          orderBy: [{ id: "asc" }, { ratings: "desc" }],
          take: (page - 1) * 20,
          select: { id: true },
        })
      )[(page - 1) * 20 - 1].id;
      bookData = await prisma.book.findMany({
        where: { ratings: { gt: -1 } },
        skip: 1,
        cursor: { id: cursor },
        orderBy: [{ id: "asc" }, { ratings: "desc" }],
        take: 20,
        select: {
          aspectRatio: true,
          title: true,
          bookUrl: true,
          imageUrl: true,
          status: true,
          id: true,
          updatedAt: true,
          userrated: true,
          totalStars: true,
        },
      });
    } else {
      bookData = await prisma.book.findMany({
        where: { ratings: { gt: -1 } },
        orderBy: [{ id: "asc" }, { ratings: "desc" }],
        take: 20,
        select: {
          aspectRatio: true,
          title: true,
          bookUrl: true,
          imageUrl: true,
          status: true,
          id: true,
          updatedAt: true,
          userrated: true,
          totalStars: true,
          _count: { select: { chapter: true } },
        },
      });
    }
    await prisma.$disconnect();
    return { fData: bookData, pages: bookData.length === 0 ? 0 : pages };
  } catch (e) {
    return "Invalid Page";
  }
}

export async function fetchCompletedBook(page: number = 1) {
  const prisma = new PrismaClient();
  const pages = await prisma.book
    .findMany({
      where: { status: "Completed" },
      select: { id: true },
    })
    .then((data) => {
      return Math.ceil(data.length / 20);
    });
  const finalData: Array<{
    id: number;
    title: string;
    bookUrl: string;
    imageUrl: string;
    updatedAt: Date;
    totalStars: number;
    userrated: number;
    aspectRatio: Decimal;
    status: string;
    chapters: number;
  }> = [];
  let bookData: Array<{
    id: number;
    title: string;
    bookUrl: string;
    imageUrl: string;
    updatedAt: Date;
    totalStars: number;
    userrated: number;
    aspectRatio: Decimal;
    status: string;
  }> = [];
  try {
    if (page > 1) {
      const cursor = (
        await prisma.book.findMany({
          where: { status: "Completed" },
          orderBy: { ratings: "desc" },
          take: (page - 1) * 20,
          select: { id: true },
        })
      )[(page - 1) * 20 - 1].id;
      bookData = await prisma.book.findMany({
        where: { status: "Completed" },
        orderBy: { ratings: "desc" },
        skip: 1,
        cursor: { id: cursor },
        take: 20,
        select: {
          aspectRatio: true,
          title: true,
          bookUrl: true,
          imageUrl: true,
          status: true,
          id: true,
          updatedAt: true,
          userrated: true,
          totalStars: true,
        },
      });
    } else {
      bookData = await prisma.book.findMany({
        where: { status: "Completed" },
        orderBy: { ratings: "desc" },
        take: 20,
        select: {
          aspectRatio: true,
          title: true,
          bookUrl: true,
          imageUrl: true,
          status: true,
          id: true,
          updatedAt: true,
          userrated: true,
          totalStars: true,
        },
      });
    }

    if (bookData.length === 0) {
      await prisma.$disconnect();
      return { fData: finalData, pages: 0 };
    }
    bookData.forEach(async (book) => {
      const chs = await prisma.chapter.count({ where: { bookId: book.id } });
      finalData.push({ ...book, chapters: chs });
    });
    await prisma.$disconnect();
    return { fData: finalData, pages: pages };
  } catch (e) {
    return "Invalid Page";
  }
}

export async function fetchHotBook(page: number = 1) {
  const prisma = new PrismaClient();
  const pages = await prisma.book
    .findMany({
      where: { isHot: true },
      select: { id: true },
    })
    .then((data) => {
      return Math.ceil(data.length / 20);
    });

  const finalData: Array<{
    id: number;
    title: string;
    bookUrl: string;
    imageUrl: string;
    updatedAt: Date;
    totalStars: number;
    userrated: number;
    aspectRatio: Decimal;
    status: string;
    chapters: number;
  }> = [];
  let bookData: Array<{
    id: number;
    title: string;
    bookUrl: string;
    imageUrl: string;
    updatedAt: Date;
    totalStars: number;
    userrated: number;
    aspectRatio: Decimal;
    status: string;
  }> = [];
  try {
    if (page > 1) {
      const cursor = (
        await prisma.book.findMany({
          where: { isHot: true },
          orderBy: { id: "desc" },
          take: (page - 1) * 20,
          select: { id: true },
        })
      )[(page - 1) * 20 - 1].id;
      bookData = await prisma.book.findMany({
        where: { isHot: true },
        orderBy: { id: "desc" },
        skip: 1,
        cursor: { id: cursor },
        take: 20,
        select: {
          aspectRatio: true,
          title: true,
          bookUrl: true,
          imageUrl: true,
          status: true,
          id: true,
          updatedAt: true,
          userrated: true,
          totalStars: true,
        },
      });
    } else {
      bookData = await prisma.book.findMany({
        where: { isHot: true },
        orderBy: { id: "desc" },
        take: 20,
        select: {
          aspectRatio: true,
          title: true,
          bookUrl: true,
          imageUrl: true,
          status: true,
          id: true,
          updatedAt: true,
          userrated: true,
          totalStars: true,
        },
      });
    }
    if (bookData.length === 0) {
      await prisma.$disconnect();
      return { fData: finalData, pages: 0 };
    }
    bookData.forEach(async (book) => {
      const chs = await prisma.chapter.count({ where: { bookId: book.id } });
      finalData.push({ ...book, chapters: chs });
    });
    await prisma.$disconnect();
    return { fData: finalData, pages: pages };
  } catch (e) {
    return "Invalid Page";
  }
}

export async function fetchRecentUpdatesPage(page: number = 1) {
  const prisma = new PrismaClient();

  let updateData: Array<{
    url: string;
    title: string;
    addAt: Date;
    book: {
      title: string;
      imageUrl: string;
      bookUrl: string;
      aspectRatio: Decimal;
      author: { name: string };
    } | null;
  }> = [];
  try {
    if (page > 0 && page <= 5) {
      updateData = await prisma.chapter.findMany({
        distinct: ["bookId"],
        orderBy: { addAt: "desc" },
        take: 100,
        select: {
          title: true,
          url: true,
          addAt: true,
          book: {
            select: {
              title: true,
              imageUrl: true,
              aspectRatio: true,
              bookUrl: true,
              author: { select: { name: true } },
            },
          },
        },
      });
      updateData = updateData.splice(20 * (page - 1), 20);
      await prisma.$disconnect();
      return { data: updateData };
    } else {
      await prisma.$disconnect();
      return "Invalid Page";
    }
  } catch (e) {
    await prisma.$disconnect();
    return "Invalid Page";
  }
}

export async function fetchchapters(book: number, page: number = 1) {
  const prisma = new PrismaClient();
  let chapterData: Array<{
    number: number;
    url: string;
    title: string;
    addAt: Date;
  }> = [];
  if (page > 1) {
    const cursor = (
      await prisma.chapter.findMany({
        where: { bookId: book },
        orderBy: { number: "asc" },
        take: (page - 1) * 100,
        select: { id: true },
      })
    ).reverse()[0].id;
    chapterData = await prisma.chapter.findMany({
      where: { bookId: book },
      orderBy: { number: "asc" },
      skip: 1,
      take: 100,
      cursor: { id: cursor },
      select: { url: true, title: true, number: true, addAt: true },
    });
    await prisma.$disconnect();
    return chapterData;
  } else {
    chapterData = await prisma.chapter.findMany({
      where: { bookId: book },
      orderBy: { number: "asc" },
      take: 100,
      select: { url: true, title: true, number: true, addAt: true },
    });
    await prisma.$disconnect();
    return chapterData;
  }
}

export async function fetchBookDetails(name: string) {
  const prisma = new PrismaClient().$extends({
    result: {
      book: {
        Ratings: {
          needs: { userrated: true, totalStars: true },
          compute(book) {
            return book.totalStars / book.userrated;
          },
        },
      },
    },
  });
  try {
    const book = await prisma.book.findFirst({
      where: { bookUrl: name },
      select: {
        id: true,
        author: true,
        status: true,
        title: true,
        genre: { select: { name: true, route: true } },
        imageUrl: true,
        aspectRatio: true,
        updatedAt: true,
        views: true,
        Ratings: true,
        description: true,
        category: { select: { name: true, route: true } },
        _count: { select: { chapter: true } },
        chapter: {
          where: {
            OR: [
              {
                number: (await prisma.chapter.findFirst({
                  where: { book: { bookUrl: name } },
                  orderBy: { number: "asc" },
                  select: { number: true },
                }))!.number,
              },
              {
                number: (await prisma.chapter.findFirst({
                  where: { book: { bookUrl: name } },
                  orderBy: { number: "desc" },
                  select: { number: true },
                }))!.number,
              },
            ],
          },
          select: { url: true, title: true, addAt: true, number: true },
        },
        bookUrl: true,
      },
    });
    if (!book) {
      await prisma.$disconnect();
      return "Invalid Book";
    }
    await prisma.$disconnect();
    return book;
  } catch (err: unknown) {
    if (err instanceof TypeError) {
      const book = await prisma.book.findFirst({
        where: { bookUrl: name },
        select: {
          id: true,
          author: true,
          status: true,
          title: true,
          genre: { select: { name: true, route: true } },
          imageUrl: true,
          aspectRatio: true,
          updatedAt: true,
          views: true,
          Ratings: true,
          description: true,
          category: { select: { name: true, route: true } },
          _count: { select: { chapter: true } },
          bookUrl: true,
          chapter: {},
        },
      });
      await prisma.$disconnect();
      return book;
    }
    await prisma.$disconnect();
    return "Invalid Book";
  }
}

export async function fetchAllNovels(page: number = 1) {
  const prisma = new PrismaClient();
  const pages = await prisma.book
    .count({
      orderBy: { id: "asc", ratings: "desc" },
    })
    .then((data) => {
      return Math.ceil(data / 20);
    });
  let bookData: Array<{
    title: string;
    bookUrl: string;
    imageUrl: string;
    views: number;
    chapter: {
      number: number;
      url: string;
    }[];
    _count: {
      chapter: number;
    };
  }> = [];
  try {
    if (page > 1) {
      const cursor = (
        await prisma.book.findMany({
          orderBy: { id: "asc", ratings: "desc" },
          take: (page - 1) * 20,
          select: { id: true },
        })
      )[(page - 1) * 20 - 1].id;
      bookData = await prisma.book.findMany({
        orderBy: { id: "asc", ratings: "desc" },
        skip: 1,
        take: 20,
        cursor: { id: cursor },
        select: {
          title: true,
          bookUrl: true,
          imageUrl: true,
          views: true,
          chapter: {
            orderBy: { number: "desc" },
            take: 2,
            select: { url: true, number: true },
          },
          _count: { select: { chapter: true } },
        },
      });
      await prisma.$disconnect();
      return { data: bookData, pages: pages };
    } else {
      bookData = await prisma.book.findMany({
        orderBy: { id: "asc", ratings: "desc" },
        take: 20,
        select: {
          title: true,
          bookUrl: true,
          imageUrl: true,
          views: true,
          chapter: {
            orderBy: { number: "desc" },
            take: 2,
            select: { url: true, number: true },
          },
          _count: { select: { chapter: true } },
        },
      });
      await prisma.$disconnect();
      return { data: bookData, pages: pages };
    }
  } catch (e) {
    await prisma.$disconnect();
    return "Invalid Page";
  }
}

export async function newRating(stars: number, title: string) {
  const prisma = new PrismaClient();
  const ratingData = await prisma.book.findFirst({
    where: { title: title },
    select: { totalStars: true, userrated: true },
  });
  if (ratingData) {
    const { ratings } = await prisma.book.update({
      where: { title: title },
      data: {
        ratings: (ratingData?.totalStars + stars) / (ratingData?.userrated + 1),
        userrated: ratingData.userrated + 1,
        totalStars: ratingData.totalStars + stars,
      },
      select: { ratings: true },
    });
    await prisma.$disconnect();
    return ratings;
  }
  await prisma.$disconnect();
}

export async function fetchChaptersList(book: string) {
  const prisma = new PrismaClient();
  const chData = await prisma.book.findFirst({
    where: { bookUrl: book },
    select: {
      chapter: {
        select: { url: true, title: true, number: true },
        orderBy: { number: "asc" },
      },
    },
  });
  if (chData) {
    await prisma.$disconnect();
    return chData.chapter;
  }
}

export async function addView(url: string) {
  const prisma = new PrismaClient();
  await prisma.book.updateMany({
    where: { bookUrl: url },
    data: { views: { increment: 1 } },
  });
  await prisma.$disconnect();
}

export async function addChapterView(chapter: string, book: string) {
  const prisma = new PrismaClient();
  await prisma.chapter.updateMany({
    where: { book: { bookUrl: { contains: book } }, url: chapter },
    data: { views: { increment: 1 } },
  });
  await prisma.$disconnect();
}

export async function addAuthor(name: string) {
  const prisma = new PrismaClient();
  const author = await prisma.author.upsert({
    create: { name, route: name.replaceAll(" ", "-") },
    update: { name, route: name.replaceAll(" ", "-") },
    where: { name },
  });
  await prisma.$disconnect();
  return author.id;
}

export async function addBook(book: IncomingBook) {
  const categories = book.categories.map((category) => {
    return {
      where: { name: category },
      create: {
        name: category,
        route: category.toLowerCase().replaceAll(" ", "-"),
      },
    };
  });
  const encoder = new TextEncoder();
  const desc = encoder.encode(
    correctString(
      book.description.length > 1
        ? book.description.join("[hereisbreak]")
        : book.description[0]
    )
  );
  const genres = book.genre.map((e) => {
    return {
      where: { name: e },
      create: { name: e, route: e.toLowerCase().replaceAll(" ", "-") },
    };
  });
  const prisma = new PrismaClient();
  const createdBook = await prisma.book.upsert({
    create: {
      bookUrl: book.bookUrl,
      genre: { connectOrCreate: [...genres] },
      imageUrl: book.imageUrl,
      isHot: book.isHot,
      status: book.status,
      title: book.title,
      totalStars: book.totalStars,
      userrated: book.userrated,
      views: book.views,
      aspectRatio: book.aspectRatio,
      authorId: book.authId,
      description: desc,
      category: {
        connectOrCreate: [...categories],
      },
      ratings: book.totalStars / book.userrated,
    },
    update: { isHot: book.isHot },
    where: { bookUrl: book.bookUrl },
  });
  await prisma.$disconnect();
  return createdBook.id;
}

export async function checkChapter(
  book: string,
  chap: Array<{ ch: string; num: number }>
) {
  const prisma = new PrismaClient();
  const final: Array<{ ch: string; num: number }> = [];
  for (const element of chap) {
    const status = await prisma.chapter.findFirst({
      where: {
        book: { bookUrl: book },
        oldUrl: `${book}/${element.ch.split(`/${book}/`)[1]}`,
      },
      select: { id: true },
    });
    if (status === null) {
      final.push(element);
    }
  }
  await prisma.$disconnect();
  return final;
}

export async function addNewChapter(chapter: IncomingChapter) {
  const newUrl =
    chapter.url.split("-").length > 2
      ? chapter.url
      : titleToUrl(chapter.title.trim());

  const prisma = new PrismaClient();
  const count = (s: string) => (s.match(/\b\w+\b/g) || []).length;
  const bookId = (await prisma.book.findFirst({
    where: { bookUrl: chapter.bookUrl },
    select: { id: true },
  }))!.id;
  await prisma.$disconnect();
  return {
    newUrl,
    bookId,
    content: correctString(chapter.content.join("[hereisbreak]")),
  };
}

export async function fetchByCategory(
  name: string,
  toFetch: {
    aspectRatio: boolean;
    bookUrl: boolean;
    imageUrl: boolean;
    title: boolean;
    status: boolean;
    Ratings: boolean;
    updatedAt: boolean;
    _count: boolean;
  } = {
    aspectRatio: true,
    bookUrl: true,
    imageUrl: true,
    title: true,
    status: true,
    Ratings: true,
    updatedAt: true,
    _count: true,
  },
  page: number = 1
) {
  const prisma = new PrismaClient().$extends({
    result: {
      book: {
        Ratings: {
          needs: { userrated: true, totalStars: true },
          compute(book) {
            return book.totalStars / book.userrated;
          },
        },
      },
    },
  });
  const pages = await prisma.book.count({
    where: { category: { some: { route: name } } },
  });
  try {
    if (page > 1) {
      const cursor = (
        await prisma.book.findMany({
          where: { category: { some: { name } } },
          orderBy: { chapter: { _count: "desc" } },
          take: (page - 1) * 20,
          select: { id: true },
        })
      ).reverse()[0].id;
      const booksData = await prisma.book.findMany({
        where: { category: { some: { route: name } } },
        orderBy: { chapter: { _count: "desc" } },
        take: 20,
        skip: 1,
        cursor: { id: cursor },
        select: {
          aspectRatio: toFetch.aspectRatio,
          bookUrl: toFetch.bookUrl,
          imageUrl: toFetch.imageUrl,
          title: toFetch.title,
          status: toFetch.status,
          Ratings: toFetch.Ratings,
          updatedAt: toFetch.updatedAt,
          chapter: {
            orderBy: { addAt: "desc" },
            take: 1,
            select: { addAt: true },
          },
          _count: { select: { chapter: toFetch._count } },
        },
      });

      if (booksData.length === 0) {
        await prisma.$disconnect();
        return "Invalid Page";
      }
      await prisma.$disconnect();
      return { booksData, pages: Math.ceil(pages / 20) };
    } else {
      const booksData = await prisma.book.findMany({
        where: { category: { some: { route: name } } },
        orderBy: { chapter: { _count: "desc" } },
        take: 20,
        select: {
          aspectRatio: toFetch.aspectRatio,
          bookUrl: toFetch.bookUrl,
          imageUrl: toFetch.imageUrl,
          title: toFetch.title,
          status: toFetch.status,
          Ratings: toFetch.Ratings,
          updatedAt: toFetch.updatedAt,
          chapter: {
            orderBy: { addAt: "desc" },
            take: 1,
            select: { addAt: true },
          },
          _count: { select: { chapter: toFetch._count } },
        },
      });
      if (booksData.length === 0) {
        await prisma.$disconnect();
        return "Invalid Page";
      }
      await prisma.$disconnect();
      return { booksData, pages: Math.ceil(pages / 20) };
    }
  } catch (err) {
    await prisma.$disconnect();
    return "Invalid Page";
  }
}

export async function fetchAllCategories() {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany({
    select: { name: true, route: true },
    orderBy: { name: "asc" },
  });
  await prisma.$disconnect();
  return categories;
}

export async function fetchAllNovelsPage(page: number = 1) {
  const prisma = new PrismaClient();
  const pages = Math.ceil((await prisma.book.count({ where: {} })) / 20);
  try {
    if (page > 1) {
      const cursor = (
        await prisma.book.findMany({
          orderBy: { views: "desc" },
          take: (page - 1) * 20,
          select: { id: true },
        })
      )[(page - 1) * 20 - 1].id;
      const data = await prisma.book.findMany({
        orderBy: { views: "desc" },
        take: 20,
        cursor: { id: cursor },
        skip: 1,
        select: {
          imageUrl: true,
          title: true,
          aspectRatio: true,
          bookUrl: true,
          _count: { select: { chapter: true } },
          author: { select: { name: true } },
          status: true,
          userrated: true,
          totalStars: true,
          views: true,
        },
      });
      return { data, pages };
    } else {
      const data = await prisma.book.findMany({
        orderBy: { views: "desc" },
        take: 20,
        select: {
          imageUrl: true,
          title: true,
          aspectRatio: true,
          bookUrl: true,
          _count: { select: { chapter: true } },
          author: { select: { name: true } },
          status: true,
          userrated: true,
          totalStars: true,
          views: true,
        },
      });
      return { data, pages };
    }
  } catch (err) {
    return "Invalid Page";
  }
}

export async function fetchByAuthor(name: string) {
  name = decodeURI(name);
  const prisma = new PrismaClient();
  const result = await prisma.author.findFirst({
    where: { name },
    select: {
      book: {
        orderBy: { ratings: "desc" },
        select: {
          aspectRatio: true,
          bookUrl: true,
          imageUrl: true,
          title: true,
          status: true,
          totalStars: true,
          userrated: true,
          updatedAt: true,
          chapter: {
            orderBy: { number: "desc" },
            take: 1,
            select: { addAt: true },
          },
          _count: { select: { chapter: true } },
        },
      },
    },
  });
  if (!result) {
    await prisma.$disconnect();
    return "Invalid Author";
  }
  await prisma.$disconnect();
  return result;
}

export async function fetchAllBooks(host: string) {
  const prisma = new PrismaClient();
  return await prisma.book
    .findMany({
      select: {
        bookUrl: true,
        imageUrl: true,
        updatedAt: true,
        chapter: {
          orderBy: { number: "desc" },
          select: { addAt: true },
          take: 1,
        },
      },
    })
    .then(async (books) => {
      await prisma.$disconnect();
      return books.map((book) => {
        return {
          url: `https://${host}/book/${book.bookUrl}`,
          lastModified: new Date(
            book.chapter.length > 0
              ? book.chapter[0].addAt.getTime()
              : book.updatedAt
          ),
          changeFrequency: "weekly",
          priority: 0.8,
          images: [book.imageUrl],
        };
      });
    });
}

export async function fetchGenreSitemap(host: string) {
  const prisma = new PrismaClient();
  const sitemapData: {
    url: string;
    lastModified: string;
    changeFrequency: string;
    priority: number;
    images: string[];
  }[] = [];
  for (const element of ALL_GENRE) {
    const imageArr = await prisma.book
      .findMany({
        where: { genre: { some: { route: element.route } } },
        select: { imageUrl: true },
      })
      .then((res) => res.map((u) => u.imageUrl));
    sitemapData.push({
      url: `https://${host}/genre/${element.route}`,
      lastModified: `2025-01-06`,
      changeFrequency: "weekly",
      priority: 0.6,
      images: imageArr,
    });
  }
  await prisma.$disconnect();
  return sitemapData;
}

export async function fetchCategorySitemap(host: string) {
  const prisma = new PrismaClient();
  const categories = await prisma.category
    .findMany({ select: { name: true } })
    .then((res) => res.map((c) => c.name));
  const sitemapData: {
    url: string;
    lastModified: string;
    changeFrequency: string;
    priority: number;
    images: string[];
  }[] = [];
  categories.forEach(async (category) => {
    const imgArr = await prisma.category
      .findFirst({
        where: { name: category },
        select: { book: { select: { imageUrl: true } } },
      })
      .then((res) => res!.book.map((b) => b.imageUrl));
    sitemapData.push({
      url: `https://${host}/categories/${category}`,
      lastModified: `2025-01-06`,
      changeFrequency: "weekly",
      priority: 0.5,
      images: imgArr,
    });
  });
  await prisma.$disconnect();
  return sitemapData;
}

export async function fetchBookOg(book: string) {
  const prisma = new PrismaClient();
  return await prisma.book
    .findFirst({
      where: { bookUrl: book },
      select: { imageUrl: true, title: true, aspectRatio: true },
    })
    .then(async (res) => {
      await prisma.$disconnect();
      return res;
    });
}

export async function fetchRandomBooks() {
  const prisma = new PrismaClient();
  const count = await prisma.book.count();
  const randomIndex: number[] = [];
  for (let i = 0; i < 5; i++) {
    randomIndex.push(Math.floor(Math.random() * count) + 1);
  }
  return await prisma.book
    .findMany({
      where: { id: { in: randomIndex } },
      select: { bookUrl: true, id: true, title: true },
    })
    .then(async (books) => {
      await prisma.$disconnect();
      return books;
    });
}

export async function fetchRandomCategories() {
  const prisma = new PrismaClient();
  const count = await prisma.category.count();
  const randomIndex: number[] = [];
  while (randomIndex.length < 5) {
    const random = Math.floor(Math.random() * count) + 1;
    if (!randomIndex.includes(random)) {
      randomIndex.push(random);
    }
  }
  return await prisma.category
    .findMany({
      where: { id: { in: randomIndex } },
      select: { name: true, id: true },
    })
    .then(async (categories) => {
      await prisma.$disconnect();
      return categories;
    });
}

export async function fetchRandomGenres() {
  const randomIndex: number[] = [];
  while (randomIndex.length < 5) {
    const random = Math.floor(Math.random() * ALL_GENRE.length);
    if (!randomIndex.includes(random)) {
      randomIndex.push(random);
    }
  }
  return ALL_GENRE.filter((x, i) => randomIndex.includes(i));
}

export async function fetchRandomAuthors() {
  const prisma = new PrismaClient();
  const count = await prisma.author.count();
  const randomIndex: number[] = [];
  while (randomIndex.length < 5) {
    const random = Math.floor(Math.random() * count) + 1;
    if (!randomIndex.includes(random)) {
      randomIndex.push(random);
    }
  }
  return await prisma.author
    .findMany({
      where: { id: { in: randomIndex } },
      select: { name: true, id: true },
    })
    .then(async (authors) => {
      await prisma.$disconnect();
      return authors;
    });
}

export async function checkBook(book: { url: string; isHot: boolean }) {
  const prisma = new PrismaClient();
  try {
    return await prisma.book
      .update({
        where: { bookUrl: book.url },
        data: { isHot: book.isHot },
        select: { id: true },
      })
      .then(async (data) => {
        await prisma.$disconnect();
        if (data.id) {
          return { status: false, id: data.id };
        }
      });
  } catch (err) {
    await prisma.$disconnect();
    return { status: true };
  }
}

export async function fetchCategoryFromRoute(route: string) {
  const prisma = new PrismaClient();
  const r = (await prisma.category.findFirst({
    where: { route },
    select: { name: true },
  }))!.name;
  await prisma.$disconnect();
  return r;
}
