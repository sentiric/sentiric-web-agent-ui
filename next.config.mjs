/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // YENİ EKLENEN KISIM: styled-jsx çakışmasını önle
  compiler: {
    styledJsx: false,
  },
};
export default nextConfig;