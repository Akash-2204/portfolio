/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === "production" ? "/portfolio" : "", // ✅ Set GitHub Pages subdirectory
  assetPrefix: process.env.NODE_ENV === "production" ? "/portfolio" : "",
  images: {
    unoptimized: true, // ✅ Disable Next.js image optimization for GitHub Pages
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
    ],
    domains: ["images.unsplash.com", "img.icons8.com"],
  },
  experimental: {
    turbo: false, // Disable Turbopack
  },
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;