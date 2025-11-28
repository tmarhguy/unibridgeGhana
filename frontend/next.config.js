/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export when STATIC_EXPORT env var is set (for GitHub Pages)
  // Disable for dev mode to allow middleware and dynamic routes
  ...(process.env.STATIC_EXPORT === 'true'
    ? {
      output: 'export',
      basePath: '/unibridgeGhana',
      assetPrefix: '/unibridgeGhana',
    }
    : {}),
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'dist',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  },
}

module.exports = nextConfig
