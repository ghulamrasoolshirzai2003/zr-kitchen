import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { staticPhotoByName, staticPhotoBySubItem } from '../lib/staticPhotoLookup'
import AdminMenuItemForm from './AdminMenuItemForm'

function InlineNameForm({ placeholder, onSubmit, onCancel }) {
  const [value, setValue] = useState('')
  return (
    <form
      className="admin-menu__inline-form"
      onSubmit={(e) => {
        e.preventDefault()
        if (value.trim()) onSubmit(value.trim())
      }}
    >
      <input autoFocus value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} />
      <button type="submit" className="btn btn-primary">
        Save
      </button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  )
}

function getItemThumb(item, subName) {
  if (item.photo_url) return item.photo_url
  const ck = subName + '::' + item.name
  const fallback = staticPhotoBySubItem[ck] ?? staticPhotoByName[item.name]
  return fallback?.src ?? null
}

export default function AdminMenu() {
  const [categories, setCategories] = useState([])
  const [subsections, setSubsections] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState(null)
  const [addingSubsectionTo, setAddingSubsectionTo] = useState(null)
  const [addingCategory, setAddingCategory] = useState(false)
  const [search, setSearch] = useState('')

  const load = useCallback(async () => {
    const [c, s, i] = await Promise.all([
      supabase.from('categories').select('*').order('sort_order'),
      supabase.from('subsections').select('*').order('sort_order'),
      supabase.from('menu_items').select('*').order('sort_order'),
    ])
    setCategories(c.data ?? [])
    setSubsections(s.data ?? [])
    setItems(i.data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const addCategory = async (name) => {
    await supabase.from('categories').insert({ name, sort_order: categories.length })
    setAddingCategory(false)
    load()
  }

  const renameCategory = async (cat) => {
    const name = window.prompt('Category name', cat.name)
    if (!name || !name.trim()) return
    await supabase.from('categories').update({ name: name.trim() }).eq('id', cat.id)
    load()
  }

  const deleteCategory = async (cat) => {
    const catSubs = subsections.filter((s) => s.category_id === cat.id)
    const itemCount = items.filter((i) => catSubs.some((s) => s.id === i.subsection_id)).length
    const warning = `Delete "${cat.name}"? This also deletes ${catSubs.length} section(s) and ${itemCount} dish(es) inside it. This can't be undone.`
    if (!window.confirm(warning)) return
    await supabase.from('categories').delete().eq('id', cat.id)
    load()
  }

  const addSubsection = async (categoryId, name) => {
    const sort_order = subsections.filter((s) => s.category_id === categoryId).length
    await supabase.from('subsections').insert({ category_id: categoryId, name, sort_order })
    setAddingSubsectionTo(null)
    load()
  }

  const renameSubsection = async (sub) => {
    const name = window.prompt('Section name', sub.name)
    if (!name || !name.trim()) return
    await supabase.from('subsections').update({ name: name.trim() }).eq('id', sub.id)
    load()
  }

  const deleteSubsection = async (sub) => {
    const itemCount = items.filter((i) => i.subsection_id === sub.id).length
    const warning = `Delete "${sub.name}"? This also deletes ${itemCount} dish(es) inside it. This can't be undone.`
    if (!window.confirm(warning)) return
    await supabase.from('subsections').delete().eq('id', sub.id)
    load()
  }

  const deleteItem = async (item) => {
    if (!window.confirm(`Delete "${item.name}"? This can't be undone.`)) return
    await supabase.from('menu_items').delete().eq('id', item.id)
    load()
  }

  const toggleAvailable = async (item) => {
    await supabase.from('menu_items').update({ is_available: !item.is_available }).eq('id', item.id)
    load()
  }

  const query = search.trim().toLowerCase()

  const matchingItemIds = useMemo(() => {
    if (!query) return null
    const ids = new Set()
    items.forEach((item) => {
      if (item.name.toLowerCase().includes(query)) ids.add(item.id)
    })
    return ids
  }, [query, items])

  const visibleCategories = useMemo(() => {
    if (!matchingItemIds) return categories
    return categories.filter((cat) => {
      const catSubs = subsections.filter((s) => s.category_id === cat.id)
      return catSubs.some((sub) => items.some((i) => i.subsection_id === sub.id && matchingItemIds.has(i.id)))
    })
  }, [matchingItemIds, categories, subsections, items])

  if (loading) return <p className="admin-orders__loading">Loading menu…</p>

  return (
    <div className="admin-menu">
      <div className="admin-menu__header">
        <h1>Menu</h1>
        {!addingCategory ? (
          <button type="button" className="btn btn-outline" onClick={() => setAddingCategory(true)}>
            + Add Category
          </button>
        ) : (
          <InlineNameForm placeholder="Category name" onSubmit={addCategory} onCancel={() => setAddingCategory(false)} />
        )}
      </div>

      <div className="admin-menu__search">
        <input
          type="search"
          placeholder="Search dishes…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-menu__search-input"
        />
        {search && (
          <button type="button" className="admin-menu__search-clear" onClick={() => setSearch('')}>
            &times;
          </button>
        )}
      </div>

      {query && matchingItemIds?.size === 0 && (
        <p className="admin-menu__no-results">No dishes found for "{search.trim()}"</p>
      )}

      {visibleCategories.map((cat) => {
        const catSubsections = subsections.filter((s) => s.category_id === cat.id)
        return (
          <section key={cat.id} className="admin-menu__category">
            <div className="admin-menu__category-header">
              <h2>{cat.name}</h2>
              <div className="admin-menu__row-actions">
                <button type="button" onClick={() => renameCategory(cat)}>
                  Rename
                </button>
                <button type="button" onClick={() => deleteCategory(cat)} className="admin-menu__delete">
                  Delete
                </button>
              </div>
            </div>

            {catSubsections.map((sub) => {
              const allSubItems = items.filter((i) => i.subsection_id === sub.id)
              const subItems = matchingItemIds
                ? allSubItems.filter((i) => matchingItemIds.has(i.id))
                : allSubItems
              if (matchingItemIds && subItems.length === 0) return null
              const isAddingHere = editingItem?.subsectionId === sub.id && editingItem.item === null
              return (
                <div key={sub.id} className="admin-menu__subsection">
                  <div className="admin-menu__subsection-header">
                    <h3>{sub.name}</h3>
                    <div className="admin-menu__row-actions">
                      <button type="button" onClick={() => renameSubsection(sub)}>
                        Rename
                      </button>
                      <button type="button" onClick={() => deleteSubsection(sub)} className="admin-menu__delete">
                        Delete
                      </button>
                    </div>
                  </div>

                  <ul className="admin-menu__items">
                    {subItems.map((item) => {
                      const isEditingThis = editingItem?.item?.id === item.id
                      const thumb = getItemThumb(item, sub.name)
                      return (
                        <li key={item.id} className="admin-menu__item">
                          {isEditingThis ? (
                            <AdminMenuItemForm
                              item={item}
                              onSaved={() => {
                                setEditingItem(null)
                                load()
                              }}
                              onCancel={() => setEditingItem(null)}
                            />
                          ) : (
                            <>
                              {thumb && <img src={thumb} alt="" className="admin-menu__item-thumb" />}
                              <div className="admin-menu__item-info">
                                <span className="admin-menu__item-name">
                                  {item.name}
                                  {item.signature && <span className="admin-menu__badge">Signature</span>}
                                  {!item.is_available && <span className="admin-menu__badge admin-menu__badge--off">Unavailable</span>}
                                </span>
                                <span className="admin-menu__item-price">{item.price}</span>
                              </div>
                              <div className="admin-menu__row-actions">
                                <button type="button" onClick={() => toggleAvailable(item)}>
                                  {item.is_available ? 'Mark Unavailable' : 'Mark Available'}
                                </button>
                                <button type="button" onClick={() => setEditingItem({ subsectionId: sub.id, item })}>
                                  Edit
                                </button>
                                <button type="button" onClick={() => deleteItem(item)} className="admin-menu__delete">
                                  Delete
                                </button>
                              </div>
                            </>
                          )}
                        </li>
                      )
                    })}
                  </ul>

                  {!matchingItemIds && (isAddingHere ? (
                    <AdminMenuItemForm
                      subsectionId={sub.id}
                      nextSortOrder={allSubItems.length}
                      onSaved={() => {
                        setEditingItem(null)
                        load()
                      }}
                      onCancel={() => setEditingItem(null)}
                    />
                  ) : (
                    <button
                      type="button"
                      className="admin-menu__add-item"
                      onClick={() => setEditingItem({ subsectionId: sub.id, item: null })}
                    >
                      + Add Dish
                    </button>
                  ))}
                </div>
              )
            })}

            {!matchingItemIds && (addingSubsectionTo === cat.id ? (
              <InlineNameForm
                placeholder="Section name"
                onSubmit={(name) => addSubsection(cat.id, name)}
                onCancel={() => setAddingSubsectionTo(null)}
              />
            ) : (
              <button type="button" className="admin-menu__add-subsection" onClick={() => setAddingSubsectionTo(cat.id)}>
                + Add Section
              </button>
            ))}
          </section>
        )
      })}
    </div>
  )
}
