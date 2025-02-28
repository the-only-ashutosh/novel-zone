/* eslint-disable @typescript-eslint/no-unused-vars */
import "server-only";
import { prisma } from "./client";
import { ALL_GENRE } from "./genre";
import { PrismaClient } from "@prisma/client";
import { cache } from "react";

export async function getBookTitles() {
  return await prisma.book
    .findMany({
      orderBy: { views: "desc" },
      take: 50,
      select: { title: true },
    })
    .then((data) => {
      return data.map((b) => b.title);
    });
}

export const fetchMostPopular = async () => {
  return await prisma.book.findMany({
    orderBy: [{ views: "desc" }, { ratings: "desc" }],
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
  const data = await prisma.recents.findMany({
    orderBy: { addAt: "desc" },
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
  return data;
}

export const fetchChapter = async (book_name: string, chapter: string) => {
  try {
    return await prisma.chapter
      .findFirst({
        where: { book: { bookUrl: book_name }, url: { contains: chapter } },
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
          const decoder = new TextDecoder();
          return {
            ...chapter,
            content: decoder.decode(chapter.content),
            prevChapter: prevChapter ? prevChapter.url : null,
            nextChapter: nextChapter ? nextChapter.url : null,
          };
        }
      });
  } catch (error) {
    return "Invalid Chapter";
  }
};

export async function searchBook(toSearch: string) {
  console.log(toSearch);
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

  if (bookData.length === 0) {
    return "No Books";
  }
  return bookData;
}

export async function fetchByGenre(genre: string, page: number = 1) {
  const pages = await prisma.book.count({
    where: { genre: { some: { route: { contains: genre } } } },
  });
  try {
    const data = await prisma.book.findMany({
      where: { genre: { some: { route: { contains: genre } } } },
      orderBy: [{ updatedAt: "desc" }, { ratings: "desc" }, { views: "desc" }],
      skip: (page - 1) * 20,
      take: 20,
      select: {
        aspectRatio: true,
        title: true,
        bookUrl: true,
        imageUrl: true,
        status: true,
        updatedAt: true,
        userrated: true,
        totalStars: true,
        _count: { select: { chapter: true } },
      },
    });
    if (data.length === 0) {
      return "Invalid Page";
    }
    return { data, pages: Math.ceil(pages / 20) };
  } catch (e) {
    return "Invalid Page";
  }
}

export async function fetchMostPopularBooks(page: number = 1) {
  const pages = await prisma.book.count({
    where: { ratings: { gt: -1 } },
  });
  try {
    const data = await prisma.book.findMany({
      where: { ratings: { gt: -1 } },
      orderBy: [{ userrated: "desc" }, { ratings: "desc" }],
      skip: (page - 1) * 20,
      take: 20,
      select: {
        aspectRatio: true,
        title: true,
        bookUrl: true,
        imageUrl: true,
        status: true,
        updatedAt: true,
        userrated: true,
        totalStars: true,
        _count: { select: { chapter: true } },
      },
    });
    if (data.length === 0) {
      return "Invalid Page";
    }
    return { data, pages: Math.ceil(pages / 20) };
  } catch (e) {
    return "Invalid Page";
  }
}

export async function fetchCompletedBook(page: number = 1) {
  const pages = await prisma.book.count({
    where: { status: { contains: "Completed" } },
  });
  try {
    const data = await prisma.book.findMany({
      where: { status: { contains: "Completed" } },
      orderBy: [{ views: "desc" }],
      skip: (page - 1) * 20,
      take: 20,
      select: {
        aspectRatio: true,
        title: true,
        bookUrl: true,
        imageUrl: true,
        status: true,
        updatedAt: true,
        userrated: true,
        totalStars: true,
        _count: { select: { chapter: true } },
      },
    });
    if (data.length === 0) {
      return "Invalid Page";
    }
    return { data, pages: Math.ceil(pages / 20) };
  } catch (e) {
    return "Invalid Page";
  }
}

export async function fetchOngoingBook(page: number = 1) {
  const pages = await prisma.book.count({
    where: { status: { contains: "Ongoing" } },
  });
  try {
    const data = await prisma.book.findMany({
      where: { status: { contains: "Ongoing" } },
      orderBy: [{ views: "desc" }, { updatedAt: "desc" }],
      skip: (page - 1) * 20,
      take: 20,
      select: {
        aspectRatio: true,
        title: true,
        bookUrl: true,
        imageUrl: true,
        status: true,
        updatedAt: true,
        userrated: true,
        totalStars: true,
        _count: { select: { chapter: true } },
      },
    });
    if (data.length === 0) {
      return "Invalid Page";
    }
    return { data, pages: Math.ceil(pages / 20) };
  } catch (e) {
    return "Invalid Page";
  }
}

export async function fetchHotBook(page: number = 1) {
  const pages = await prisma.book.count({
    where: { status: { contains: "Completed" } },
  });
  try {
    const data = await prisma.book.findMany({
      where: { isHot: true },
      orderBy: [{ updatedAt: "desc" }, { views: "desc" }, { ratings: "desc" }],
      skip: (page - 1) * 20,
      take: 20,
      select: {
        aspectRatio: true,
        title: true,
        bookUrl: true,
        imageUrl: true,
        status: true,
        updatedAt: true,
        userrated: true,
        totalStars: true,
        _count: { select: { chapter: true } },
      },
    });
    if (data.length === 0) {
      return "Invalid Page";
    }
    return { data, pages: Math.ceil(pages / 20) };
  } catch (e) {
    return "Invalid Page";
  }
}

export async function fetchRecentUpdatesPage(page: number = 1) {
  try {
    const p = await prisma.recents.count();
    const data = await prisma.recents.findMany({
      orderBy: { addAt: "desc" },
      skip: (page - 1) * 20,
      take: 20,
      select: {
        addAt: true,
        title: true,
        url: true,
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
    if (data.length === 0) {
      return "Invalid Page";
    }
    return { data, pages: Math.ceil(p / 20) };
  } catch (err) {
    return "Invalid Page";
  }
}

export async function fetchchapters(book: number, page: number = 1) {
  let chapterData: Array<{
    number: number;
    url: string;
    title: string;
    addAt: Date;
    likes: number;
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
      select: {
        url: true,
        title: true,
        number: true,
        addAt: true,
        likes: true,
      },
    });

    return chapterData;
  } else {
    chapterData = await prisma.chapter.findMany({
      where: { bookId: book },
      orderBy: { number: "asc" },
      take: 100,
      select: {
        url: true,
        title: true,
        number: true,
        addAt: true,
        likes: true,
      },
    });

    return chapterData;
  }
}

export async function fetchBookDetails(name: string) {
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
        ratings: true,
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
      return "Invalid Book";
    }

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
          ratings: true,
          description: true,
          category: { select: { name: true, route: true } },
          _count: { select: { chapter: true } },
          bookUrl: true,
          chapter: {},
        },
      });

      return book;
    }

    return "Invalid Book";
  }
}

export async function newRating(stars: number, title: string) {
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

    return ratings;
  }
}

export const fetchChaptersList = cache(async (book: string) => {
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
    return chData.chapter;
  }
});

export async function addView(url: string) {
  await prisma.book.update({
    where: { bookUrl: url },
    data: { views: { increment: 1 } },
  });
}

export async function addChapterView(chapter: string, book: string) {
  const chapId = (await prisma.chapter.findFirst({
    where: { book: { bookUrl: { contains: book } }, url: chapter },
    select: { id: true },
  }))!.id;
  await prisma.chapter.update({
    where: { id: chapId },
    data: { views: { increment: 1 } },
  });
}

export async function deleteBook(url: string) {
  await prisma.book.delete({ where: { bookUrl: url } });
}

export async function fetchByCategory(name: string, page: number = 1) {
  try {
    const pages = await prisma.book.count({
      where: { category: { some: { route: name } } },
    });
    return await prisma.book
      .findMany({
        where: { category: { some: { route: name } } },
        orderBy: [
          { updatedAt: "desc" },
          { ratings: "desc" },
          { views: "desc" },
        ],
        skip: (page - 1) * 20,
        take: 20,
        select: {
          aspectRatio: true,
          title: true,
          bookUrl: true,
          imageUrl: true,
          status: true,
          updatedAt: true,
          userrated: true,
          totalStars: true,
          _count: { select: { chapter: true } },
        },
      })
      .then((data) => {
        if (data.length === 0) {
          return "Invalid Page";
        }
        return { data, pages: Math.ceil(pages / 20) };
      });
  } catch (err) {
    return "Invalid Page";
  }
}

export async function fetchAllCategories() {
  const categories = await prisma.category.findMany({
    select: { name: true, route: true },
    orderBy: { name: "asc" },
  });

  return categories;
}

export async function fetchAllNovelsPage(page: number = 1) {
  try {
    const pages = await prisma.book.count({
      where: {},
    });
    return await prisma.book
      .findMany({
        where: {},
        orderBy: [
          { updatedAt: "desc" },
          { ratings: "desc" },
          { views: "desc" },
        ],
        skip: (page - 1) * 20,
        take: 20,
        select: {
          aspectRatio: true,
          title: true,
          bookUrl: true,
          imageUrl: true,
          status: true,
          updatedAt: true,
          userrated: true,
          totalStars: true,
          _count: { select: { chapter: true } },
        },
      })
      .then((data) => {
        if (data.length === 0) {
          return "Invalid Page";
        }
        return { data, pages: Math.ceil(pages / 20) };
      });
  } catch (err) {
    return "Invalid Page";
  }
}

export async function fetchByStatus(status: string, page: number = 1) {
  try {
    const pages = await prisma.book.count({
      where: { status: { contains: status } },
    });
    const data = await prisma.book.findMany({
      where: { status: { contains: status } },
      skip: (page - 1) * 20,
      take: 20,
      select: {
        aspectRatio: true,
        title: true,
        bookUrl: true,
        imageUrl: true,
        status: true,
        updatedAt: true,
        userrated: true,
        totalStars: true,
        _count: { select: { chapter: true } },
      },
    });
    if (data.length === 0) {
      return "Invalid Page";
    }
    return { data, pages: Math.ceil(pages / 20) };
  } catch (err) {
    return "Invalid Page";
  }
}

export async function fetchByAuthor(name: string) {
  name = decodeURI(name);
  try {
    const data = await prisma.author.findFirst({
      where: { name },
      select: {
        book: {
          select: {
            aspectRatio: true,
            title: true,
            bookUrl: true,
            imageUrl: true,
            status: true,
            updatedAt: true,
            userrated: true,
            totalStars: true,
            _count: { select: { chapter: true } },
          },
        },
      },
    });
    if (!data) {
      return "Invalid Page";
    }
    return { data: data.book, pages: 0 };
  } catch (err) {
    return "Invalid Page";
  }
}

export async function totalChapters() {
  const pri = new PrismaClient();
  const count = Math.ceil((await pri.chapter.count()) / 50000);
  await pri.$disconnect();
  return count;
}

export async function getChapterUrl(start: number, end: number) {
  const pri = new PrismaClient();
  const data = await pri.chapter.findMany({
    where: { id: { gt: start, lte: end } },
    select: { url: true, addAt: true, book: { select: { bookUrl: true } } },
  });
  await pri.$disconnect();
  return data;
}

export async function fetchAllBooks() {
  const pri = new PrismaClient();
  const books = await pri.book.findMany({
    select: {
      bookUrl: true,
      updatedAt: true,
    },
  });
  await pri.$disconnect();
  return books;
}

export async function fetchGenreSitemap() {
  const pri = new PrismaClient();
  const genres = await pri.genre
    .findMany({ select: { route: true } })
    .then((res) => res.map((c) => c.route));
  await pri.$disconnect();
  return genres;
}

export async function fetchCategorySitemap() {
  const pri = new PrismaClient();
  const categories = await pri.category
    .findMany({ select: { route: true } })
    .then((res) => res.map((c) => c.route));
  await pri.$disconnect();
  return categories;
}

export async function fetchAllAuthors() {
  const pri = new PrismaClient();
  const authors = await pri.author
    .findMany({ select: { route: true } })
    .then((res) => res.map((c) => c.route));
  await pri.$disconnect();
  return authors;
}

export async function fetchBookOg(book: string) {
  return await prisma.book
    .findFirst({
      where: { bookUrl: book },
      select: { imageUrl: true, title: true, aspectRatio: true },
    })
    .then(async (res) => {
      return res;
    });
}

export const fetchRandomBooks = cache(async () => {
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
      return books;
    });
});

export const fetchRandomCategories = cache(async () => {
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
      select: { name: true, id: true, route: true },
    })
    .then(async (categories) => {
      return categories;
    });
});

export const fetchRandomGenres = cache(async () => {
  const randomIndex: number[] = [];
  while (randomIndex.length < 5) {
    const random = Math.floor(Math.random() * ALL_GENRE.length);
    if (!randomIndex.includes(random)) {
      randomIndex.push(random);
    }
  }
  return ALL_GENRE.filter((x, i) => randomIndex.includes(i));
});

export async function fetchRandomAuthors() {
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
      select: { name: true, id: true, route: true },
    })
    .then(async (authors) => {
      return authors;
    });
}

export async function checkBook(book: { url: string; isHot: boolean }) {
  try {
    return await prisma.book
      .update({
        where: { bookUrl: book.url },
        data: { isHot: book.isHot },
        select: { id: true },
      })
      .then(async (data) => {
        if (data.id) {
          return { status: false, id: data.id };
        }
      });
  } catch (err) {
    return { status: true };
  }
}

export async function fetchCategoryFromRoute(route: string) {
  try {
    const r = (
      await prisma.category.findMany({
        where: { route },
        select: { name: true },
      })
    )[0].name;

    return r;
  } catch (error) {
    return "";
  }
}

export async function fetchMatchingBooks(name: string) {
  try {
    const genres = await prisma.genre.findMany({
      where: { book: { some: { bookUrl: name } } },
      select: { name: true },
    });
    const random = genres[Math.floor(Math.random() * genres.length)].name;
    const data = await prisma.book.findMany({
      orderBy: [{ ratings: "desc" }, { views: "desc" }],
      where: { genre: { some: { name: random } }, bookUrl: { not: name } },
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
    return { data, random };
  } catch (err) {
    return "Invalid Book";
  }
}

export async function deleteChapters() {
  await prisma.chapter.deleteMany({ where: { title: "None" } });
}

export async function fetchChapterUrl(start: number = 1) {
  return await prisma.book
    .findMany({
      orderBy: { id: "asc" },
      skip: (start - 1) * 10,
      take: 10,
      select: { bookUrl: true },
    })
    .then((data) => {
      return data.map((single) => {
        return `https://novelzone.fun/book/${single.bookUrl}`;
      });
    });
}

export async function getTotalChapter(book: string) {
  try {
    return await prisma.book
      .findFirst({
        where: { bookUrl: book },
        select: { _count: { select: { chapter: true } } },
      })
      .then((data) => data!._count.chapter);
  } catch (error) {
    return 0;
  }
}

export async function chapterLiked(book: string, num: number) {
  const id = (await prisma.chapter.findFirst({
    where: { book: { bookUrl: book }, number: num },
    select: { id: true },
  }))!.id;
  return await prisma.chapter
    .update({
      where: { id },
      data: { likes: { increment: 1 } },
      select: { id: true },
    })
    .then((data) => "Success")
    .catch((err) => "Failed");
}
