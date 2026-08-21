// Generates the one printable QR code for the tables — same code on every
// table, linking straight to the site. Re-run this whenever your live URL
// changes (e.g. once you've deployed to a real domain).
//
// Usage:
//   node scripts/generate-qr.mjs https://your-real-domain.com
//
// Writes qr-code.png (high-res, print-ready) to the project root.

import QRCode from 'qrcode'

const url = process.argv[2]

if (!url) {
  console.error('Usage: node scripts/generate-qr.mjs https://your-real-domain.com')
  process.exit(1)
}

QRCode.toFile('qr-code.png', url, { width: 1200, margin: 2, color: { dark: '#0b0a08', light: '#ffffff' } })
  .then(() => console.log(`Saved qr-code.png — encodes: ${url}`))
  .catch((err) => {
    console.error('Failed to generate QR code:', err)
    process.exit(1)
  })
