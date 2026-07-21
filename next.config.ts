import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  experimental: {
    /* one page, small atomic css: inlining removes the render-blocking
       stylesheet request, which is most of our mobile LCP margin */
    inlineCss: true,
  },
};

export default nextConfig;
