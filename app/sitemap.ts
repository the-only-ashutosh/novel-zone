import {
  fetchAllBooks,
  fetchCategorySitemap,
  fetchGenreSitemap,
} from "@/service/dataoperation";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = "novelzone.fun";
  const pages: MetadataRoute.Sitemap = [];
  pages.push(...(await fetchGenreSitemap(host)));
  pages.push(...(await fetchCategorySitemap(host)));
  pages.push(...(await fetchAllBooks(host)));
  return [...pages];
}
