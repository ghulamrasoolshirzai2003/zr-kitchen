import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'
import { printOrderReceipt, printKitchenReceipt } from '../lib/printReceipt'

const STATUSES = ['received', 'preparing', 'ready', 'served']
const STATUS_LABELS = {
  received: 'New',
  preparing: 'Preparing',
  ready: 'Ready',
  served: 'Served',
}
const NEXT_STATUS = {
  received: 'preparing',
  preparing: 'ready',
  ready: 'served',
}

function timeAgo(isoString) {
  const seconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  return `${hours}h ${minutes % 60}m ago`
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const loadOrders = useCallback(async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, restaurant_tables(number, label), order_items(*)')
      .order('created_at', { ascending: false })
      .limit(100)
    if (!error) setOrders(data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    loadOrders()

    const channel = supabase
      .channel('admin-orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, loadOrders)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'order_items' }, loadOrders)
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [loadOrders])

  const advanceStatus = async (order) => {
    const next = NEXT_STATUS[order.status]
    if (!next) return
    await supabase.from('orders').update({ status: next }).eq('id', order.id)
  }

  const deleteOrder = async (order) => {
    const message =
      order.status === 'served'
        ? 'This order is marked served and counts toward today’s sales total — removing it will also remove it from the Sales report. Continue?'
        : 'Remove this order? This can’t be undone.'
    if (!window.confirm(message)) return
    await supabase.from('orders').delete().eq('id', order.id)
  }

  if (loading)
    return (
      <div className="admin-orders">
        <h1>Orders</h1>
        <div className="admin-orders__board">
          {STATUSES.map((status) => (
            <div className="admin-orders__column" key={status}>
              <h2>{STATUS_LABELS[status]}</h2>
              <div className="admin-order-card admin-order-card--skeleton" />
              <div className="admin-order-card admin-order-card--skeleton" />
            </div>
          ))}
        </div>
      </div>
    )

  return (
    <div className="admin-orders">
      <h1>Orders</h1>
      <div className="admin-orders__board">
        {STATUSES.map((status) => {
          const columnOrders = orders.filter((o) => o.status === status)
          return (
            <div className="admin-orders__column" key={status}>
              <h2>
                {STATUS_LABELS[status]} <span>{columnOrders.length}</span>
              </h2>
              {columnOrders.length === 0 && <p className="admin-orders__empty">Nothing here</p>}
              {columnOrders.map((order) => (
                <article className="admin-order-card" key={order.id}>
                  <div className="admin-order-card__header">
                    <span className="admin-order-card__table">
                      {order.restaurant_tables?.label || `Table ${order.restaurant_tables?.number ?? '?'}`}
                    </span>
                    <span className="admin-order-card__time">{timeAgo(order.created_at)}</span>
                  </div>
                  {order.customer_name && (
                    <div className="admin-order-card__customer">
                      <div className="admin-order-card__customer-name">{order.customer_name}</div>
                      {order.customer_email && <a href={`mailto:${order.customer_email}`}>{order.customer_email}</a>}
                      {order.customer_phone && <a href={`tel:${order.customer_phone}`}>{order.customer_phone}</a>}
                    </div>
                  )}
                  <ul className="admin-order-card__items">
                    {order.order_items.map((item) => (
                      <li key={item.id}>
                        <span className="admin-order-card__qty">{item.quantity}×</span> {item.item_name_snapshot}
                      </li>
                    ))}
                  </ul>
                  {order.notes && <p className="admin-order-card__notes">&ldquo;{order.notes}&rdquo;</p>}
                  <div className="admin-order-card__actions">
                    {NEXT_STATUS[order.status] && (
                      <button type="button" className="btn btn-primary" onClick={() => advanceStatus(order)}>
                        Mark {STATUS_LABELS[NEXT_STATUS[order.status]]}
                      </button>
                    )}
                    <button type="button" className="admin-order-card__print" onClick={() => printKitchenReceipt(order)}>
                      Kitchen Ticket
                    </button>
                    <button type="button" className="admin-order-card__print" onClick={() => printOrderReceipt(order)}>
                      Receipt
                    </button>
                    <button type="button" className="admin-order-card__delete" onClick={() => deleteOrder(order)}>
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
