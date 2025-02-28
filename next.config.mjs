/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
    ],
    domains: ["images.unsplash.com", "img.icons8.com"],
  },
};

export default nextConfig;
