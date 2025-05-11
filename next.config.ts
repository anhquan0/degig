import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@meshsdk/core", "@meshsdk/core-cst"],
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL("https://res.cloudinary.com/**"), new URL("https://s2.coinmarketcap.com/**")],
  },
  webpack: function (config) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
};

export default nextConfig;
