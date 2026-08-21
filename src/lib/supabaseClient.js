import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

if (!isSupabaseConfigured) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase is not configured (missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). ' +
      'The site is running on the static menu in src/data/menuData.js, and ordering/admin are disabled. ' +
      'See .env.example.',
  )
}

// `supabase` is null when not configured — every caller must check
// `isSupabaseConfigured` (or handle a null client) rather than assume it exists.
export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null
