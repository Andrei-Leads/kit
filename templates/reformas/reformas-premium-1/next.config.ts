import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@andrei-leads/core"],
  images: {
    formats: ["image/webp"],
    // 60 para las fotos del pano (encargo §8); 75, el valor por defecto.
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
