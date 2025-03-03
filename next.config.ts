import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true, // Since we're not using dynamic images
  },
  // Configure Puppeteer for PDF generation
  experimental: {
    serverActions: {
      allowedOrigins: ['*'],
    },
  },
};

export default config;
