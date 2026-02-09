const nextConfig = {
  // cacheComponents: true,
  // experimental: {
  //   turbopackFileSystemCacheForDev: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ylpkcsmbsnowmbyxhbzw.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
