/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    localPatterns: [{
      pathname: '/assets/images/**',
      search: '',
    }]
  }
};

module.exports = nextConfig;