/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      // Enforce www canonical – redirect non-www to www with 301
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'paperstreet.co.ke' }],
        destination: 'https://www.paperstreet.co.ke/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
