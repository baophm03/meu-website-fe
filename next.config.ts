// ==========================================
// Author:         Quach Dac Duc Manh
// Email:          quachdacducmanhk16@siu.edu.vn
// Phone:          +84 396 677 325
// -----------------------------------
// Created:        2026-11-16
// LastEditTime:   2026-11-16
// Version:        1.0
// Status:         Updated
// ==========================================

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "vcci-hcm.org.vn",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "vcci-hcm.org.vn",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "vccihcm.vn",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "news.vccihcm.vn",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "meu-solutions.com",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.meu-solutions.com",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
