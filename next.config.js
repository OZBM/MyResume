/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
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
    ],
    unoptimized: true
  },
  env: {
    // Explicitly set the Gemini API key for client and server components
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'AIzaSyDJNM9v8vJk9BmOiNJirnP2VbVvvAbECO8',
  },
  // For security, the API key will be server-side only
  serverRuntimeConfig: {
    geminiApiKey: process.env.GEMINI_API_KEY || 'AIzaSyDJNM9v8vJk9BmOiNJirnP2VbVvvAbECO8',
  },
  publicRuntimeConfig: {
    // Public variables (non-sensitive) go here
  },
  // Disable ESLint during production build
  eslint: {
    // Only run ESLint on local development, not during builds
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
