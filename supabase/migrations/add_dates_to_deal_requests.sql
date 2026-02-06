-- Add date columns to deal_requests
alter table deal_requests 
add column if not exists departure_date date,
add column if not exists return_date date;

-- We could also store it as a range type or jsonb, but individual columns are often easier for querying/filtering initially.
-- If we wanted to enforce strict "dates" logic, separate columns are good.
-- "flexible_dates" boolean could be added later as per requirements.
