-- =====================================================
-- Add Author Fields to Blog Posts
-- Migration: 20260216_add_author_fields
-- =====================================================

-- Add author information columns to blog_posts table
ALTER TABLE public.blog_posts 
  ADD COLUMN IF NOT EXISTS author_name TEXT,
  ADD COLUMN IF NOT EXISTS author_bio TEXT,
  ADD COLUMN IF NOT EXISTS author_avatar TEXT;

-- Add comments for documentation
COMMENT ON COLUMN public.blog_posts.author_name IS 
  'Display name for blog author (overrides auth.users lookup)';
COMMENT ON COLUMN public.blog_posts.author_bio IS 
  'Short biography or description of the author';
COMMENT ON COLUMN public.blog_posts.author_avatar IS 
  'URL to author avatar/profile image';

-- Create index for author name searches (optional, for future author filtering)
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_name 
  ON public.blog_posts(author_name) 
  WHERE author_name IS NOT NULL;
