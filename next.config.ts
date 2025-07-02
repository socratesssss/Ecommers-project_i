import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
      domains: ['www.vaporzonebd.com','truthinitiative.org'],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.vaporzonebd.com',
        pathname: '/admin_assats/slider_images/**',
      },
    ]
  },
  /* config options here */
};

export default nextConfig;
