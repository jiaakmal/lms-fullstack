import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['lh3.googleusercontent.com',
      "avatars.githubusercontent.com",
      'res.cloudinary.com', 'avatars.githubusercontent.com'
    ], // 👈 Add this
  },
};

export default nextConfig;
