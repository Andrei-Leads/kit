import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@andrei-leads/core"],
  images: {
    formats: ["image/webp"],
    qualities: [85],
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
