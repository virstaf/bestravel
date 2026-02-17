"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * Get all blog posts (admin view - includes drafts)
 */
export async function getAllBlogPosts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      `
      *,
      category:blog_categories(id, name, slug)
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Get published blog posts (public view)
 */
export async function getPublishedBlogPosts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      `
      *,
      category:blog_categories(id, name, slug)
    `,
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching published posts:", error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Get single blog post by slug
 */
export async function getBlogPostBySlug(slug) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      `
      *,
      category:blog_categories(id, name, slug)
    `,
    )
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching blog post:", error);
    return { data: null, error: error.message };
  }

  // Increment view count
  await supabase
    .from("blog_posts")
    .update({ views: (data.views || 0) + 1 })
    .eq("id", data.id);

  return { data, error: null };
}

/**
 * Search blog posts
 */
export async function searchBlogPosts(query, categorySlug = null) {
  const supabase = await createClient();

  let queryBuilder = supabase
    .from("blog_posts")
    .select(
      `
      *,
      category:blog_categories(id, name, slug)
    `,
    )
    .eq("status", "published");

  if (query) {
    queryBuilder = queryBuilder.or(
      `title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`,
    );
  }

  if (categorySlug) {
    queryBuilder = queryBuilder.eq("category.slug", categorySlug);
  }

  const { data, error } = await queryBuilder.order("published_at", {
    ascending: false,
  });

  if (error) {
    console.error("Error searching blog posts:", error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Create new blog post
 */
export async function createBlogPost(formData) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "User not authenticated" };
  }

  const postData = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    content_json: formData.get("content_json")
      ? JSON.parse(formData.get("content_json"))
      : null,
    featured_image: formData.get("featured_image"),
    category_id: formData.get("category_id") || null,
    status: formData.get("status") || "draft",
    reading_time: formData.get("reading_time")
      ? parseInt(formData.get("reading_time"))
      : null,
    author_id: user.id,
    author_name: formData.get("author_name") || null,
    author_bio: formData.get("author_bio") || null,
    author_avatar: formData.get("author_avatar") || null,
    published_at:
      formData.get("status") === "published" ? new Date().toISOString() : null,
  };

  const { data, error } = await supabase
    .from("blog_posts")
    .insert([postData])
    .select()
    .single();

  if (error) {
    console.error("Error creating blog post:", error);
    return { data: null, error: error.message };
  }

  revalidatePath("/blogs");
  revalidatePath("/admin/blogs");

  return { data, error: null };
}

/**
 * Update existing blog post
 */
export async function updateBlogPost(id, formData) {
  const supabase = await createClient();

  const postData = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    content_json: formData.get("content_json")
      ? JSON.parse(formData.get("content_json"))
      : null,
    featured_image: formData.get("featured_image"),
    category_id: formData.get("category_id") || null,
    status: formData.get("status"),
    reading_time: formData.get("reading_time")
      ? parseInt(formData.get("reading_time"))
      : null,
    author_name: formData.get("author_name") || null,
    author_bio: formData.get("author_bio") || null,
    author_avatar: formData.get("author_avatar") || null,
  };

  // If publishing for the first time, set published_at
  if (formData.get("status") === "published") {
    const { data: existingPost } = await supabase
      .from("blog_posts")
      .select("published_at")
      .eq("id", id)
      .single();

    if (!existingPost?.published_at) {
      postData.published_at = new Date().toISOString();
    }
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .update(postData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating blog post:", error);
    return { data: null, error: error.message };
  }

  revalidatePath("/blogs");
  revalidatePath(`/blogs/${data.slug}`);
  revalidatePath("/admin/blogs");

  return { data, error: null };
}

/**
 * Delete blog post
 */
export async function deleteBlogPost(id) {
  const supabase = await createClient();

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    console.error("Error deleting blog post:", error);
    return { error: error.message };
  }

  revalidatePath("/blogs");
  revalidatePath("/admin/blogs");

  return { error: null };
}

/**
 * Upload blog image to Supabase Storage
 */
export async function uploadBlogImage(file, postSlug) {
  const supabase = await createClient();

  const fileExt = file.name.split(".").pop();
  const fileName = `${postSlug}-${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from("blog-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading image:", error);
    return { data: null, error: error.message };
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("blog-images").getPublicUrl(filePath);

  return { data: { path: filePath, url: publicUrl }, error: null };
}

/**
 * Get all categories
 */
export async function getAllCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog_categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}
