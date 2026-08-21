import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import { parseItemPrice } from '../lib/orderTotals'

export default function OrderCart() {
  const { items, itemCount, isOpen, openCart, closeCart, removeItem, incrementItem, decrementItem, submitOrder } = useCart()
  const [tables, setTables] = useState([])
  const [activeTableIds, setActiveTableIds] = useState(new Set())
  const [tableId, setTableId] = useState('')
  const [notes, setNotes] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | sent | error
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!isSupabaseConfigured) return

    let cancelled = false

    async function loadTables() {
      const { data, error } = await supabase
        .from('restaurant_tables')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')
      if (!cancelled && !error && data) setTables(data)
    }

    async function loadActiveOrders() {
      const { data, error } = await supabase.rpc('get_active_table_ids')
      if (!cancelled && !error && data) {
        setActiveTableIds(new Set(data))
      }
    }

    loadTables()
    loadActiveOrders()

    // Realtime requires the "restaurant_tables" table to have replication
    // switched on in the Supabase dashboard (Database → Replication), which
    // isn't guaranteed to be set on every project — so poll as a fallback
    // that works regardless, same as the orders polling below.
    const tablesPollInterval = setInterval(loadTables, 5000)

    // For orders, anon has no SELECT permission so Realtime events are blocked by RLS —
    // poll instead so warnings update automatically when the admin changes an order status.
    const ordersPollInterval = setInterval(loadActiveOrders, 8000)

    const channel = supabase
      .channel('cart-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'restaurant_tables' }, loadTables)
      .subscribe()

    return () => {
      cancelled = true
      clearInterval(tablesPollInterval)
      clearInterval(ordersPollInterval)
      supabase.removeChannel(channel)
    }
  }, [])

  useEffect(() => {
    if (tableId && tables.length > 0 && !tables.some((t) => t.id === tableId)) {
      setTableId('')
    }
  }, [tables, tableId])

  if (!isSupabaseConfigured) return null

  const calculateTotal = () => {
    let total = 0
    items.forEach((item) => {
      const { value } = parseItemPrice(item.price)
      if (value !== null) total += value * item.quantity
    })
    return total
  }

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '')
    // Malaysian numbers: 60 followed by 9-10 digits (0[1-9]X XXXX XXXX), or 10 digits starting with 0
    return /^(60[0-9]{9,10}|0[1-9][0-9]{8,9})$/.test(cleaned)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    if (!customerName.trim()) {
      setStatus('error')
      setErrorMessage('Please enter your name.')
      return
    }
    if (!validateEmail(customerEmail)) {
      setStatus('error')
      setErrorMessage('Please enter a valid email address.')
      return
    }
    if (!validatePhone(customerPhone)) {
      setStatus('error')
      setErrorMessage('Please enter a valid Malaysian phone number (e.g., +60 16 883 5414 or 0168835414).')
      return
    }

    try {
      await submitOrder({ tableId, notes, customerName, customerEmail, customerPhone })
      setStatus('sent')
      setNotes('')
      setTableId('')
      setCustomerName('')
      setCustomerEmail('')
      setCustomerPhone('')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err.message || 'Something went wrong sending your order — please try again.')
    }
  }

  return (
    <>
      <button type="button" className="order-fab" onClick={openCart} aria-label="View your order">
        Your Order
        {itemCount > 0 && (
          <span className="order-fab__badge" key={itemCount}>
            {itemCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="order-cart__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
          >
            <motion.div
              className="order-cart"
              role="dialog"
              aria-modal="true"
              aria-label="Your order"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="order-cart__header">
                <h3>Your Order</h3>
                <button type="button" className="order-cart__close" onClick={closeCart} aria-label="Close">
                  &times;
                </button>
              </div>

              {status === 'sent' ? (
                <div className="order-cart__sent">
                  <p>Order sent!</p>
                  <p>The kitchen has it — we&rsquo;ll bring it out to your table shortly.</p>
                  <button type="button" className="btn btn-outline" onClick={() => { setStatus('idle'); closeCart() }}>
                    Close
                  </button>
                </div>
              ) : items.length === 0 ? (
                <p className="order-cart__empty">Nothing in your order yet — add a dish from the menu.</p>
              ) : (
                <form className="order-cart__form" onSubmit={handleSubmit}>
                  <ul className="order-cart__items">
                    {items.map((item) => (
                      <li key={item.id} className="order-cart__item">
                        <div className="order-cart__item-info">
                          <span className="order-cart__item-name">{item.name}</span>
                          <span className="order-cart__item-price">{item.price}</span>
                        </div>
                        <div className="order-cart__item-controls">
                          <button type="button" onClick={() => decrementItem(item.id)} aria-label={`Remove one ${item.name}`}>
                            &minus;
                          </button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => incrementItem(item.id)} aria-label={`Add one more ${item.name}`}>
                            +
                          </button>
                          <button type="button" className="order-cart__remove" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="order-cart__total">
                    <span className="order-cart__total-label">Total</span>
                    <span className="order-cart__total-amount">RM {calculateTotal().toFixed(2)}</span>
                  </div>

                  <label htmlFor="cart-name">
                    Your Name
                    <input
                      id="cart-name"
                      type="text"
                      required
                      placeholder="Full name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </label>

                  <label htmlFor="cart-email">
                    Email
                    <input
                      id="cart-email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                  </label>

                  <label htmlFor="cart-phone">
                    Phone Number (Malaysia)
                    <input
                      id="cart-phone"
                      type="tel"
                      required
                      placeholder="+60 16 883 5414"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                  </label>

                  <label htmlFor="cart-table">
                    Table number
                    <select id="cart-table" required value={tableId} onChange={(e) => { setTableId(e.target.value); setStatus('idle') }}>
                      <option value="" disabled>
                        Select your table
                      </option>
                      {tables.map((t) => {
                        const occupied = activeTableIds.has(t.id)
                        const label = t.label || `Table ${t.number}`
                        return (
                          <option key={t.id} value={t.id}>
                            {occupied ? `⚠ ${label} — order in progress` : label}
                          </option>
                        )
                      })}
                    </select>
                  </label>

                  <label htmlFor="cart-notes">
                    Notes (optional)
                    <textarea
                      id="cart-notes"
                      rows={2}
                      placeholder="Allergies, spice level, anything the kitchen should know..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </label>

                  {status === 'error' && (
                    <div className="order-cart__error-box">
                      <p className="order-cart__error">{errorMessage}</p>
                      <button type="button" className="btn btn-outline btn-sm" onClick={() => setStatus('idle')}>
                        Try Again
                      </button>
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary" disabled={status === 'submitting' || !tableId}>
                    {status === 'submitting' ? 'Sending…' : 'Send Order to Kitchen'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
