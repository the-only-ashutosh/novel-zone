import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["nextui.org", "idoxbjg.sufydely.com"],
  },
  compiler: {
    removeConsole: true,
  },
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    ppr: "incremental",
    optimizePackageImports: [
      "@nextui-org/react",
      "@emotion/react",
      "@emotion/styled",
    ],
  },
};

export default nextConfig;
