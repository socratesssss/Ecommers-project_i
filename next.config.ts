import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images: {
  remotePatterns: [
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '4000',
      pathname: '/uploads/**',
    },
       {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000', // Optional, match your backend port
        pathname: '/uploads/**',
      },
  ],
},


 
  /* config options here */
};

export default nextConfig;
