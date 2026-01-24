import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  // 💡 register: true and skipWaiting: true are ENABLED by default here.
  // Neenga extra-va add panna thevai illa.
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
    ],
  },
  // 👇 Add this to satisfy the build warning
  // Next 16 uses 'experimental.turbo' instead of root 'turbopack'
  // experimental: {
  //   turbo: {},
  // },
};

export default withPWA(nextConfig);