import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/fonts/"],
      },
      {
        userAgent: ["Bingbot", "bingbot", "AmazonBot"],
        crawlDelay: 20,
      },
      { userAgent: ["SemrushBot"], disallow: "/" },
    ],
    sitemap: "https://novelzone.fun/sitemap.xml",
  };
}
