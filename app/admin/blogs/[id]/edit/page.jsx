import { BlogPostForm } from "@/components/BlogPostForm";
import { getAllCategories } from "@/app/actions/blogActions";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditBlogPostPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch the post
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select(
      `
      *,
      category:blog_categories(id, name, slug)
    `,
    )
    .eq("id", id)
    .single();

  if (error || !post) {
    notFound();
  }

  // Fetch categories
  const { data: categories } = await getAllCategories();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        <p className="text-muted-foreground mt-1">
          Update your blog post content
        </p>
      </div>

      <BlogPostForm post={post} categories={categories || []} />
    </div>
  );
}
