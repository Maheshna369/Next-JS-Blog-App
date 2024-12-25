/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/, // Match .svg files
      use: ["@svgr/webpack"], // Use @svgr/webpack loader
    });
    return config; // Return the updated config
  },
};

export default nextConfig;
