import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getFormattedDate } from "@/lib/getFormattedDate";
import { getPostData, getSortedPostsData } from "@/lib/posts";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ShareButton, ShareArticleButton } from "@/components/ShareButtons";

export const generateStaticParams = () => {
  const posts = getSortedPostsData();

  return posts.map((post) => ({
    postId: post.id,
  }));
};

export const generateMetadata = async ({ params }) => {
  const posts = getSortedPostsData();
  const { postId: rawPostId } = await params;
  const postId = decodeURIComponent(rawPostId);
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return {
      title: "Post not found",
      description: "The requested blog post could not be found",
    };
  }
  return {
    title: post.title,
    description: post.description,
  };
};

const PostPage = async ({ params }) => {
  const posts = getSortedPostsData();

  // Properly await params and decode the URL parameter
  const { postId: rawPostId } = await params;
  const postId = decodeURIComponent(rawPostId);

  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post not found</h1>
          <Button asChild>
            <Link href="/blogs">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const { title, date, content } = await getPostData(postId);
  const pubDate = getFormattedDate(date);
  const { category, readingTime, featuredImage } = post;

  // Extract clean title (remove "How to:" prefix if present)
  const displayTitle = title.includes(":") ? title.split(":")[1].trim() : title;

  return (
    <article className="min-h-screen">
      {/* Hero Section with Featured Image */}
      <div className="relative h-[500px] w-full overflow-hidden">
        {/* Featured Image */}
        <div className="absolute inset-0">
          {featuredImage ? (
            <Image
              src={featuredImage}
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
              {category}
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
              <time dateTime={date}>{pubDate}</time>
            </div>

            {readingTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min read</span>
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
        <div
          className="article"
          dangerouslySetInnerHTML={{ __html: content }}
        />

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
