-- Add is_featured column to deals table
-- This allows deals to be featured independently of their partner

-- Add the is_featured column with default value false
ALTER TABLE deals 
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Migrate existing data: copy is_featured from partners to deals
UPDATE deals
SET is_featured = partners.is_featured
FROM partners
WHERE deals.partner_id = partners.id;

-- Add comment to document the column
COMMENT ON COLUMN deals.is_featured IS 'Whether this deal should be featured on the homepage and deals page';
