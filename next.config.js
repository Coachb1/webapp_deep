/** @type {import('next').NextConfig} */
module.exports = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/library-bot/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};
