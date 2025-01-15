import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Novel Zone",
    short_name: "NZ",
    description:
      "Your stop to read novels at single stop. Read light novel, web novel, korean novel and chinese novel online for free. You can find hundreds of english translated light novel, web novel, korean novel and chinese novel which are daily updated! Read novels online, read light novel online, read online free, free light novel online. ",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
