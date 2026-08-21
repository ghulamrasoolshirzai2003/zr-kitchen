import QRCode from 'qrcode'
import { restaurantInfo } from '../data/menuData'
import { parseItemPrice, computeOrderTotal } from './orderTotals'

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function printOrderReceipt(order) {
  const tableLabel = order.restaurant_tables?.label || `Table ${order.restaurant_tables?.number ?? '?'}`

  const { total, approximate } = computeOrderTotal(order.order_items)
  const rows = order.order_items.map((item) => {
    const { value } = parseItemPrice(item.item_price_snapshot)
    const lineTotal = value !== null ? value * item.quantity : null
    return { ...item, lineTotal }
  })

  let qrDataUrl = ''
  try {
    qrDataUrl = await QRCode.toDataURL(restaurantInfo.googleReviewUrl, { width: 200, margin: 1 })
  } catch {
    qrDataUrl = ''
  }

  const receiptWindow = window.open('', '_blank', 'width=420,height=720')
  if (!receiptWindow) {
    window.alert('Please allow pop-ups for this site to print the receipt.')
    return
  }

  const orderDate = new Date(order.created_at).toLocaleString('en-MY', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const itemRows = rows
    .map(
      (item) => `
        <tr>
          <td class="qty">${item.quantity}&times;</td>
          <td>${escapeHtml(item.item_name_snapshot)}</td>
          <td class="price">${item.lineTotal !== null ? 'RM ' + item.lineTotal.toFixed(2) : escapeHtml(item.item_price_snapshot)}</td>
        </tr>`,
    )
    .join('')

  receiptWindow.document.write(`<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Receipt — ${escapeHtml(tableLabel)}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: 'Courier New', monospace; width: 300px; margin: 0 auto; padding: 16px; color: #000; }
  h1 { font-size: 18px; text-align: center; margin: 0 0 4px; }
  .tagline { text-align: center; font-size: 11px; margin: 0 0 12px; }
  .meta { font-size: 12px; margin-bottom: 10px; }
  .meta strong { font-size: 15px; }
  hr { border: none; border-top: 1px dashed #000; margin: 10px 0; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  td { padding: 3px 0; vertical-align: top; }
  .qty { width: 28px; }
  .price { text-align: right; white-space: nowrap; }
  .total-row td { font-weight: bold; font-size: 14px; padding-top: 8px; border-top: 1px dashed #000; }
  .notes-box { margin-top: 10px; font-size: 12px; border: 1px solid #000; padding: 6px; }
  .closing { text-align: center; margin-top: 16px; font-size: 13px; }
  .review { text-align: center; margin-top: 14px; }
  .review img { width: 110px; height: 110px; }
  .review p { font-size: 11px; margin: 4px 0 0; }
  .disclaimer { text-align: center; font-size: 10px; color: #333; margin-top: 6px; }

  /* Match a standard 80mm thermal receipt/kitchen-printer roll — without
     this the page prints at the printer's default (often A4/Letter) with
     the ticket just floating in the corner instead of filling the roll. */
  @media print {
    @page { size: 80mm auto; margin: 0; }
    body { width: 100%; margin: 0; padding: 8px; }
  }
</style>
</head>
<body>
  <h1>${escapeHtml(restaurantInfo.name)}</h1>
  <p class="tagline">${escapeHtml(restaurantInfo.tagline)}</p>
  <div class="meta"><strong>${escapeHtml(tableLabel)}</strong>${order.customer_name ? `<br/><strong>Customer:</strong> ${escapeHtml(order.customer_name)}` : ''}<br/>${escapeHtml(orderDate)}</div>
  <hr/>
  <table>
    ${itemRows}
    <tr class="total-row">
      <td colspan="2">${approximate ? 'Approx. Total' : 'Total'}</td>
      <td class="price">RM ${total.toFixed(2)}</td>
    </tr>
  </table>
  ${approximate ? '<p class="disclaimer">Some items are priced hot/cold — please confirm the exact total at the counter.</p>' : ''}
  ${order.notes ? `<div class="notes-box"><strong>Note:</strong> ${escapeHtml(order.notes)}</div>` : ''}
  <p class="closing">Enjoy your meal — please pay at the counter.</p>
  ${qrDataUrl ? `<div class="review"><img src="${qrDataUrl}" alt="Scan to leave a review" /><p>Loved it? Scan to leave us a review!</p></div>` : ''}
</body>
</html>`)
  receiptWindow.document.close()
  receiptWindow.onload = () => {
    receiptWindow.focus()
    receiptWindow.print()
  }
}

export function printKitchenReceipt(order) {
  const tableLabel = order.restaurant_tables?.label || `Table ${order.restaurant_tables?.number ?? '?'}`

  const kitchenWindow = window.open('', '_blank', 'width=420,height=600')
  if (!kitchenWindow) {
    window.alert('Please allow pop-ups for this site to print the kitchen ticket.')
    return
  }

  const orderDate = new Date(order.created_at).toLocaleString('en-MY', {
    dateStyle: 'short',
    timeStyle: 'short',
  })

  const itemRows = order.order_items
    .map(
      (item) => `
        <tr>
          <td class="qty">${item.quantity}</td>
          <td class="name">${escapeHtml(item.item_name_snapshot)}</td>
        </tr>`,
    )
    .join('')

  const orderId = order.id.substring(0, 8).toUpperCase()

  kitchenWindow.document.write(`<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Kitchen Ticket — ${escapeHtml(tableLabel)}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: 'Courier New', monospace; width: 300px; margin: 0 auto; padding: 16px; color: #000; }
  .header { text-align: center; margin-bottom: 12px; }
  .header h1 { font-size: 24px; font-weight: bold; margin: 0; }
  .header p { font-size: 11px; margin: 2px 0 0; color: #666; }
  .meta { font-size: 12px; margin-bottom: 12px; text-align: center; }
  .time { font-size: 13px; font-weight: bold; }
  hr { border: none; border-top: 2px solid #000; margin: 10px 0; }
  table { width: 100%; border-collapse: collapse; font-size: 16px; }
  td { padding: 6px 0; vertical-align: top; }
  .qty { width: 40px; text-align: center; font-weight: bold; font-size: 18px; }
  .name { font-weight: bold; }
  .closing { text-align: center; margin-top: 16px; font-size: 13px; font-weight: bold; }

  @media print {
    @page { size: 80mm auto; margin: 0; }
    body { width: 100%; margin: 0; padding: 8px; }
  }
</style>
</head>
<body>
  <div class="header">
    <h1>${escapeHtml(tableLabel)}</h1>
    ${order.customer_name ? `<p style="font-size: 14px; font-weight: bold; margin: 4px 0 0; color: #000;">${escapeHtml(order.customer_name)}</p>` : ''}
    <p>${escapeHtml(orderId)}</p>
  </div>
  <div class="meta">
    <span class="time">${escapeHtml(orderDate)}</span>
  </div>
  <hr/>
  <table>
    ${itemRows}
  </table>
  <hr/>
  <p class="closing">START COOKING</p>
</body>
</html>`)
  kitchenWindow.document.close()
  kitchenWindow.onload = () => {
    kitchenWindow.focus()
    kitchenWindow.print()
  }
}
