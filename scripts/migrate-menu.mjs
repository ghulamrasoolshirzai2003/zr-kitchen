// ZR Kitchen — one-time menu migration script.
//
// Pushes everything currently hardcoded in src/data/menuData.js into your
// Supabase database, uploading the real dish photos (from src/assets/dishes)
// to Supabase Storage along the way so the live site looks identical to how
// it looks today once you switch it over to live data.
//
// RUN ONCE, after you've already run supabase/schema.sql in the Supabase SQL
// editor:
//
//   node --env-file=.env.migrate scripts/migrate-menu.mjs
//
// Needs its own .env.migrate file (separate from the app's .env!) with:
//   SUPABASE_URL=...
//   SUPABASE_SERVICE_ROLE_KEY=...
//
// The service role key is found in Project Settings → API → "service_role".
// It bypasses Row Level Security, which this script needs to write admin-only
// tables — but that also makes it very sensitive. Never put it in the app's
// regular .env, never commit .env.migrate, never ship it to the browser.
//
// The "menu-photos" Storage bucket is created automatically by this script
// if it doesn't already exist — no manual dashboard step needed.

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { menu } from '../src/data/menuData.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DISHES_DIR = path.join(__dirname, '../src/assets/dishes')

const SUPABASE_URL = process.env.SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY — see the comment at the top of this file.')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

// Mirrors src/data/dishPhotos.js exactly: local files get uploaded to
// Storage; stock entries just carry their existing Unsplash URL through as-is.
const LOCAL_PHOTOS = {
  'briyani-ayam': 'briyani-ayam.jpg',
  'briyani-daging': 'briyani-daging.jpg',
  'briyani-ayam-tandori': 'briyani-ayam-tandori.jpg',
  'briyani-lamb-shank': 'briyani-lamb-shank.jpg',
  'pulau-kambing': 'pulau-kambing.jpg',
  'pulau-ayam': 'pulau-ayam.jpg',
  'pulau-daging': 'pulau-daging.jpg',
  'set-talam': 'set-talam.jpg',
  'ayam-karahi': 'ayam-karahi.jpg',
  'capati-dhal': 'capati-dhal.jpg',
  'capati-ayam': 'capati-ayam.jpg',
  'naan-biasa': 'naan-biasa.jpg',
  'naan-garlic': 'naan-garlic.jpg',
  'naan-cheese': 'naan-cheese.jpg',
  'naan-cheese-garlic': 'naan-cheese-garlic.jpg',
  'naan-cheese-leleh': 'naan-cheese-leleh.jpg',
  'naan-special': 'naan-special.jpg',
  'ayam-tandoori-roti': 'ayam-tandoori-roti.jpg',
  'chapli-kebab': 'chapli-kebab.jpg',
  'ng-ayam': 'ng-ayam.jpg',
  'ng-seafood': 'ng-seafood.jpg',
  'ng-usa': 'ng-usa.jpg',
  'mee-kari': 'mee-kari.jpg',
  'kerabu-megi-biasa': 'kerabu-megi-biasa.jpg',
  'ayam-daging-merah': 'ayam-daging-merah.jpg',
  'sup-daging': 'sup-daging.jpg',
  'tomyam-seafood': 'tomyam-seafood.jpg',
  'telur-bungkus': 'telur-bungkus.jpg',
  'kambing-semangkuk': 'kambing-semangkuk.jpg',
  teh: 'teh-tarik.jpg',
}

const u = (id, w = 1600) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`
const STOCK_PHOTOS = {
  'capati-kambing': u('photo-1678969406353-ead12b1f258a'),
  'seekh-kebab-naan-board': u('photo-1781332143834-19a40f746cd9'),
  'kk-seafood': u('photo-1555126634-323283e090fa'),
  'kerabu-megi-seafood': u('photo-1584913394604-47399f277ad4'),
  'combo-4in1': u('photo-1694853651800-3e9b4aa96a42'),
  'jus-oren': u('photo-1600271886742-f049cd451bba'),
  'bihun-sup': u('photo-1512003867696-6d5ce6835040'),
  'kangkung-belacan': u('photo-1707270686208-5d1fc168dd7b'),
  'sayur-campur': u('photo-1628025114288-1693ac3bcac1'),
  'popcorn-chicken': u('photo-1767469576675-0c02a8d66f4c'),
  fries: u('photo-1630384060421-cb20d0e0649d'),
  'sup-tulang': u('photo-1469307517101-0b99d8fb0c33'),
  'telur-mata': u('photo-1691480184494-d9f822edd4d1'),
  'tomyam-ayam': u('photo-1628428798909-75a2d42a557e'),
}

const uploadedUrlCache = new Map()

async function resolvePhotoUrl(photoKey) {
  if (!photoKey) return null
  if (STOCK_PHOTOS[photoKey]) return STOCK_PHOTOS[photoKey]
  if (!LOCAL_PHOTOS[photoKey]) return null
  if (uploadedUrlCache.has(photoKey)) return uploadedUrlCache.get(photoKey)

  const filename = LOCAL_PHOTOS[photoKey]
  const fileBuffer = readFileSync(path.join(DISHES_DIR, filename))
  const storagePath = `menu/${filename}`

  const { error: uploadError } = await supabase.storage
    .from('menu-photos')
    .upload(storagePath, fileBuffer, { contentType: 'image/jpeg', upsert: true })
  if (uploadError) throw new Error(`Upload failed for ${filename}: ${uploadError.message}`)

  const { data } = supabase.storage.from('menu-photos').getPublicUrl(storagePath)
  uploadedUrlCache.set(photoKey, data.publicUrl)
  return data.publicUrl
}

async function ensurePhotoBucketExists() {
  const { data: buckets, error } = await supabase.storage.listBuckets()
  if (error) throw error
  if (buckets.some((b) => b.name === 'menu-photos')) return

  const { error: createError } = await supabase.storage.createBucket('menu-photos', { public: true })
  if (createError) throw createError
  console.log('Created public Storage bucket "menu-photos".')
}

async function run() {
  await ensurePhotoBucketExists()

  console.log(`Migrating ${menu.length} categories…`)

  for (const [catIndex, category] of menu.entries()) {
    const { data: catRow, error: catError } = await supabase
      .from('categories')
      .insert({ name: category.name, intro: category.intro ?? null, sort_order: catIndex })
      .select()
      .single()
    if (catError) throw catError

    for (const [subIndex, sub] of category.subsections.entries()) {
      const { data: subRow, error: subError } = await supabase
        .from('subsections')
        .insert({ category_id: catRow.id, name: sub.name, note: sub.note ?? null, sort_order: subIndex })
        .select()
        .single()
      if (subError) throw subError

      for (const [itemIndex, item] of sub.items.entries()) {
        const photoUrl = await resolvePhotoUrl(item.photo)
        const { error: itemError } = await supabase.from('menu_items').insert({
          subsection_id: subRow.id,
          name: item.name,
          price: item.price,
          note: item.note ?? null,
          description: item.description ?? null,
          photo_url: photoUrl,
          signature: Boolean(item.signature),
          sort_order: itemIndex,
        })
        if (itemError) throw itemError
      }
    }
    console.log(`  ✓ ${category.name}`)
  }

  console.log('\nDone migrating the menu.')
  console.log(
    'Next: add your real tables in the Supabase Table Editor under "restaurant_tables" ' +
      '(number + label for each) so the ordering dropdown has options — a proper admin page ' +
      'for this ships in Phase 3.',
  )
}

run().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
