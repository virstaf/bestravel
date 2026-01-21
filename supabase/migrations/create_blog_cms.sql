-- =====================================================
-- Blog CMS Database Schema
-- =====================================================

-- 1. Create blog_categories table
CREATE TABLE IF NOT EXISTS public.blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  reading_time INTEGER, -- in minutes
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);

-- 4. Enable Row Level Security
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for blog_categories
-- Allow public read access to all categories
CREATE POLICY "Allow public read access to categories"
  ON public.blog_categories
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert/update/delete categories
CREATE POLICY "Allow authenticated users to manage categories"
  ON public.blog_categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 6. RLS Policies for blog_posts
-- Allow public read access to published posts only
CREATE POLICY "Allow public read access to published posts"
  ON public.blog_posts
  FOR SELECT
  TO public
  USING (status = 'published');

-- Allow authenticated users to read all posts (including drafts)
CREATE POLICY "Allow authenticated users to read all posts"
  ON public.blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert posts
CREATE POLICY "Allow authenticated users to create posts"
  ON public.blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update posts
CREATE POLICY "Allow authenticated users to update posts"
  ON public.blog_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete posts
CREATE POLICY "Allow authenticated users to delete posts"
  ON public.blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- 7. Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Create trigger to auto-update updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 9. Seed initial categories
INSERT INTO public.blog_categories (name, slug, description) VALUES
  ('Membership', 'membership', 'Posts about Virstravelclub membership benefits and features'),
  ('Travel Tips', 'travel-tips', 'Helpful tips and guides for travelers'),
  ('Destinations', 'destinations', 'Explore amazing travel destinations'),
  ('Guides', 'guides', 'Comprehensive travel guides and how-tos')
ON CONFLICT (slug) DO NOTHING;

-- 10. Create storage bucket for blog images (run this in Supabase Storage UI or via API)
-- Storage bucket name: 'blog-images'
-- Make it public for easy access
-- You'll need to create this manually in the Supabase dashboard under Storage
