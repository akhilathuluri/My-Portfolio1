create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  published boolean not null default false,
  read_time text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- Use existing trigger for updated_at
drop trigger if exists trg_blogs_updated_at on public.blogs;
create trigger trg_blogs_updated_at
before update on public.blogs
for each row
execute function public.set_updated_at_timestamp();

alter table public.blogs enable row level security;

-- Policies for public (read only if published)
drop policy if exists "Public reads for published blogs" on public.blogs;
create policy "Public reads for published blogs"
on public.blogs
for select
using (published = true);

-- Policies for authenticated admin (full access)
drop policy if exists "Admin full access to blogs" on public.blogs;
create policy "Admin full access to blogs"
on public.blogs
for all
to authenticated
using (true)
with check (true);
