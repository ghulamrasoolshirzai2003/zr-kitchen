import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import { menu as staticMenu } from '../data/menuData'
import { dishPhotos } from '../data/dishPhotos'
import {
  staticPhotoByName,
  staticDescByName,
  staticPhotoBySubItem,
  staticDescBySubItem,
} from '../lib/staticPhotoLookup'

function deduplicateNames(categories) {
  return categories.map((cat) => {
    const nameCount = {}
    cat.subsections.forEach((sub) =>
      sub.items.forEach((item) => {
        nameCount[item.name] = (nameCount[item.name] || 0) + 1
      }),
    )
    const hasDups = Object.values(nameCount).some((c) => c > 1)
    if (!hasDups) return cat
    return {
      ...cat,
      subsections: cat.subsections.map((sub) => ({
        ...sub,
        items: sub.items.map((item) =>
          nameCount[item.name] > 1 ? { ...item, name: `${sub.name} — ${item.name}` } : item,
        ),
      })),
    }
  })
}

/**
 * Normalizes the static menu (dishPhotos key -> {src, alt}) to the same shape
 * a Supabase-backed menu item has (a direct photo_url), so Menu.jsx never has
 * to know or care which source it's rendering.
 */
function shapeStaticMenu() {
  return deduplicateNames(
    staticMenu.map((cat) => ({
      ...cat,
      subsections: cat.subsections.map((sub) => ({
        ...sub,
        items: sub.items.map((item) => ({
          ...item,
          photo: item.photo ? dishPhotos[item.photo] ?? null : null,
        })),
      })),
    })),
  )
}

function shapeSupabaseMenu(categories, subsections, items) {
  return deduplicateNames(
    categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      intro: cat.intro,
      subsections: subsections
        .filter((sub) => sub.category_id === cat.id)
        .map((sub) => ({
          id: sub.id,
          name: sub.name,
          note: sub.note,
          items: items
            .filter((item) => item.subsection_id === sub.id)
            .map((item) => {
              const ck = sub.name + '::' + item.name
              return {
                id: item.id,
                name: item.name,
                price: item.price,
                note: item.note,
                description: item.description || (staticDescBySubItem[ck] ?? staticDescByName[item.name] ?? null),
                signature: item.signature,
                isAvailable: item.is_available,
                photo: item.photo_url
                  ? { src: item.photo_url, alt: item.name }
                  : (staticPhotoBySubItem[ck] ?? staticPhotoByName[item.name] ?? null),
              }
            }),
        })),
    })),
  )
}

/**
 * Live menu data from Supabase, reshaped to exactly the structure Menu.jsx
 * already renders. Falls back to the static menuData.js/dishPhotos.js pair
 * whenever Supabase isn't configured yet, or if the fetch fails for any
 * reason — the public site should never go blank because the database had a
 * bad moment.
 */
export function useMenuData() {
  const [menu, setMenu] = useState(() => (isSupabaseConfigured ? null : shapeStaticMenu()))
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [usingLiveData, setUsingLiveData] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined

    let cancelled = false

    async function load() {
      try {
        const [categoriesRes, subsectionsRes, itemsRes] = await Promise.all([
          supabase.from('categories').select('*').order('sort_order'),
          supabase.from('subsections').select('*').order('sort_order'),
          supabase.from('menu_items').select('*').order('sort_order'),
        ])

        const firstError = categoriesRes.error || subsectionsRes.error || itemsRes.error
        if (firstError) throw firstError

        if (!cancelled) {
          setMenu(shapeSupabaseMenu(categoriesRes.data, subsectionsRes.data, itemsRes.data))
          setUsingLiveData(true)
          setLoading(false)
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to load menu from Supabase — falling back to the static menu.', err)
        if (!cancelled) {
          setMenu(shapeStaticMenu())
          setUsingLiveData(false)
          setLoading(false)
        }
      }
    }

    load()

    // Reflects admin menu edits (new dishes, price changes, availability
    // toggles) on the public site immediately, for anyone with the page
    // already open — not just on their next visit.
    const channel = supabase
      .channel('public-menu')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'subsections' }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'menu_items' }, load)
      .subscribe()

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [])

  return { menu, loading, usingLiveData }
}
