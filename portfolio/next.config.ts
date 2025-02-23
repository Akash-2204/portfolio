import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
    ],
    domains: ["images.unsplash.com","img.icons8.com"],

  },
};

export default nextConfig;
