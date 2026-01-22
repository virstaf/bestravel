-- Add onboarding fields to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS home_country TEXT,
ADD COLUMN IF NOT EXISTS preferred_destinations TEXT[],
ADD COLUMN IF NOT EXISTS travel_frequency TEXT,
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS membership_tier TEXT DEFAULT 'Gold';

-- Create index for faster queries on onboarding status
CREATE INDEX IF NOT EXISTS idx_profiles_onboarding_completed 
ON profiles(onboarding_completed);

-- Add comment for documentation
COMMENT ON COLUMN profiles.home_country IS 'User''s home country selected during onboarding';
COMMENT ON COLUMN profiles.preferred_destinations IS 'Array of preferred travel destinations (capped at 3-5)';
COMMENT ON COLUMN profiles.travel_frequency IS 'How often user travels: 1-2 trips/year, 3-5 trips/year, or Frequent traveler';
COMMENT ON COLUMN profiles.onboarding_completed IS 'Whether user has completed the onboarding flow';
COMMENT ON COLUMN profiles.membership_tier IS 'User membership tier (e.g., Gold, Silver, Platinum)';
