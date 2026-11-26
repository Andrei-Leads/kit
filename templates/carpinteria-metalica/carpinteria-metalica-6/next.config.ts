import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  transpilePackages: ["@andrei-leads/core"],
  images: {
    formats: ["image/webp"],
    // 60: la foto «antes» del deslizador (queda tapada a medias); 85: el resto (solo WebP: el AVIF a 75 emborronaba las fotos).
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
