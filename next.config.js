/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        module: false,
      };
    }
    return config;
  },
  reactStrictMode: true,
  env: {
     URL: 'https://api.findup.ai/api/futurePedia/',
     NEXT_PUBLIC_BASE_URL:"http://findup.ai"
  }
}

module.exports = nextConfig
