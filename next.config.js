/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/v1",
        permanent: false, // Set this to true if you want it to be a permanent (301) redirect
      },
    ];
  },
};

module.exports = nextConfig;
