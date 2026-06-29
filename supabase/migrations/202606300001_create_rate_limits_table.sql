-- Create a table for strict IP-based rate limiting
create table if not exists public.api_rate_limits (
  ip_address text primary key,
  usage_count integer not null default 1,
  reset_at timestamp with time zone not null
);

-- Enable RLS
alter table public.api_rate_limits enable row level security;

-- No policies for public access. 
-- Only the service_role key will be able to read/write to this table from the secure API routes.
