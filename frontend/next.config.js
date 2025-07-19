/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: true
  },
  trailingSlash: true,
  output: 'export',
  distDir: 'out'
}

module.exports = nextConfig
