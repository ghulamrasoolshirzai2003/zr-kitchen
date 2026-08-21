import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function AdminTables() {
  const [tables, setTables] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editNumber, setEditNumber] = useState('')
  const [editLabel, setEditLabel] = useState('')
  const [addingNew, setAddingNew] = useState(false)
  const [newNumber, setNewNumber] = useState('')
  const [newLabel, setNewLabel] = useState('')

  const loadTables = useCallback(async () => {
    const { data, error } = await supabase
      .from('restaurant_tables')
      .select('*')
      .order('sort_order, number')
    if (!error) setTables(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadTables()

    const channel = supabase
      .channel('admin-tables')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'restaurant_tables' }, loadTables)
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [loadTables])

  const handleAdd = async () => {
    if (!newNumber.trim()) return
    const tableNum = parseInt(newNumber, 10)
    if (isNaN(tableNum) || tableNum < 1) {
      alert('Table number must be a positive integer')
      return
    }

    const { error } = await supabase
      .from('restaurant_tables')
      .insert({
        number: tableNum,
        label: newLabel.trim() || null,
        is_active: true,
        sort_order: Math.max(...tables.map(t => t.sort_order), -1) + 1,
      })

    if (error) {
      alert(`Error: ${error.message}`)
    } else {
      setNewNumber('')
      setNewLabel('')
      setAddingNew(false)
    }
  }

  const handleEditStart = (table) => {
    setEditingId(table.id)
    setEditNumber(table.number.toString())
    setEditLabel(table.label || '')
  }

  const handleEditSave = async (tableId) => {
    const tableNum = parseInt(editNumber, 10)
    if (isNaN(tableNum) || tableNum < 1) {
      alert('Table number must be a positive integer')
      return
    }

    const { error } = await supabase
      .from('restaurant_tables')
      .update({
        number: tableNum,
        label: editLabel.trim() || null,
      })
      .eq('id', tableId)

    if (error) {
      alert(`Error: ${error.message}`)
    } else {
      setEditingId(null)
    }
  }

  const handleToggleActive = async (tableId, isActive) => {
    const { error } = await supabase
      .from('restaurant_tables')
      .update({ is_active: !isActive })
      .eq('id', tableId)

    if (error) alert(`Error: ${error.message}`)
  }

  const handleDelete = async (tableId, number) => {
    if (!confirm(`Delete table ${number}? This cannot be undone.`)) return

    const { error } = await supabase
      .from('restaurant_tables')
      .delete()
      .eq('id', tableId)

    if (error) alert(`Error: ${error.message}`)
  }

  if (loading) return <div className="admin-shell__main"><p>Loading tables…</p></div>

  return (
    <div className="admin-tables">
      <div className="admin-tables__header">
        <h2>Restaurant Tables</h2>
        <p className="admin-tables__subtitle">Add or remove tables from the ordering dropdown</p>
      </div>

      {!addingNew && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setAddingNew(true)}
          style={{ marginBottom: 'var(--space-6)' }}
        >
          + Add Table
        </button>
      )}

      {addingNew && (
        <div className="admin-tables__add-row">
          <div className="admin-tables__row-inputs">
            <input
              type="number"
              placeholder="Table number"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
              className="admin-tables__input"
              min="1"
              autoFocus
            />
            <input
              type="text"
              placeholder="Label (optional)"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              className="admin-tables__input"
            />
          </div>
          <div className="admin-tables__row-actions">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleAdd}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setAddingNew(false)
                setNewNumber('')
                setNewLabel('')
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="admin-tables__list">
        {tables.length === 0 ? (
          <p className="admin-tables__empty">No tables yet. Add one to get started.</p>
        ) : (
          tables.map((table) => (
            <div key={table.id} className={`admin-tables__row${!table.is_active ? ' admin-tables__row--inactive' : ''}`}>
              {editingId === table.id ? (
                <>
                  <div className="admin-tables__row-inputs">
                    <input
                      type="number"
                      value={editNumber}
                      onChange={(e) => setEditNumber(e.target.value)}
                      className="admin-tables__input"
                      min="1"
                    />
                    <input
                      type="text"
                      placeholder="Label"
                      value={editLabel}
                      onChange={(e) => setEditLabel(e.target.value)}
                      className="admin-tables__input"
                    />
                  </div>
                  <div className="admin-tables__row-actions">
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={() => handleEditSave(table.id)}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="admin-tables__row-info">
                    <div>
                      <strong>Table {table.number}</strong>
                      {table.label && <span className="admin-tables__label">{table.label}</span>}
                    </div>
                    <span className={`admin-tables__status${table.is_active ? ' admin-tables__status--active' : ''}`}>
                      {table.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="admin-tables__row-actions">
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => handleToggleActive(table.id, table.is_active)}
                    >
                      {table.is_active ? 'Hide' : 'Show'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => handleEditStart(table)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => handleDelete(table.id, table.number)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
