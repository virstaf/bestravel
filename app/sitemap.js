import { getAllPublishedBlogPosts } from "@/app/actions/blogActions";

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bestravel.com";

  // Fetch all published blog posts
  const { data: posts } = await getAllPublishedBlogPosts();

  // Generate blog post URLs
  const blogUrls = (posts || []).map((post) => ({
    url: `${siteUrl}/blogs/${post.slug}`,
    lastModified: post.updated_at || post.published_at,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Static pages
  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  return [...staticPages, ...blogUrls];
}
