-- SQL Migration for Deals Table Enhancement
-- Add new columns to support the enhanced deal card design

-- Add image_url column for deal-specific images
ALTER TABLE deals 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add package_type column for deal titles (e.g., "Romantic Getaway Package")
ALTER TABLE deals 
ADD COLUMN IF NOT EXISTS package_type TEXT;

-- Add duration_nights column for stay duration
ALTER TABLE deals 
ADD COLUMN IF NOT EXISTS duration_nights INTEGER DEFAULT 4;

-- Add inclusion flags for different service types
ALTER TABLE deals 
ADD COLUMN IF NOT EXISTS includes_flight BOOLEAN DEFAULT true;

ALTER TABLE deals 
ADD COLUMN IF NOT EXISTS includes_hotel BOOLEAN DEFAULT true;

ALTER TABLE deals 
ADD COLUMN IF NOT EXISTS includes_transfer BOOLEAN DEFAULT false;

-- Add original_price column for showing strikethrough pricing
ALTER TABLE deals 
ADD COLUMN IF NOT EXISTS original_price DECIMAL(10,2);

-- Add location column for deal-specific location (can override partner location)
ALTER TABLE deals 
ADD COLUMN IF NOT EXISTS location TEXT;

-- Update existing deals with sample data (optional - customize as needed)
-- This sets default values for existing deals

UPDATE deals 
SET 
  duration_nights = 4,
  includes_flight = true,
  original_price = CASE 
    WHEN discount_percentage IS NOT NULL THEN 
      ROUND((100.0 / (100.0 - discount_percentage)) * 1000)
    WHEN discount_amount IS NOT NULL THEN 
      1000 + discount_amount
    ELSE 1299
  END
WHERE original_price IS NULL;

-- Add comments to document the new columns
COMMENT ON COLUMN deals.image_url IS 'URL to the deal hero image';
COMMENT ON COLUMN deals.package_type IS 'Type/title of the package (e.g., Romantic Getaway Package)';
COMMENT ON COLUMN deals.duration_nights IS 'Number of nights included in the deal';
COMMENT ON COLUMN deals.includes_flight IS 'Whether the deal includes flights';
COMMENT ON COLUMN deals.includes_hotel IS 'Whether the deal includes hotel accommodation';
COMMENT ON COLUMN deals.includes_transfer IS 'Whether the deal includes airport/local transfers';
COMMENT ON COLUMN deals.original_price IS 'Original price before discount for strikethrough display';
COMMENT ON COLUMN deals.location IS 'Deal-specific location (overrides partner location if set)';

-- Sample data insert (optional - remove if not needed)
-- This shows how to insert a complete deal with all new fields

/*
INSERT INTO deals (
  title,
  description,
  partner_id,
  discount_percentage,
  original_price,
  start_date,
  end_date,
  is_active,
  image_url,
  package_type,
  duration_nights,
  includes_flight,
  location,
  promo_code
) VALUES (
  'Paris Romantic Getaway',
  'Experience the magic of Paris with this exclusive travel package. Enjoy comfortable accommodations, convenient flights, and unforgettable memories in one of the world''s most beautiful destinations.',
  'your-partner-id-here',
  51,
  1299.00,
  NOW(),
  NOW() + INTERVAL '90 days',
  true,
  '/images/deals/default-1.jpg',
  'Romantic Getaway Package',
  4,
  true,
  'Paris, France',
  'PARIS51'
);
*/
