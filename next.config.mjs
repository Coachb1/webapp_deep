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
  // compiler: {
  //   removeConsole: !hostname.includes("local") ? { exclude: ["error"] } : false,
  // },
};

export default nextConfig;
