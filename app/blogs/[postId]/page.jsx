import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getFormattedDate } from "@/lib/getFormattedDate";
import { getBlogPostBySlug } from "@/app/actions/blogActions";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ShareButton, ShareArticleButton } from "@/components/ShareButtons";
import { notFound } from "next/navigation";
import { TiptapRenderer } from "@/components/TiptapRenderer";

export const generateMetadata = async ({ params }) => {
  const { postId: slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const { data: post } = await getBlogPostBySlug(decodedSlug);

  if (!post) {
    return {
      title: "Post not found",
      description: "The requested blog post could not be found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || post.title,
  };
};

const PostPage = async ({ params }) => {
  // Get slug from params
  const { postId: slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  // Fetch post from Supabase
  const { data: post, error } = await getBlogPostBySlug(decodedSlug);

  if (error || !post) {
    notFound();
  }

  const {
    title,
    published_at,
    content,
    category,
    reading_time,
    featured_image,
  } = post;
  const pubDate = published_at ? getFormattedDate(published_at) : "";

  // Extract clean title (remove "How to:" prefix if present)
  const displayTitle = title.includes(":") ? title.split(":")[1].trim() : title;

  return (
    <article className="min-h-screen">
      {/* Hero Section with Featured Image */}
      <div className="relative h-[500px] w-full overflow-hidden">
        {/* Featured Image */}
        <div className="absolute inset-0">
          {featured_image ? (
            <Image
              src={featured_image}
              alt={displayTitle}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
          )}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

        {/* Content */}
        <div className="relative h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
          {/* Category Badge */}
          {category && (
            <Badge className="bg-primary text-primary-foreground font-medium shadow-lg mb-4 w-fit">
              {category.name}
            </Badge>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {displayTitle}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={published_at}>{pubDate}</time>
            </div>

            {reading_time && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{reading_time} min read</span>
              </div>
            )}

            <ShareButton title={displayTitle} className="ml-auto" />
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/blogs" className="group">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to all articles
            </Link>
          </Button>
        </div>

        {/* Article Body with Custom Styling */}
        {post.content_json ? (
          <TiptapRenderer content={post.content_json} />
        ) : (
          <div
            className="article"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

        {/* Author Information Card */}
        {(post.author_name || post.author_bio || post.author_avatar) && (
          <div className="bg-muted/50 rounded-xl p-6 my-12">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
              About the Author
            </h3>
            <div className="flex items-start gap-4">
              {post.author_avatar && (
                <Image
                  src={post.author_avatar}
                  alt={post.author_name || "Author"}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              )}
              <div className="flex-1">
                {post.author_name && (
                  <h4 className="font-semibold text-lg mb-2">
                    {post.author_name}
                  </h4>
                )}
                {post.author_bio && (
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {post.author_bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-border my-12" />

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center">
          <Button asChild>
            <Link href="/blogs">
              <ArrowLeft className="w-4 h-4 mr-2" />
              All Articles
            </Link>
          </Button>

          <ShareArticleButton title={displayTitle} />
        </div>
      </div>
    </article>
  );
};

export default PostPage;
