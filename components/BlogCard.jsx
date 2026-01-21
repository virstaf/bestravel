import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { getFormattedDate } from "@/lib/getFormattedDate";
import { Badge } from "@/components/ui/badge";

const BlogCard = ({ post }) => {
  const {
    slug,
    title,
    published_at,
    featured_image,
    category,
    reading_time,
    excerpt,
  } = post;
  const formattedDate = published_at ? getFormattedDate(published_at) : "";

  // Extract the subtitle from title (after the colon)
  const displayTitle = title
    ? title.split(":")[1]?.trim() || title
    : "Untitled Post";

  return (
    <Link href={`/blogs/${slug}`} className="group block h-full">
      <article className="h-full bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Featured Image */}
        <div className="relative h-48 bg-muted overflow-hidden">
          {featured_image ? (
            <Image
              src={featured_image}
              alt={displayTitle}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-primary/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
          )}

          {/* Category Badge */}
          {category && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-primary text-primary-foreground font-medium shadow-md">
                {category.name}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {displayTitle}
          </h3>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={published_at}>{formattedDate}</time>
            </div>

            {reading_time && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{reading_time} min read</span>
              </div>
            )}
          </div>

          {/* Read More Link */}
          <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
            <span>Read more</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
