import { useState } from 'react'
import Reveal from './Reveal'
import DeliveryBadges from './DeliveryBadges'
import { restaurantInfo } from '../data/menuData'

const initialForm = {
  name: '',
  phone: '',
  date: '',
  time: '',
  partySize: '2',
  requests: '',
}

/**
 * Front-end only. On submit this logs the booking and opens a pre-filled
 * mailto: draft to the restaurant — nothing is sent automatically.
 *
 * TODO(owner): wire this up to a real reservation backend, e.g.:
 *   - An OpenTable / Resy widget or iframe embed, or
 *   - A booking API (POST to your own backend, which emails/SMSes the
 *     restaurant and confirms the guest) — swap out `handleSubmit` below.
 */
export default function Reservations() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')

  const today = new Date().toISOString().split('T')[0]

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('Reservation request submitted:', form)

    const subject = encodeURIComponent(`Table reservation — ${form.name} — ${form.date} ${form.time}`)
    const body = encodeURIComponent(
      `New reservation request via zrkitchen.com\n\n` +
        `Name: ${form.name}\n` +
        `Phone: ${form.phone}\n` +
        `Date: ${form.date}\n` +
        `Time: ${form.time}\n` +
        `Party size: ${form.partySize}\n` +
        `Special requests: ${form.requests || '—'}\n`,
    )

    window.location.href = `mailto:${restaurantInfo.email}?subject=${subject}&body=${body}`
    setStatus('sent')
  }

  return (
    <section id="reservations" className="reservations-section section">
      <div className="container reservations__grid">
        <Reveal as="div" className="reservations__intro">
          <p className="eyebrow">Reservations</p>
          <h2 className="section-title">
            Book your <em>table</em>
          </h2>
          <p className="section-lede">
            Tell us when you&rsquo;re coming and how many, and we&rsquo;ll confirm by phone. For same-day
            or large-party bookings, calling directly is fastest.
          </p>
          <a className="btn btn-outline reservations__call" href={`tel:${restaurantInfo.phoneOrders.replace(/\s|-/g, '')}`}>
            Or call {restaurantInfo.phoneOrders}
          </a>

          <div className="reservations__delivery">
            <p className="reservations__delivery-label">Not dining in? Order for delivery:</p>
            <DeliveryBadges />
          </div>
        </Reveal>

        <Reveal as="form" delay={0.15} className="reservation-form" onSubmit={handleSubmit} noValidate>
          <div className="reservation-form__row">
            <label htmlFor="res-name">
              Name
              <input id="res-name" name="name" type="text" required autoComplete="name" value={form.name} onChange={update('name')} />
            </label>
            <label htmlFor="res-phone">
              Phone
              <input id="res-phone" name="phone" type="tel" required autoComplete="tel" value={form.phone} onChange={update('phone')} />
            </label>
          </div>

          <div className="reservation-form__row">
            <label htmlFor="res-date">
              Date
              <input id="res-date" name="date" type="date" required min={today} value={form.date} onChange={update('date')} />
            </label>
            <label htmlFor="res-time">
              Time
              <input id="res-time" name="time" type="time" required value={form.time} onChange={update('time')} />
            </label>
          </div>

          <label htmlFor="res-party">
            Party size
            <select id="res-party" name="partySize" value={form.partySize} onChange={update('partySize')}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'guest' : 'guests'}
                </option>
              ))}
              <option value="13+">13+ guests (call us)</option>
            </select>
          </label>

          <label htmlFor="res-requests">
            Special requests
            <textarea
              id="res-requests"
              name="requests"
              rows={3}
              placeholder="Dietary needs, seating preference, occasion..."
              value={form.requests}
              onChange={update('requests')}
            />
          </label>

          <button type="submit" className="btn btn-primary reservation-form__submit">
            Request Reservation
          </button>

          <p className="reservation-form__status" role="status" aria-live="polite">
            {status === 'sent'
              ? "Thanks — your email app should be open with the request ready to send. We'll confirm by phone."
              : ''}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
