-- =====================================================
-- Storage Bucket Policies for blog-images
-- Run this in Supabase SQL Editor
-- =====================================================

-- First, make sure the bucket exists and is public
-- (This should be done in the Supabase Storage UI, but here's the SQL if needed)
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Policy 1: Allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload blog images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-images');

-- Policy 2: Allow authenticated users to update their uploaded images
CREATE POLICY "Allow authenticated users to update blog images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'blog-images');

-- Policy 3: Allow authenticated users to delete images
CREATE POLICY "Allow authenticated users to delete blog images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'blog-images');

-- Policy 4: Allow public read access to all images
CREATE POLICY "Allow public read access to blog images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'blog-images');
