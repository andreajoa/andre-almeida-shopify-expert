const createNextIntlPlugin = require("next-intl/plugin")
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["images.unsplash.com"],
  },
}

module.exports = withNextIntl(nextConfig)
