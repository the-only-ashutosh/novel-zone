import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  images: {
    domains: ["idoxbjg.sufydely.com", "img.novelzone.fun"],
  },
  compiler: {
    removeConsole: true,
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
};

const withBA = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBA(nextConfig);
