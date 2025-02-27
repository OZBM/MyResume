/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  },
  env: {
    // Environment variables will be loaded from .env.local
  },
  // For security, the API key will be server-side only
  serverRuntimeConfig: {
    geminiApiKey: process.env.GEMINI_API_KEY,
  },
  publicRuntimeConfig: {
    // Public variables (non-sensitive) go here
  },
};

module.exports = nextConfig;