-- =====================================================
-- Add Rich Content Support to Blog Posts
-- Migration: 20260216_add_rich_content
-- =====================================================

-- Add JSON content column for Tiptap editor
ALTER TABLE public.blog_posts 
  ADD COLUMN IF NOT EXISTS content_json JSONB,
  ADD COLUMN IF NOT EXISTS gallery_images TEXT[];

-- Add comments for documentation
COMMENT ON COLUMN public.blog_posts.content_json IS 
  'Structured content in Tiptap JSON format for rich text editing';
COMMENT ON COLUMN public.blog_posts.gallery_images IS 
  'Array of image URLs for inline galleries and additional images';

-- Create index for JSONB content search (for future full-text search)
CREATE INDEX IF NOT EXISTS idx_blog_posts_content_json 
  ON public.blog_posts USING gin(content_json);

-- Note: The existing 'content' column will remain for backward compatibility
-- and as a fallback for rendering. New posts will use content_json primarily.
