import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { computeOrderTotal, localDateKey, localDateLabel } from '../lib/orderTotals'

export default function AdminSales() {
  const [days, setDays] = useState([])
  const [loading, setLoading] = useState(true)

  const loadSales = useCallback(async () => {
    const { data, error } = await supabase.from('orders').select('id, created_at, order_items(item_price_snapshot, quantity)')
    if (error) {
      setLoading(false)
      return
    }

    const byDate = new Map()
    for (const order of data) {
      const key = localDateKey(order.created_at)
      const { total, approximate } = computeOrderTotal(order.order_items)
      const bucket = byDate.get(key) ?? { date: key, orders: 0, total: 0, approximate: false }
      bucket.orders += 1
      bucket.total += total
      bucket.approximate = bucket.approximate || approximate
      byDate.set(key, bucket)
    }

    const sorted = [...byDate.values()].sort((a, b) => (a.date < b.date ? 1 : -1))
    setDays(sorted)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadSales()

    const channel = supabase
      .channel('admin-sales')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, loadSales)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'order_items' }, loadSales)
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [loadSales])

  if (loading) return <p className="admin-orders__loading">Loading sales…</p>

  const todayKey = localDateKey(new Date().toISOString())
  const today = days.find((d) => d.date === todayKey) ?? { date: todayKey, orders: 0, total: 0, approximate: false }
  const otherDays = days.filter((d) => d.date !== todayKey)

  return (
    <div className="admin-sales">
      <h1>Sales</h1>
      <p className="admin-sales__note">
        Every order placed counts toward its day&rsquo;s total as soon as it comes in — removing an order (see
        Orders) also removes it here. Totals are an estimate for tracking purposes, not a certified accounting
        figure — hot/cold drinks are counted at their lower price, and this doesn&rsquo;t confirm what was actually
        paid at the counter.
      </p>

      <div className="admin-sales__today">
        <span className="admin-sales__today-label">Today &middot; {localDateLabel(todayKey)}</span>
        <span className="admin-sales__today-total">
          RM {today.total.toFixed(2)}
          {today.approximate && <span className="admin-sales__approx">~</span>}
        </span>
        <span className="admin-sales__today-orders">{today.orders} order{today.orders === 1 ? '' : 's'}</span>
      </div>

      {otherDays.length > 0 && (
        <table className="admin-sales__table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Orders</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {otherDays.map((d) => (
              <tr key={d.date}>
                <td>{localDateLabel(d.date)}</td>
                <td>{d.orders}</td>
                <td>
                  RM {d.total.toFixed(2)}
                  {d.approximate && <span className="admin-sales__approx">~</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {days.length === 0 && <p className="admin-orders__empty">No orders yet.</p>}
    </div>
  )
}
