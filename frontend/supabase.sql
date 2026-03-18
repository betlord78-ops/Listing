create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  symbol text not null,
  contract_address text not null,
  telegram text,
  website text,
  x text,
  description text,
  logo_url text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  link_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists listings_status_idx on listings(status);
create index if not exists listings_featured_idx on listings(featured);
create index if not exists listings_created_at_idx on listings(created_at desc);
create index if not exists banners_active_idx on banners(active);
