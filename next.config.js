const remotePatterns = [
  {
    protocol: 'https',
    hostname: 'storage.googleapis.com',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'i.pinimg.com',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'tse1.mm.bing.net',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'img.freepik.com',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'tse3.mm.bing.net',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'tse4.mm.bing.net',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'images.rawpixel.com',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'images3.alphacoders.com',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'thechutneylife.com',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'studyfinds.org',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'th.bing.com',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'd25rq8gxcq0p71.cloudfront.net',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: '**.cloudfront.net',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'ajfan.store',
    pathname: '/**',
  }
];

// Allow images coming from the configured backend/base URLs
['NEXT_PUBLIC_BASE_URL', 'BACKEND_URL'].forEach((envKey) => {
  const value = process.env[envKey];
  if (!value) return;

  try {
    const parsed = new URL(value);
    remotePatterns.push({
      protocol: parsed.protocol.replace(':', ''),
      hostname: parsed.hostname,
      port: parsed.port || undefined,
      pathname: '/**',
    });
  } catch (err) {
    // Ignore malformed URLs
  }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns,
  },
};

module.exports = nextConfig;
