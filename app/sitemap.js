import {
  fetchAllBooks,
  fetchCategorySitemap,
  fetchGenreSitemap,
} from "@/service/dataoperation";

export default async function sitemap() {
  const host = "novel-zone.vercel.app";
  const pages = [];
  pages.push(...(await fetchGenreSitemap(host)));
  pages.push(...(await fetchCategorySitemap(host)));
  pages.push(...(await fetchAllBooks(host)));
  return [...pages];
}
