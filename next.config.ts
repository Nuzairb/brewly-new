/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/admin',
  assetPrefix: '/admin',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/**',
      },
    ],
  },
  // ... your other config
};

export default nextConfig;