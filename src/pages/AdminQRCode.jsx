import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

export default function AdminQRCode() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const orderingUrl = window.location.origin + '/'
    QRCode.toCanvas(canvasRef.current, orderingUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#0a0805',
        light: '#fffef9',
      },
      errorCorrectionLevel: 'H',
    })
  }, [])

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="admin-qrcode">
      <div className="admin-qrcode__content">
        <div className="admin-qrcode__header">
          <h2>QR Code for Table Ordering</h2>
          <p className="admin-qrcode__subtitle">
            Print this and place it on each table. Guests scan to browse the menu and place orders.
          </p>
        </div>

        <div className="admin-qrcode__display">
          <div className="admin-qrcode__canvas-wrap">
            <canvas ref={canvasRef} />
          </div>
          <div className="admin-qrcode__details">
            <p className="admin-qrcode__label">Direct URL to share:</p>
            <code className="admin-qrcode__url">{window.location.origin}/</code>
            <p className="admin-qrcode__hint">Scans to this link. Works on any device.</p>
          </div>
        </div>

        <div className="admin-qrcode__actions">
          <button type="button" className="btn btn-primary" onClick={handlePrint}>
            Print QR Code
          </button>
          <p className="admin-qrcode__print-hint">
            Recommended: print on label stock (2" × 2" or similar) for durability, one per table. Or
            laminate after printing on regular paper.
          </p>
        </div>
      </div>

      <style>{`
        @media print {
          .admin-qrcode__header,
          .admin-qrcode__details,
          .admin-qrcode__actions {
            display: none;
          }

          .admin-qrcode__content {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 0;
          }

          .admin-qrcode__display {
            margin: 0;
            padding: 0;
          }

          .admin-qrcode__canvas-wrap {
            margin: 0;
            padding: 0;
            text-align: center;
          }
        }
      `}</style>
    </div>
  )
}
