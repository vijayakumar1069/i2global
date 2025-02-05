/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/signIn",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
