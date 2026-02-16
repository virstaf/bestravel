-- Add travel_start_date and travel_end_date columns to deals table
ALTER TABLE deals 
ADD COLUMN IF NOT EXISTS travel_start_date DATE,
ADD COLUMN IF NOT EXISTS travel_end_date DATE;

COMMENT ON COLUMN deals.travel_start_date IS 'The start date of the travel period';
COMMENT ON COLUMN deals.travel_end_date IS 'The end date of the travel period';
