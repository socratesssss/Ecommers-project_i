import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend-for-project-i.onrender.com',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
    ],
    // Optional: Add these for better control
    minimumCacheTTL: 60, // 60 seconds cache
    formats: ['image/webp'], // Auto-convert to webp
  },
  // Other Next.js config options can go here
};

export default nextConfig;