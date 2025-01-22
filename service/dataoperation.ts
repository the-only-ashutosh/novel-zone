/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Chapter, IncomingBook, IncomingChapter } from "@/types";
import prisma from "./client";
import { correctString, titleToUrl } from "./functions";
import { ALL_GENRE } from "./genre";
import "server-only";
import { PrismaClient } from "@prisma/client";

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
  const pri = new PrismaClient();
  const data = await pri.recents.findMany({
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
  await pri.$disconnect();
  return data;
}

export const fetchChapter = async (book_name: string, chapter: string) => {
  try {
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

          return {
            ...chapter,
            content: String.fromCharCode(...chapter.content),
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
    where: { genre: { some: { route: genre } } },
  });
  try {
    const data = await prisma.book.findMany({
      where: { genre: { some: { route: genre } } },
      orderBy: { id: "desc" },
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
      orderBy: { id: "desc" },
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
  const pri = new PrismaClient();
  try {
    const p = await pri.recents.count();
    const data = await pri.recents.findMany({
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
      await pri.$disconnect();
      return "Invalid Page";
    }
    await pri.$disconnect();
    return { data, pages: Math.ceil(p / 20) };
  } catch (err) {
    await pri.$disconnect();
    return "Invalid Page";
  }
}

export async function fetchchapters(book: number, page: number = 1) {
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

    return chapterData;
  } else {
    chapterData = await prisma.chapter.findMany({
      where: { bookId: book },
      orderBy: { number: "asc" },
      take: 100,
      select: { url: true, title: true, number: true, addAt: true },
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
          Ratings: true,
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

export async function fetchChaptersList(book: string) {
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
}

export async function addView(url: string) {
  await prisma.book.updateMany({
    where: { bookUrl: url },
    data: { views: { increment: 1 } },
  });
}

export async function addChapterView(chapter: string, book: string) {
  await prisma.chapter.updateMany({
    where: { book: { bookUrl: { contains: book } }, url: chapter },
    data: { views: { increment: 1 } },
  });
}

export async function addAuthor(name: string) {
  const author = await prisma.author.upsert({
    create: { name, route: name.replaceAll(" ", "-") },
    update: { name, route: name.replaceAll(" ", "-") },
    where: { name },
  });

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

  return createdBook.id;
}

export async function checkChapter(
  book: string,
  chap: Array<{ ch: string; num: number; bookId: number }>
) {
  const final: Array<{ ch: string; num: number }> = [];
  for (const element of chap) {
    const status = await prisma.chapter.findFirst({
      where: {
        book: { bookUrl: book },
        number: element.num,
      },
      select: { id: true },
    });
    if (status === null) {
      final.push(element);
    }
  }
  return final;
}

export async function addSingleChapter(ch: Chapter) {
  const pri = new PrismaClient();
  const encoder = new TextEncoder();
  const newUrl =
    ch.url.split("-").length > 2 ? ch.url : titleToUrl(ch.title.trim());
  const id = (
    await pri.chapter.create({
      data: {
        ...ch,
        content: encoder.encode(
          correctString(ch.content.join("[hereisbreak]"))
        ),
        url: newUrl,
      },
      select: { id: true },
    })
  ).id;
  await pri.recents.upsert({
    where: { bookId: ch.bookId },
    create: {
      title: ch.title,
      url: ch.url,
      bookId: ch.bookId,
    },
    update: { title: ch.title, url: ch.url },
  });
  await pri.$disconnect();
  return { id };
}

export async function addChapters(chapters: Chapter[]) {
  const count = (s: string) => (s.match(/\b\w+\b/g) || []).length;
  const pri = new PrismaClient();
  const encoder = new TextEncoder();
  for (const chapter of chapters) {
    const newUrl =
      chapter.url.split("-").length > 2
        ? chapter.url
        : titleToUrl(chapter.title.trim());
    await pri.chapter.create({
      data: {
        ...chapter,
        content: encoder.encode(
          correctString(chapter.content.join("[hereisbreak]"))
        ),
        url: newUrl,
      },
      select: { id: true },
    });

    if (chapters.indexOf(chapter) === chapters.length - 1) {
      await pri.recents.upsert({
        where: { bookId: chapter.bookId },
        create: {
          title: chapter.title,
          url: chapter.url,
          bookId: chapter.bookId,
        },
        update: { title: chapter.title, url: chapter.url },
      });
    }
  }
  await pri.$disconnect();
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
        orderBy: [{ id: "desc" }, { chapter: { _count: "desc" } }],
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
        orderBy: [{ userrated: "desc" }, { chapter: { _count: "desc" } }],
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

export async function fetchAllBooks(host: string) {
  const pri = new PrismaClient();
  const data = [];
  const books = await pri.book.findMany({
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
  });
  for (const book of books) {
    await pri.$disconnect();
    data.push({
      url: `https://${host}/book/${book.bookUrl}`,
      lastModified: new Date(
        book.chapter.length > 0
          ? book.chapter[0].addAt.getTime()
          : book.updatedAt
      ),
      changeFrequency: "weekly",
      priority: 0.8,
      images: [book.imageUrl],
    });
  }
  return data;
}

export async function fetchGenreSitemap(host: string) {
  const sitemapData: {
    url: string;
    lastModified: string;
    changeFrequency: string;
    priority: number;
    images: string[];
  }[] = [];
  const pri = new PrismaClient();
  for (const element of ALL_GENRE) {
    const imageArr = await pri.book
      .findMany({
        where: { genre: { some: { route: element.route } } },
        select: { imageUrl: true },
      })
      .then((res) => res.map((u) => u.imageUrl));
    sitemapData.push({
      url: `https://${host}/genre/${element.route}`,
      lastModified: Date.now().toLocaleString(),
      changeFrequency: "weekly",
      priority: 0.6,
      images: imageArr,
    });
  }
  await pri.$disconnect();
  return sitemapData;
}

export async function fetchCategorySitemap(host: string) {
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
  const pri = new PrismaClient();
  categories.forEach(async (category) => {
    const imgArr = await pri.category
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
  await pri.$disconnect();
  return sitemapData;
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

export async function fetchRandomBooks() {
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
}

export async function fetchRandomCategories() {
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
  const r = (await prisma.category.findFirst({
    where: { route },
    select: { name: true },
  }))!.name;

  return r;
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
