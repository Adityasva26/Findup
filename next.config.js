/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
     URL: 'http://192.168.1.36:4000/api/futurePedia/',
     NEXT_PUBLIC_BASE_URL:"http://findup.ai"
  }
}

module.exports = nextConfig
