/** @type {import('next').NextConfig} */

const AllowedFrameDomains = [
  "https://*.coachbots.com",
  "http://localhost:*",
  "http://127.0.0.1:5500",
  'http://app.linke.to',
  'https://coachbot.onlinecoursehost.com'
];

const AllowedScriptDomains = [
  "https://*.coachbots.com",
  "https://cdn.tinytalk.ai",
  "https://cdn.jsdelivr.net",
  "https://cdnjs.cloudflare.com",
  "https://cdn.intake-lr.com",
  "http://localhost:*",
];

const AllowedApiDomains = [
  "https://*.coachbots.com",
  "https://*.tinytalk.ai",
  "https://api.openai.com",
  "https://api.anthropic.com",
  "https://generativelanguage.googleapis.com",
];

const AllowedImgDomains = [
  "https://*.coachbots.com",
  "https://dashboard.tinytalk.ai",
  "https://tiny-talk-prod-uploads.s3.eu-central-1.amazonaws.com",
  "https://storage.googleapis.com",
  "https://res.cloudinary.com",
  "http://localhost:*",
];

module.exports = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/library-bot/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              // only allow scripts from trusted domains
              `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${AllowedScriptDomains.join(" ")}`,

              // only allow connections to trusted APIs
              `connect-src 'self' ${AllowedApiDomains.join(" ")}`,

              // only allow images from trusted sources
              `img-src 'self' data: ${AllowedImgDomains.join(" ")}`,

              // allow blob workers
              `worker-src 'self' blob: ${AllowedScriptDomains.join(" ")}`,

              // allow iframes only from trusted domains
              `frame-src 'self' ${AllowedScriptDomains.join(" ")}`,

              // only allow the page to be embedded in trusted domains
              `frame-ancestors 'self' ${AllowedFrameDomains.join(" ")}`,

              // allow inline styles for Tailwind / SDK
              `style-src 'self' 'unsafe-inline' ${AllowedScriptDomains.join(" ")}`,

              // fallback
              "default-src 'self'",
            ].join("; "),
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};
