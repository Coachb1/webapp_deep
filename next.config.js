/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.externals.push({
        sharp: "commonjs sharp",
        canvas: "commonjs canvas",
      });
      return config;
    },
    env: {
          OPENAI_API_KEY : process.env.NEXT_PUBLIC_OPENAI_API_KEY,
          ANTHROPIC_API_KEY : process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
        },
  };
  
  export default nextConfig;

