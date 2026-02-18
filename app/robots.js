export default function robots() {
  const siteUrl =
    process.env.NEXT_PUBLIC_BASEURL || "https://virstravelclub.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
