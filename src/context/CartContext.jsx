import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = useCallback((menuItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === menuItem.id)
      if (existing) {
        return prev.map((i) => (i.id === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { id: menuItem.id, name: menuItem.name, price: menuItem.price, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  // Functional updates (computed from the latest `prev`, not a value passed in
  // from the caller's render closure) so rapid repeat clicks on the +/- stepper
  // stack correctly instead of racing against a stale `item.quantity`.
  const incrementItem = useCallback((id) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)))
  }, [])

  const decrementItem = useCallback((id) => {
    setItems((prev) =>
      prev.flatMap((i) => {
        if (i.id !== id) return [i]
        return i.quantity - 1 <= 0 ? [] : [{ ...i, quantity: i.quantity - 1 }]
      }),
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  /**
   * Writes one `orders` row plus its `order_items`. Prices are stored as the
   * exact text shown on the menu (some drinks are dual-priced, e.g.
   * "RM2.20 / RM2.50" for hot/cold) — there's no online payment in Phase 1,
   * so the counter staff confirm the real total in person; this is an order
   * ticket for the kitchen, not an invoice.
   */
  const submitOrder = useCallback(
    async ({ tableId, notes, customerName, customerEmail, customerPhone }) => {
      if (!isSupabaseConfigured) {
        throw new Error("Ordering isn’t connected yet — ask the restaurant to finish the Supabase setup.")
      }
      if (items.length === 0) throw new Error("Your order is empty.")
      if (!tableId) throw new Error("Please choose your table number.")

      // Guests can INSERT orders but, by design, can never read them back (that’s
      // admin-only) — so the id has to come from the client, not from a `.select()`
      // after insert, which would need read permission the RLS policy intentionally
      // withholds from guests.
      const orderId = crypto.randomUUID()

      const { error: orderError } = await supabase
        .from("orders")
        .insert({
          id: orderId,
          table_id: tableId,
          notes: notes || null,
          customer_name: customerName || null,
          customer_email: customerEmail || null,
          customer_phone: customerPhone || null,
        })
      if (orderError) throw orderError

      const orderItems = items.map((i) => ({
        order_id: orderId,
        menu_item_id: i.id,
        item_name_snapshot: i.name,
        item_price_snapshot: i.price,
        quantity: i.quantity,
      }))
      const { error: itemsError } = await supabase.from("order_items").insert(orderItems)
      if (itemsError) throw itemsError

      clearCart()
      return { id: orderId }
    },
    [items, clearCart],
  )

  const value = useMemo(
    () => ({ items, itemCount, isOpen, addItem, removeItem, incrementItem, decrementItem, clearCart, openCart, closeCart, submitOrder }),
    [items, itemCount, isOpen, addItem, removeItem, incrementItem, decrementItem, clearCart, openCart, closeCart, submitOrder],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
