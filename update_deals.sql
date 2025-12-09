-- Quick Update Script for Existing Deals
-- Run this to add sample data to your existing deals

-- First, add the new columns (run this first)
ALTER TABLE deals ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS package_type TEXT;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS duration_nights INTEGER DEFAULT 4;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS includes_flight BOOLEAN DEFAULT true;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS original_price DECIMAL(10,2);
ALTER TABLE deals ADD COLUMN IF NOT EXISTS location TEXT;

-- Update existing deals with calculated original prices
UPDATE deals 
SET original_price = CASE 
  WHEN discount_percentage IS NOT NULL AND discount_percentage > 0 THEN 
    ROUND((100.0 / (100.0 - discount_percentage)) * 1000, 2)
  WHEN discount_amount IS NOT NULL AND discount_amount > 0 THEN 
    1000 + discount_amount
  ELSE 1299.00
END
WHERE original_price IS NULL;

-- Set default values for other fields
UPDATE deals 
SET 
  duration_nights = 4,
  includes_flight = true
WHERE duration_nights IS NULL OR includes_flight IS NULL;

-- Optional: Update specific deals with custom data
-- Example: Update the first 5 deals with specific package types and locations

-- Deal 1: Paris
UPDATE deals 
SET 
  package_type = 'Romantic Getaway Package',
  location = 'Paris, France',
  image_url = '/images/deals/default-1.jpg',
  duration_nights = 4,
  includes_flight = true
WHERE id = (SELECT id FROM deals ORDER BY created_at LIMIT 1 OFFSET 0);

-- Deal 2: Bali
UPDATE deals 
SET 
  package_type = 'Tropical Paradise Escape',
  location = 'Bali, Indonesia',
  image_url = '/images/deals/default-2.jpg',
  duration_nights = 5,
  includes_flight = true
WHERE id = (SELECT id FROM deals ORDER BY created_at LIMIT 1 OFFSET 1);

-- Deal 3: Tokyo
UPDATE deals 
SET 
  package_type = 'Cultural Discovery Tour',
  location = 'Tokyo, Japan',
  image_url = '/images/deals/default-3.jpg',
  duration_nights = 6,
  includes_flight = true
WHERE id = (SELECT id FROM deals ORDER BY created_at LIMIT 1 OFFSET 2);

-- Deal 4: Santorini
UPDATE deals 
SET 
  package_type = 'Mediterranean Dream',
  location = 'Santorini, Greece',
  image_url = '/images/deals/default-4.jpg',
  duration_nights = 4,
  includes_flight = true
WHERE id = (SELECT id FROM deals ORDER BY created_at LIMIT 1 OFFSET 3);

-- Deal 5: Maldives
UPDATE deals 
SET 
  package_type = 'Luxury Beach Resort',
  location = 'Maldives',
  image_url = '/images/deals/default-5.jpg',
  duration_nights = 7,
  includes_flight = true
WHERE id = (SELECT id FROM deals ORDER BY created_at LIMIT 1 OFFSET 4);

-- Verify the changes
SELECT 
  id, 
  title, 
  package_type, 
  location, 
  duration_nights, 
  includes_flight, 
  original_price, 
  discount_percentage,
  image_url
FROM deals 
ORDER BY created_at 
LIMIT 10;
