/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: false, swcMinify: true };
(module.exports = nextConfig),
  {
    i18n: {
      locales: ["ko", "en"],
      defaultLocale: "ko",
    },
  };
