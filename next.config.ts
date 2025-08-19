import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  
  // Helps with routing on static hosts
  trailingSlash: true,
  
  images: {
    // REQUIRED for static export - disables Next.js image optimization
    unoptimized: true,
    
    // These are NOT needed when unoptimized is true
    // domains: [
    //   'backend-test-v0k3.onrender.com',
    //   'localhost'
    // ],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'backend-test-v0k3.onrender.com',
    //     port: '',
    //     pathname: '/uploads/**',
    //   },
    //   {
    //     protocol: 'http',
    //     hostname: 'localhost',
    //     port: '5000',
    //     pathname: '/uploads/**',
    //   },
    // ],
    // minimumCacheTTL: 60,
    // formats: ['image/webp'],
  },
  
  // Optional: Add this to avoid build warnings
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;