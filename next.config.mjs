/** @type {import('next').NextConfig} */

import dotenv from "dotenv";
import os from "os";

dotenv.config();

const hostname = os.hostname();

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push({
      sharp: "commonjs sharp",
      canvas: "commonjs canvas",
    });
    return config;
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    ANTHROPIC_API_KEY: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
    GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async headers() {
    return [
      {
        // Routes this applies to
        source: "/api/(.*)",
        // Headers
        headers: [
          // Allow for specific domains to have access or * for all
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
            // DOES NOT WORK
            // value: process.env.ALLOWED_ORIGIN,
          },
          // Allows for specific methods accepted
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          // Allows for specific headers accepted (These are a few standard ones)
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
