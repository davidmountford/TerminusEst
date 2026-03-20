/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  experimental: {
    workerThreads: true
  }
};

module.exports = nextConfig;
