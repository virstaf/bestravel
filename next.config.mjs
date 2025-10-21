const nextConfig = {
  // reactStrictMode: false, // Disables double-rendering in development
  // output: "export",
  // images: {
  //   unoptimized: true, // required for `next export`
  // },
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/i,
  //     issuer: /\.[jt]sx?$/,
  //     use: ["@svgr/webpack"],
  //   });
  //   return config;
  // },

  images: {
    // domains: [
    //   "drive.google.com",
    //   "images.unsplash.com",
    //   "ylpkcsmbsnowmbyxhbzw.supabase.co",
    // ],
    remotePatterns: [
      {
        protocol: "https", // Specifies the required protocol (e.g., 'https')
        hostname: "drive.google.com", // Defines the allowed hostname (supports wildcards like '*.example.com')
        port: "", // Specifies the required port (empty string for default)
        pathname: "/**", // Defines the allowed path within the hostname (supports wildcards like '/**')
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
