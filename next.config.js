/** @type {import('next').NextConfig} */
const nextConfig = {
  target: 'server', 
  reactStrictMode: true,
  env: {
     URL: 'http://192.168.56.1:4000/api/futurePedia/',
     NEXT_PUBLIC_BASE_URL: "http://findup.ai"
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin", // "same-origin-allow-popups"
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;