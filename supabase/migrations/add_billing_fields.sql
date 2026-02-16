-- Add billing information fields to profiles table
-- Migration: add_billing_fields
-- Created: 2026-01-29

-- Add date of birth
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS date_of_birth DATE;

-- Add billing address fields
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address_line1 TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address_line2 TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS postal_code TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS billing_country TEXT;

-- Phone field should already exist from previous migrations
-- If not, uncomment the line below:
-- ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone TEXT;

-- Add comment for documentation
COMMENT ON COLUMN profiles.date_of_birth IS 'User date of birth - required for flight bookings';
COMMENT ON COLUMN profiles.address_line1 IS 'Primary address line - required for billing';
COMMENT ON COLUMN profiles.address_line2 IS 'Secondary address line - optional';
COMMENT ON COLUMN profiles.city IS 'City or town - required for billing';
COMMENT ON COLUMN profiles.postal_code IS 'Postal/ZIP code - required for billing';
COMMENT ON COLUMN profiles.billing_country IS 'Billing country - may differ from home_country';
