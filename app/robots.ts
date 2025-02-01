import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/fonts/"],
    },
    sitemap: "https://novelzone.fun/sitemap.xml",
  };
}
