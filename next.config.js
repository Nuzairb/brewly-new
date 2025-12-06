<<<<<<< HEAD:next.config.js
=======


>>>>>>> ea198389df2b402d088cff9cb90b6b7a193e9de6:next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
