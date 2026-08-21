// Menu prices are printed as e.g. "RM 15.00", or dual-priced drinks as
// "RM2.20 / RM2.50" (hot / cold) — pull the first number out for a
// best-effort total. Shared between the printed receipt and the admin sales
// report so both compute a given order's value the same way.
export function parseItemPrice(priceStr) {
  const matches = [...String(priceStr).matchAll(/RM\s*([\d.]+)/gi)]
  if (matches.length === 0) return { value: null, ambiguous: true }
  return { value: parseFloat(matches[0][1]), ambiguous: matches.length > 1 }
}

export function computeOrderTotal(orderItems) {
  let total = 0
  let approximate = false
  for (const item of orderItems) {
    const { value, ambiguous } = parseItemPrice(item.item_price_snapshot)
    if (ambiguous) approximate = true
    if (value !== null) total += value * item.quantity
  }
  return { total, approximate }
}

// Buckets a UTC timestamp into the restaurant's local business day (Malaysia,
// UTC+8, no DST) so "today's sales" lines up with the actual calendar day on
// the ground, not the UTC one. en-CA gives YYYY-MM-DD directly, sortable as a
// plain string.
export function localDateKey(isoString) {
  return new Date(isoString).toLocaleDateString('en-CA', { timeZone: 'Asia/Kuala_Lumpur' })
}

export function localDateLabel(dateKey) {
  return new Date(`${dateKey}T00:00:00+08:00`).toLocaleDateString('en-MY', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
