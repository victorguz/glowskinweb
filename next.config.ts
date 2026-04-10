import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/services/limpieza-facial-profunda',
        destination: '/services/limpieza-facial',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
