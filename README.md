# ZR Kitchen — Website + QR Ordering

A site for ZR Kitchen (Kampung Seriab, Kangar, Perlis) — React + Vite, Framer Motion for
scroll animations, plain CSS design tokens for the dark/gold look, and (as of Phase 1) a
Supabase-backed table-ordering system with a live admin dashboard.

**Two independent halves:**
- The public marketing site (`/`) works today, no setup required — it currently reads
  from `src/data/menuData.js`.
- The ordering + admin system (`/admin`) is real code, but **stays inactive** until you
  do the one-time Supabase setup below. Until then the site behaves exactly as a plain
  marketing site: no cart button, no order buttons, `/admin` shows a "not connected yet"
  message. Nothing breaks in the meantime.

## Running it

```bash
npm install
npm run dev
```

Then open the printed `localhost` URL. For a production build:

```bash
npm run build
npm run preview   # serve the built dist/ locally to sanity-check it
```

`dist/` is a static site — deploy it to Vercel, Netlify, or any static host. `_redirects`
(Netlify) and `vercel.json` (Vercel) are already included so deep links like `/admin`
work correctly after deployment, not just on localhost.

## Project structure

```
src/
  data/          menuData.js (the menu, used as a fallback even after Supabase is live),
                 dishPhotos.js, testimonials.js
  components/    marketing site sections, one component + matching .css per section
  hooks/         useMenuData.js — live Supabase menu with a static fallback
  context/       CartContext.jsx — the guest's in-progress order
  lib/           supabaseClient.js
  pages/         AdminLogin / AdminLayout / AdminOrders — the /admin app
supabase/
  schema.sql     run this once in the Supabase SQL editor to create everything
scripts/
  migrate-menu.mjs   one-time script: pushes menuData.js into Supabase
```

## Setting up ordering + admin (Phase 1)

1. **Create a Supabase project** at supabase.com (free tier is enough to start).
2. **Run the schema.** Open your project → SQL Editor → New query, paste in the entire
   contents of `supabase/schema.sql`, run it. This creates every table and the security
   rules that keep guest orders private from other guests and menu/table edits admin-only.
3. **Create your admin login.** Authentication → Users → Add user. This one email +
   password is the only login `/admin` accepts.
4. **Connect the site.** Copy `.env.example` to `.env`. In your Supabase project, go to
   Project Settings → API and copy the "Project URL" and the "anon public" key into it:
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   ```
   Restart `npm run dev` — the cart button and `/admin` login should now appear/work.
5. **Migrate the menu so the live site looks the same as it does today:**
   - In Storage, create a new bucket named exactly `menu-photos`, marked **Public**.
   - Create a *second*, separate env file `.env.migrate` (never commit this) with:
     ```
     SUPABASE_URL=...
     SUPABASE_SERVICE_ROLE_KEY=...
     ```
     The service role key is also under Project Settings → API — keep it secret, it
     bypasses all the security rules from step 2. It's only ever used from this local
     script, never shipped to the browser.
   - Run it once: `node --env-file=.env.migrate scripts/migrate-menu.mjs`
   - This uploads all your real dish photos to Supabase Storage and inserts every menu
     item, preserving the exact structure and photos the site has today.
6. **Add your tables.** Phase 1 doesn't have an admin screen for this yet (that's
   Phase 3) — for now, open the Supabase Table Editor → `restaurant_tables` and add a
   row per physical table (a `number`, optionally a `label`). These populate the
   table-number dropdown guests see when ordering.
7. **Print your QR code.** One QR code, the same on every table, pointing at your site's
   URL. There's no per-table code to manage — generate it with:
   ```
   node scripts/generate-qr.mjs https://your-real-domain.com
   ```
   Re-run this if your domain ever changes.

Once steps 1–6 are done, reload the site: the menu now comes from Supabase (still looks
identical), a "Your Order" button appears, and orders placed on the public site show up
live at `/admin`.

## Updating the menu

**Before Supabase is connected:** everything lives in `src/data/menuData.js`, same as
before — edit item objects directly, no other file needs to change.

**After Supabase is connected:** the site reads from the database instead, so edits to
`menuData.js` no longer affect the live site. A proper "edit the menu from `/admin`"
screen is Phase 2 of the roadmap below; until then, edit rows directly in the Supabase
Table Editor (`menu_items`, `subsections`, `categories`).

## Roadmap (agreed, not built yet)

Phase 1 (this build) is the ordering pipeline itself: guest orders → live on `/admin` →
staff move it through Received → Preparing → Ready → Served, or delete it.

- **Phase 2:** menu management from `/admin` — add/edit/delete dishes with photo upload,
  no more editing Supabase tables by hand.
- **Phase 3:** table management from `/admin` (add/remove tables) + a "Print QR" page.
- **Phase 4:** offers/promotions manager + a section on the public site.
- **Phase 5:** a "Leave us a review" prompt shown once an order is marked served,
  linking straight to your Google review page.

## Reservations form

`src/components/Reservations.jsx` is separate from table ordering — it's for advance
bookings, still front-end only: submitting it opens a pre-filled `mailto:` draft to
`restaurantInfo.email` and logs to the console. Nothing sends automatically.

## Other things worth knowing

- `src/data/testimonials.js` — every quote is a placeholder written for this build, not
  a real review. Replace before launch.
- `src/components/Location.jsx` — the embedded map uses a text-query geocode of your
  address; for a pinpoint-accurate pin, swap in the real embed URL from your Google
  Business Profile.
- Search `TODO(owner)` across the project for anything else flagged as needing a real
  value from you rather than a guess.

## Design system

Colors, type, and spacing are CSS custom properties in `src/styles/index.css`
(`:root`). The palette is deliberately fixed dark/gold — it doesn't switch with the
visitor's OS light/dark preference, since that's a brand choice for a fine-dining site,
not a UI default.
