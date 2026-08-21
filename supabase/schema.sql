-- ZR Kitchen — Phase 1 database schema
--
-- HOW TO RUN THIS:
--   1. Go to your Supabase project → SQL Editor → New query.
--   2. Paste this entire file in and click "Run". It only needs to be run once.
--   3. Then go to Authentication → Users → Add user, and create the one admin
--      login (email + password) you want to use for /admin.
--   4. Go to Project Settings → API and copy the "Project URL" and the
--      "anon public" key into your .env file (see .env.example).

create extension if not exists "pgcrypto";

-- ---------- Menu content ----------

create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  intro text,
  sort_order int not null default 0
);

create table subsections (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id) on delete cascade,
  name text not null,
  note text,
  sort_order int not null default 0
);

create table menu_items (
  id uuid primary key default gen_random_uuid(),
  subsection_id uuid not null references subsections(id) on delete cascade,
  name text not null,
  price text not null,
  note text,
  description text,
  photo_url text,
  signature boolean not null default false,
  is_available boolean not null default true,
  sort_order int not null default 0
);

-- ---------- Tables & ordering ----------

create table restaurant_tables (
  id uuid primary key default gen_random_uuid(),
  number int not null unique,
  label text,
  is_active boolean not null default true,
  sort_order int not null default 0
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  table_id uuid not null references restaurant_tables(id),
  status text not null default 'received' check (status in ('received', 'preparing', 'ready', 'served')),
  notes text,
  customer_name text,
  customer_email text,
  customer_phone text,
  created_at timestamptz not null default now()
);

-- item_name_snapshot / item_price_snapshot freeze what was actually ordered,
-- so editing or deleting a menu item later never changes past orders.
create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  menu_item_id uuid references menu_items(id) on delete set null,
  item_name_snapshot text not null,
  item_price_snapshot text not null,
  quantity int not null default 1 check (quantity > 0),
  notes text
);

-- ---------- Row Level Security ----------

alter table categories enable row level security;
alter table subsections enable row level security;
alter table menu_items enable row level security;
alter table restaurant_tables enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Anyone (guests, no login) can read the menu and the active table list.
create policy "public read categories" on categories for select using (true);
create policy "public read subsections" on subsections for select using (true);
-- Unavailable items still read publicly — the site shows them dimmed with a
-- "not available today" badge rather than hiding them, so guests still see
-- the full menu.
create policy "public read menu_items" on menu_items for select using (true);
create policy "public read active tables" on restaurant_tables for select using (is_active = true);

-- Anyone can create an order, but cannot read, edit, or delete orders —
-- that's admin-only, so a guest can never see another table's order.
create policy "public insert orders" on orders for insert with check (true);
create policy "public insert order_items" on order_items for insert with check (true);

-- The one authenticated admin account has full read/write on everything.
create policy "admin full access categories" on categories for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access subsections" on subsections for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access menu_items" on menu_items for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access tables" on restaurant_tables for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access orders" on orders for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access order_items" on order_items for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ---------- Realtime ----------
-- Lets the admin orders dashboard update instantly when a new order comes in,
-- instead of having to refresh the page.
alter publication supabase_realtime add table orders;
alter publication supabase_realtime add table order_items;

-- Lets the public menu update instantly for anyone already browsing when the
-- admin edits a dish, adds one, or marks something unavailable (Phase 2).
alter publication supabase_realtime add table categories;
alter publication supabase_realtime add table subsections;
alter publication supabase_realtime add table menu_items;

-- Lets the public tables dropdown update instantly when tables are added/removed (Phase 3).
alter publication supabase_realtime add table restaurant_tables;

-- ---------- Storage (Phase 2: menu photo uploads) ----------
-- The "menu-photos" bucket is created public by scripts/migrate-menu.mjs,
-- which exempts plain reads (GET) from RLS — but writes to storage.objects
-- are still RLS-governed regardless of the bucket's public flag, so the
-- admin's menu manager needs explicit policies to upload/replace/remove photos.
create policy "admin insert menu photos" on storage.objects for insert
  with check (bucket_id = 'menu-photos' and auth.role() = 'authenticated');
create policy "admin update menu photos" on storage.objects for update
  using (bucket_id = 'menu-photos' and auth.role() = 'authenticated');
create policy "admin delete menu photos" on storage.objects for delete
  using (bucket_id = 'menu-photos' and auth.role() = 'authenticated');

-- ---------- Active tables function (Phase 3: table occupancy warning) ----------
-- Returns only the table_ids that have active (non-served) orders.
-- Called by the public ordering page so it can warn customers that a table
-- already has an order in progress — without exposing any order details.
create or replace function get_active_table_ids()
returns setof uuid
language sql
security definer
as $$
  select distinct table_id
  from orders
  where status in ('received', 'preparing', 'ready');
$$;

grant execute on function get_active_table_ids() to anon;
