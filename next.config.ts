import type { NextConfig } from "next";
import { getBlogLegacyRedirectsForConfig } from "./lib/blog/blog-legacy-redirects";

const assetsCdnHost =
  process.env.NEXT_PUBLIC_ASSETS_CDN?.replace(/^https?:\/\//, "").split("/")[0] ??
  "d2dlpa102or2ci.cloudfront.net";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig: NextConfig = {
  compress: true,
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: assetsCdnHost,
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    if (process.env.NODE_ENV !== "production") {
      return [];
    }
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
          ...securityHeaders,
        ],
      },
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
          ...securityHeaders,
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          ...securityHeaders,
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "private, no-store, max-age=0" },
          ...securityHeaders,
        ],
      },
    ];
  },
  async redirects() {
    return [
      ...getBlogLegacyRedirectsForConfig(),
      {
        source: "/sitemap.rss",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/sitemap",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/services/limpieza-facial-profunda",
        destination: "/limpieza-facial",
        permanent: true,
      },
      {
        source: "/services/limpieza-facial",
        destination: "/limpieza-facial",
        permanent: true,
      },
      {
        source: "/servicios/tratamiento-anti-acne-intensivo",
        destination: "/metodo-glow-skin",
        permanent: true,
      },
      {
        source: "/servicios/protocolos-acne",
        destination: "/metodo-glow-skin",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
