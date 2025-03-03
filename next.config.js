/** @type {import('next').NextConfig} */
const config = {
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

module.exports = config;
