/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:7175/:path*`, // Proxy to Backend
      },
    ];
  },
  env: {
    API_URL: process.env.API_URL,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
