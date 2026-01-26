-- Add indexes for subscription management performance
-- These indexes will improve query performance for subscription expiry checks and webhook lookups

-- Index for subscription expiry queries (used by expiry checker)
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_end 
ON profiles(subscription_end) 
WHERE is_subscribed = true;

-- Index for subscription status filtering
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_status 
ON profiles(subscription_status);

-- Index for Stripe customer ID lookups (used by webhooks)
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id 
ON profiles(stripe_customer_id) 
WHERE stripe_customer_id IS NOT NULL;

-- Index for trial tracking
CREATE INDEX IF NOT EXISTS idx_profiles_trial_ends_at 
ON profiles(trial_ends_at) 
WHERE trial_ends_at IS NOT NULL;

-- Composite index for active subscriptions
CREATE INDEX IF NOT EXISTS idx_profiles_active_subscriptions 
ON profiles(is_subscribed, subscription_plan, subscription_end);

-- Add comments for documentation
COMMENT ON INDEX idx_profiles_subscription_end IS 'Improves performance for subscription expiry checks';
COMMENT ON INDEX idx_profiles_subscription_status IS 'Improves performance for filtering by subscription status';
COMMENT ON INDEX idx_profiles_stripe_customer_id IS 'Improves performance for webhook customer lookups';
COMMENT ON INDEX idx_profiles_trial_ends_at IS 'Improves performance for trial expiration checks';
COMMENT ON INDEX idx_profiles_active_subscriptions IS 'Improves performance for active subscription queries';
