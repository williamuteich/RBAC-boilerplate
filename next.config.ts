import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    const baseCorsHeaders = [
      {
        key: "Access-Control-Allow-Methods",
        value: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      },
      {
        key: "Access-Control-Allow-Headers",
        value: "Content-Type, Authorization, x-api-key",
      },
      {
        key: "Access-Control-Allow-Credentials",
        value: "true",
      },
      {
        key: "Vary",
        value: "Origin",
      },
    ];

    return [
      {
        source: "/api/public/:path*",
        has: [
          {
            type: "header",
            key: "origin",
            value: "https://glamourlindoia.com.br",
          },
        ],
        headers: [
          ...baseCorsHeaders,
          {
            key: "Access-Control-Allow-Origin",
            value: "https://glamourlindoia.com.br",
          },
        ],
      },
      {
        source: "/api/public/:path*",
        has: [
          {
            type: "header",
            key: "origin",
            value: "https://www.glamourlindoia.com.br",
          },
        ],
        headers: [
          ...baseCorsHeaders,
          {
            key: "Access-Control-Allow-Origin",
            value: "https://www.glamourlindoia.com.br",
          },
        ],
      },
      {
        source: "/api/public/:path*",
        has: [
          {
            type: "header",
            key: "origin",
            value: "https://googlegclid.bazarelegance.com.br",
          },
        ],
        headers: [
          ...baseCorsHeaders,
          {
            key: "Access-Control-Allow-Origin",
            value: "https://googlegclid.bazarelegance.com.br",
          },
        ],
      },
      {
        source: "/api/public/:path*",
        has: [
          {
            type: "header",
            key: "origin",
            value: "http://localhost:8080",
          },
        ],
        headers: [
          ...baseCorsHeaders,
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:8080",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
