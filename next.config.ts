import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mc.yandex.ru",
      },
      {
        protocol: "https",
        hostname: "image.novelzone.fun",
        pathname: "/nz/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  compiler: {
    // removeConsole: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async redirects() {
    return [
      {
        source: "/ads.txt",
        destination:
          "https://adstxt.pubfuture.com/site/6794df25cc853e7a46071f78/novelzone.fun/ads.txt",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    ppr: "incremental",
    optimizePackageImports: [
      "@heroui/react",
      "@emotion/react",
      "@emotion/styled",
    ],
  },
  crossOrigin: "anonymous",
};

export default nextConfig;
