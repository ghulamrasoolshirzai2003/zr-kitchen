import { useEffect, useState } from 'react'
import { restaurantInfo } from '../data/menuData'

export default function ClosedBanner() {
  const [dismissed, setDismissed] = useState(false)

  const today = new Date().getDay()
  const isClosed = today === restaurantInfo.closedDay

  useEffect(() => {
    if (isClosed && !dismissed) {
      document.body.classList.add('has-closed-banner')
    } else {
      document.body.classList.remove('has-closed-banner')
    }
    return () => document.body.classList.remove('has-closed-banner')
  }, [isClosed, dismissed])

  if (!isClosed || dismissed) return null

  return (
    <div className="closed-banner">
      <div className="container closed-banner__inner">
        <span className="closed-banner__text">
          We're closed today. We'll be back tomorrow — see you then!
        </span>
        <button
          type="button"
          className="closed-banner__close"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
        >
          &times;
        </button>
      </div>
    </div>
  )
}
