/** @type {import('next').NextConfig} */

// dotenv
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
};

export default nextConfig;
