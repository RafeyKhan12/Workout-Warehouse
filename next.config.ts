import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      hostname: "res.cloudinary.com"
    },
    {
      hostname: "imgs.search.brave.com"
    }
  ]
  }
};

export default nextConfig;
