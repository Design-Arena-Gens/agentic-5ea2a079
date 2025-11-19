/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["react", "react-dom"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "piped.video" },
      { protocol: "https", hostname: "pipedapi.kavin.rocks" },
    ],
  },
};

export default nextConfig;

