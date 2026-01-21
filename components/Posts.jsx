import { getPublishedBlogPosts } from "@/app/actions/blogActions";
import Image from "next/image";
import BlogsGrid from "./BlogsGrid";

const Posts = async () => {
  const { data: allPosts, error } = await getPublishedBlogPosts();

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Error loading blog posts: {error}</p>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10" />
        <div className="absolute inset-0">
          <Image
            src="/images/boats-docked-on-sand.jpg"
            alt="Blog Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 text-center text-white px-4 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Travel Insights & Stories
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Discover expert tips, destination guides, and inspiring travel
            stories from the Virstravel Club community
          </p>
        </div>
      </div>

      {/* Blog Grid with Search and Filters */}
      <BlogsGrid posts={allPosts || []} />
    </section>
  );
};

export default Posts;
