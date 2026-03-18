# SpyTON Listings Lite

A simple TON-only listings site built with Next.js + Supabase.

## Features
- Home page with featured listings, new listings, and one ad banner
- Submit listing form
- Token details page
- Simple admin panel with password gate
- Supabase-backed listings + banners

## 1) Create Supabase tables
Run the SQL in `supabase.sql`.

## 2) Set environment variables
Copy `.env.example` to `.env.local` and fill in:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `ADMIN_PASSWORD`

## 3) Install and run
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Notes
- This is a lightweight starter.
- Admin auth is a simple password gate stored in a cookie. Replace it with a stronger auth flow later.
- Listings are for TON only.
