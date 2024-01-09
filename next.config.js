/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ['en', 'vi', 'ko'],
    defaultLocale: 'vi',
    localeDetection: false,
  },
};

module.exports = nextConfig;
