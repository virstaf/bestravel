# Supabase Blog CMS - Setup Instructions

## Step 1: Run Database Migration

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Copy the contents of `supabase/migrations/create_blog_cms.sql`
4. Paste and run the SQL

This will create:

- `blog_categories` table
- `blog_posts` table
- RLS policies
- Indexes
- Seed categories (Membership, Travel Tips, Destinations, Guides)

## Step 2: Create Storage Bucket

1. In Supabase dashboard, go to **Storage**
2. Click **New bucket**
3. Name it: `blog-images`
4. Make it **Public**
5. Click **Create bucket**

## Step 3: Set Up Storage Policies

1. Go to **SQL Editor** in Supabase
2. Copy the contents of `supabase/migrations/storage_policies.sql`
3. Paste and run the SQL

This will allow:

- Authenticated users to upload, update, and delete images
- Public read access to all images

1. Navigate to `/admin/blogs` in your app
2. Click **New Post** to create a test blog post
3. Fill in:
   - Title (slug will auto-generate)
   - Content (HTML supported)
   - Upload a featured image
   - Select a category
   - Set status to "Published"
4. Click **Create Post**

## Step 4: Verify Public Display

1. Navigate to `/blogs` to see your blog listing
2. Click on a blog post to view the detail page
3. Verify featured image displays correctly
4. Test search and category filtering

## Features

### Admin Interface (`/admin/blogs`)

- ✅ Dashboard with stats (total posts, published, drafts, views)
- ✅ Create new blog posts
- ✅ Edit existing posts
- ✅ Delete posts (with confirmation)
- ✅ Upload featured images to Supabase Storage
- ✅ Auto-generate slugs from titles
- ✅ Auto-calculate reading time
- ✅ Category management
- ✅ Draft/publish workflow

### Public Pages

- ✅ Blog listing at `/blogs`
- ✅ Blog detail at `/blogs/[slug]`
- ✅ Search functionality
- ✅ Category filtering
- ✅ View tracking
- ✅ Featured images
- ✅ Reading time estimates

## Next Steps (Optional)

### Migrate Existing Markdown Posts

If you want to migrate your existing .md files to the database, you can:

1. Manually copy content from each .md file
2. Create new posts via the admin interface
3. Upload corresponding featured images

### Add Rich Text Editor

For a better content editing experience, consider adding:

- TipTap (recommended)
- React Quill
- Or keep the current HTML textarea

### Additional Features

- Tags system (many-to-many relationship)
- Author profiles
- Comments system
- Related posts
- SEO meta tags
- Social sharing
- Email notifications
