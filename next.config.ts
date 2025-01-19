import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  images: {
    domains: ["idoxbjg.sufydely.com"],
  },
  compiler: {
    removeConsole: true,
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
