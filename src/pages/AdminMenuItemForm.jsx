import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9.-]/g, '_')
}

async function uploadPhoto(file) {
  const path = `menu/${crypto.randomUUID()}-${sanitizeFilename(file.name)}`
  const { error } = await supabase.storage.from('menu-photos').upload(path, file, { contentType: file.type })
  if (error) throw error
  const { data } = supabase.storage.from('menu-photos').getPublicUrl(path)
  return data.publicUrl
}

// Reused for both "add a new dish" (item is null, subsectionId/nextSortOrder
// given) and "edit an existing dish" (item given).
export default function AdminMenuItemForm({ subsectionId, nextSortOrder, item, onSaved, onCancel }) {
  const isNew = !item
  const [name, setName] = useState(item?.name ?? '')
  const [price, setPrice] = useState(item?.price ?? '')
  const [note, setNote] = useState(item?.note ?? '')
  const [description, setDescription] = useState(item?.description ?? '')
  const [isAvailable, setIsAvailable] = useState(item?.is_available ?? true)
  const [photoUrl, setPhotoUrl] = useState(item?.photo_url ?? null)
  const [photoFile, setPhotoFile] = useState(null)
  const [removePhoto, setRemovePhoto] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !price.trim()) {
      setError('Name and price are required.')
      return
    }
    setSaving(true)
    setError('')
    try {
      let finalPhotoUrl = photoUrl
      if (photoFile) {
        finalPhotoUrl = await uploadPhoto(photoFile)
      } else if (removePhoto) {
        finalPhotoUrl = null
      }

      const payload = {
        name: name.trim(),
        price: price.trim(),
        note: note.trim() || null,
        description: description.trim() || null,
        // A photo is what makes a dish show as a full card on the menu — no
        // separate flag to remember, it just follows whether one's attached.
        signature: Boolean(finalPhotoUrl),
        is_available: isAvailable,
        photo_url: finalPhotoUrl,
      }

      const { error: saveError } = isNew
        ? await supabase.from('menu_items').insert({ ...payload, subsection_id: subsectionId, sort_order: nextSortOrder })
        : await supabase.from('menu_items').update(payload).eq('id', item.id)
      if (saveError) throw saveError

      onSaved()
    } catch (err) {
      setError(err.message || 'Something went wrong saving this dish.')
      setSaving(false)
    }
  }

  return (
    <form className="admin-menu-item-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Price
        <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="RM 15.00" required />
      </label>
      <label>
        Note (optional)
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Spicy" />
      </label>
      <label>
        Description (optional)
        <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label className="admin-menu-item-form__checkbox">
        <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />
        Available today
      </label>
      <label>
        Photo — dishes with a photo show as a full card on the menu; without one, just a price line
        {photoUrl && !photoFile && !removePhoto && (
          <>
            <img src={photoUrl} alt="" className="admin-menu-item-form__preview" />
            <button type="button" className="admin-menu-item-form__remove-photo" onClick={() => setRemovePhoto(true)}>
              Remove photo
            </button>
          </>
        )}
        <input type="file" accept="image/*" onChange={(e) => { setPhotoFile(e.target.files?.[0] ?? null); setRemovePhoto(false) }} />
      </label>

      {error && <p className="admin-menu-item-form__error">{error}</p>}

      <div className="admin-menu-item-form__actions">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button type="button" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </form>
  )
}
