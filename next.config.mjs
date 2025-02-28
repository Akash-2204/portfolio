/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/portfolio", // ✅ Set GitHub Pages subdirectory
  assetPrefix: "/portfolio",
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