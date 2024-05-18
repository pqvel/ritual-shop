/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        hostname: "io.activecloud.com",
        protocol: "https",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
