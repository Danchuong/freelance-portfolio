import type { NextConfig } from "next";

// BASE_PATH lets the static export live under a subpath, e.g. GitHub Pages "/freelance-portfolio".
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
};

export default nextConfig;
