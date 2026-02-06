-- Create deal_requests table
create table if not exists deal_requests (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  from_location jsonb not null,
  to_location jsonb not null,
  travel_types text[] not null,
  status text default 'pending' check (status in ('pending', 'processing', 'completed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table deal_requests enable row level security;

-- Policy: Users can view their own requests
create policy "Users can view their own deal requests"
  on deal_requests for select
  using (auth.uid() = user_id);

-- Policy: Users can insert their own requests
create policy "Users can insert their own deal requests"
  on deal_requests for insert
  with check (auth.uid() = user_id);

-- Policy: Admins can view all requests (assuming role check logic exists or handled via service role key in actions)
-- For simplicity, we rely on Service Role key in Server Actions to bypass RLS for admin tasks, 
-- but strict RLS for admins usually involves checking a profiles table or claims.
-- Below is a placeholder if you have an admin role check function:
-- create policy "Admins can view all deal requests"
--   on deal_requests for all
--   using ( exists (select 1 from profiles where id = auth.uid() and role = 'ADMIN') );
