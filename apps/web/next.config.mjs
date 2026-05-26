/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/shared"],

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*",
      },
      {
        source: "/:slug",
        destination: "http://localhost:3001/:slug",
      },
    ];
  },
};

export default nextConfig;
