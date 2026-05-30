/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tell Next.js to watch and hot-reload this specific local package
  transpilePackages: ['@mediadance/client-sdk'],
};

module.exports = nextConfig;
