import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    domains: ["github.com",'source.unsplash.com',  'images.unsplash.com',],
    
  },
   eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
