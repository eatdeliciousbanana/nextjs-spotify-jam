import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "mosaic.scdn.co",
        port: "",
      },
      {
        protocol: "https",
        hostname: "**.spotifycdn.com",
        port: "",
        pathname: "/image/**",
      },
    ],
  },
  skipMiddlewareUrlNormalize: true,
};

export default nextConfig;
