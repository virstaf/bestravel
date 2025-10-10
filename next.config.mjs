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
    domains: [
      "drive.google.com",
      "images.unsplash.com",
      "ylpkcsmbsnowmbyxhbzw.supabase.co",
    ],
  },
};

export default nextConfig;
