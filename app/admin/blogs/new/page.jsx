import { BlogPostForm } from "@/components/BlogPostForm";
import { getAllCategories } from "@/app/actions/blogActions";

export default async function NewBlogPostPage() {
  const { data: categories } = await getAllCategories();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Blog Post</h1>
        <p className="text-muted-foreground mt-1">
          Write and publish a new blog post
        </p>
      </div>

      <BlogPostForm categories={categories || []} />
    </div>
  );
}
