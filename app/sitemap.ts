import {
  fetchAllAuthors,
  fetchAllBooks,
  fetchCategorySitemap,
  fetchGenreSitemap,
} from "@/service/dataoperation";
import type { MetadataRoute } from "next";
const host = "https://novelzone.fun";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = [];
  const b = fetchAllBooks();
  const g = fetchGenreSitemap();
  const c = fetchCategorySitemap();
  const a = fetchAllAuthors();
  const [authors, books, categories, genres] = await Promise.all([a, b, c, g]);
  for (const author of authors) {
    pages.push({
      url: `${host}/author/${encodeURIComponent(author)}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }
  for (const book of books) {
    pages.push({
      url: `${host}/book/${encodeURIComponent(book.bookUrl)}`,
      lastModified: book.updatedAt,
      changeFrequency: "daily",
      priority: 0.9,
    });
  }
  for (const category of categories) {
    pages.push({
      url: `${host}/filter/categories/${encodeURIComponent(category)}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }
  for (const genre of genres) {
    pages.push({
      url: `${host}/filter/genre/${encodeURIComponent(genre)}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }
  return [...pages];
}
