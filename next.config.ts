import type { NextConfig } from "next";

<<<<<<< HEAD

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/**',
      },
    ],
  },
};
=======
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/admin',
  assetPrefix: '/admin',
  // ... your other config
}
>>>>>>> 9577b3e167e1c9a72675801f2b5c0264c2bcb40e

export default nextConfig