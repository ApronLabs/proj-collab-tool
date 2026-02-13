import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/collab",
  serverExternalPackages: ["pg"],
};

export default nextConfig;
