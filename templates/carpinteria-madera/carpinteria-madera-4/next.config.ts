import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@andrei-leads/core"],
  images: {
    formats: ["image/webp"],
    // Una sola calidad para todas las fotos (collage, rejilla, fichas y miniaturas).
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
