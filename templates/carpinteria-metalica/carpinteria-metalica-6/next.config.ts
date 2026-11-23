import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  transpilePackages: ["@andrei-leads/core"],
  images: {
    formats: ["image/avif", "image/webp"],
    // 60: la foto «antes» del deslizador (queda tapada a medias); 75: el resto.
    qualities: [60, 75],
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
