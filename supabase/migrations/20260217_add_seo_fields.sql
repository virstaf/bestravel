-- =====================================================
-- Add SEO Fields to Blog Posts
-- Migration: 20260217_add_seo_fields
-- =====================================================

-- Add SEO-specific columns to blog_posts table
ALTER TABLE public.blog_posts 
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS og_image TEXT,
  ADD COLUMN IF NOT EXISTS keywords TEXT[];

-- Add comments for documentation
COMMENT ON COLUMN public.blog_posts.meta_title IS 
  'Custom title for search engines (max 60 chars recommended). Falls back to title if not set.';
COMMENT ON COLUMN public.blog_posts.meta_description IS 
  'Custom description for search results (max 160 chars recommended). Falls back to excerpt if not set.';
COMMENT ON COLUMN public.blog_posts.og_image IS 
  'Custom Open Graph image URL for social sharing. Falls back to featured_image if not set.';
COMMENT ON COLUMN public.blog_posts.keywords IS 
  'Array of keywords/tags for SEO purposes.';

-- Create GIN index for keywords array for faster searches
CREATE INDEX IF NOT EXISTS idx_blog_posts_keywords 
  ON public.blog_posts USING gin(keywords);
