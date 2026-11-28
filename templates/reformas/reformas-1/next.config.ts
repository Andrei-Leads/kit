import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@andrei-leads/core"],
  images: {
    formats: ["image/webp"],
    // 60: foto «antes» encima del «después» (encargo §8, riesgo 1).
    qualities: [60, 85],
  },

  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
