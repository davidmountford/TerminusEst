/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    workerThreads: true
  },
  async rewrites() {
    return [
      {
        source: '/__style-lab',
        destination: '/style-lab'
      }
    ]
  }
};

module.exports = nextConfig;
