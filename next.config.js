/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.statically.io'],
  },
};

module.exports = nextConfig;
// cdn.statically.io
