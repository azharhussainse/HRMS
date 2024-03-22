/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_BASE_URL: 'http://192.168.0.200:80'
  },
  devServer: {
    hot: false // Disable HMR
  }
};

module.exports = nextConfig;
