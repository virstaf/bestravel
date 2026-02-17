"use client";

export function JsonLdSchema({ post }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: post.og_image || post.featured_image,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: {
      "@type": "Person",
      name: post.author_name || "Anonymous",
      ...(post.author_avatar && { image: post.author_avatar }),
    },
    publisher: {
      "@type": "Organization",
      name: "BesTravel",
      logo: {
        "@type": "ImageObject",
        url: "/logo.png", // Update with your actual logo URL
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL || ""}/blogs/${post.slug}`,
    },
    ...(post.keywords &&
      post.keywords.length > 0 && { keywords: post.keywords.join(", ") }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
