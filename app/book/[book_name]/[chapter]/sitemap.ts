import { getChapterUrl, totalChapters } from "@/service/dataoperation";
import type { MetadataRoute } from "next";
const url = "https://novelzone.fun";

export async function generateSitemaps() {
  const pages = [];
  for (let i = 0; i < (await totalChapters()); i++) {
    pages.push({ id: i });
  }
  return pages;
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const start = id * 50000;
  const end = start + 50000;
  const chapters = await getChapterUrl(start, end);
  return chapters.map((chapter) => ({
    url: `${url}/book/${chapter.book.bookUrl}/${chapter.url}`,
    lastModified: chapter.addAt,
  }));
}
