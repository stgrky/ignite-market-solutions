import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // Every image uploaded through the Studio is served from here — the
      // About portrait and blog cover images. Without it next/image refuses
      // the host and renders a broken image with no console error.
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
