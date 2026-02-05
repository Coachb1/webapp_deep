import {withSentryConfig} from "@sentry/nextjs";
/** @type {import('next').NextConfig} */

import dotenv from "dotenv";
import os from "os";

dotenv.config();

const hostname = os.hostname();

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push({
      canvas: "commonjs canvas",
    });
    return config;
  },
  images: {
    domains: [
        "res.cloudinary.com",
        "cdn.coachbots.com", // ✅ ADD THIS
        "storage.googleapis.com"
      ],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "storage.googleapis.com",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "cdn.coachbots.com",
          pathname: "/**",
        },
      ],
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
  }
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "coachbots-v5",
project: "webdeep",
sentryUrl: "https://sentry.io/",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,


// Upload a larger set of source maps for prettier stack traces (increases build time)
// widenClientFileUpload: true,

// Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
// tunnelRoute: "/monitoring",

// Hides source maps from generated client bundles
hideSourceMaps: true,

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});