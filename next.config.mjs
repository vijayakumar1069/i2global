/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/login",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
