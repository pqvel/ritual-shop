/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
  images: {
    // domains: [process.env.SERVER_URL],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
