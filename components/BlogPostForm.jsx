"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  createBlogPost,
  updateBlogPost,
  uploadBlogImage,
} from "@/app/actions/blogActions";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { RichTextEditor } from "@/components/RichTextEditor";

export function BlogPostForm({ post = null, categories = [] }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingAuthorAvatar, setIsUploadingAuthorAvatar] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(
    post?.featured_image || "",
  );
  const [authorAvatar, setAuthorAvatar] = useState(post?.author_avatar || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [title, setTitle] = useState(post?.title || "");
  const [editorContent, setEditorContent] = useState({
    json: post?.content_json || null,
    html: post?.content || "",
  });

  // Auto-generate slug from title
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    if (!post) {
      // Only auto-generate slug for new posts
      const autoSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(autoSlug);
    }
  };

  // Handle featured image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const tempSlug = slug || "temp";
    const { data, error } = await uploadBlogImage(file, tempSlug);

    if (error) {
      alert(`Error uploading image: ${error}`);
    } else {
      setFeaturedImage(data.url);
    }
    setIsUploading(false);
  };

  // Handle author avatar upload
  const handleAuthorAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingAuthorAvatar(true);
    const tempSlug = slug || "temp";
    const { data, error } = await uploadBlogImage(file, `${tempSlug}-author`);

    if (error) {
      alert(`Error uploading author avatar: ${error}`);
    } else {
      setAuthorAvatar(data.url);
    }
    setIsUploadingAuthorAvatar(false);
  };

  // Calculate reading time from content
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    // Add calculated reading time
    const readingTime = calculateReadingTime(editorContent.html);
    formData.set("reading_time", readingTime.toString());

    // Add content (HTML for backward compatibility)
    formData.set("content", editorContent.html);

    // Add content_json (Tiptap JSON format)
    if (editorContent.json) {
      formData.set("content_json", JSON.stringify(editorContent.json));
    }

    // Add featured image URL
    formData.set("featured_image", featuredImage);

    // Add author avatar URL
    formData.set("author_avatar", authorAvatar);

    try {
      let result;
      if (post) {
        result = await updateBlogPost(post.id, formData);
      } else {
        result = await createBlogPost(formData);
      }

      if (result.error) {
        alert(`Error: ${result.error}`);
      } else {
        router.push("/admin/blogs");
        router.refresh();
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" asChild>
        <Link href="/admin/blogs">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Posts
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter post title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="post-url-slug"
                  required
                />
                <p className="text-sm text-muted-foreground mt-1">
                  URL: /blogs/{slug || "your-slug"}
                </p>
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  defaultValue={post?.excerpt || ""}
                  placeholder="Brief description of the post"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle>Content *</CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                content={editorContent.json || editorContent.html}
                onChange={setEditorContent}
                slug={slug}
              />
              <p className="text-sm text-muted-foreground mt-2">
                Use the toolbar to format your content. You can add images,
                links, code blocks, and more.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Publish</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue={post?.status || "draft"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category_id">Category</Label>
                <Select
                  name="category_id"
                  defaultValue={post?.category_id || undefined}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>{post ? "Update" : "Create"} Post</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {featuredImage && (
                <div className="relative aspect-video rounded-lg overflow-hidden border">
                  <Image
                    src={featuredImage}
                    alt="Featured image"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary transition-colors">
                    {isUploading ? (
                      <Loader2 className="w-8 h-8 mx-auto animate-spin text-muted-foreground" />
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload image
                        </p>
                      </>
                    )}
                  </div>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Author Information */}
          <Card>
            <CardHeader>
              <CardTitle>Author Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="author_name">Author Name</Label>
                <Input
                  id="author_name"
                  name="author_name"
                  defaultValue={post?.author_name || ""}
                  placeholder="e.g., John Doe"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Display name for the blog author
                </p>
              </div>

              <div>
                <Label htmlFor="author_bio">Author Bio</Label>
                <Textarea
                  id="author_bio"
                  name="author_bio"
                  defaultValue={post?.author_bio || ""}
                  placeholder="Brief description about the author..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Author Avatar</Label>
                {authorAvatar && (
                  <div className="relative aspect-square w-24 rounded-full overflow-hidden border mb-3">
                    <Image
                      src={authorAvatar}
                      alt="Author avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <Label
                  htmlFor="author-avatar-upload"
                  className="cursor-pointer"
                >
                  <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary transition-colors">
                    {isUploadingAuthorAvatar ? (
                      <Loader2 className="w-8 h-8 mx-auto animate-spin text-muted-foreground" />
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          {authorAvatar ? "Change avatar" : "Upload avatar"}
                        </p>
                      </>
                    )}
                  </div>
                  <Input
                    id="author-avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAuthorAvatarUpload}
                    className="hidden"
                    disabled={isUploadingAuthorAvatar}
                  />
                </Label>
                <p className="text-sm text-muted-foreground mt-2">
                  Recommended: Square image, at least 200x200px
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
