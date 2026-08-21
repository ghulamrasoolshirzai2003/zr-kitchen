import Reveal from './Reveal'
import { restaurantInfo } from '../data/menuData'

// TODO(owner): this uses a keyless text-query embed built from your address,
// which works but is approximate. For a pinpoint-accurate embed, grab the
// "Embed a map" iframe src from your Google Business Profile listing and
// swap it in below.
const MAP_QUERY = encodeURIComponent(
  `ZR Kitchen, ${restaurantInfo.address.line1}, ${restaurantInfo.address.line2}`,
)
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`

export default function Location() {
  return (
    <section id="contact" className="location-section section">
      <div className="container location__grid">
        <Reveal as="div" className="location__map">
          <iframe
            title="ZR Kitchen location map"
            src={MAP_EMBED_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </Reveal>

        <Reveal as="div" delay={0.15} className="location__details">
          <p className="eyebrow">Visit Us</p>
          <h2 className="section-title">
            Find our <em>table</em>
          </h2>

          <dl className="location__list">
            <div>
              <dt>Address</dt>
              <dd>
                {restaurantInfo.address.line1}
                <br />
                {restaurantInfo.address.line2}
                <br />
                <a href={restaurantInfo.address.mapUrl} target="_blank" rel="noreferrer">
                  Get directions →
                </a>
              </dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>
                {restaurantInfo.hours.map((h) => (
                  <span key={h.days} className="location__hours-row">
                    {h.days}: {h.time}
                  </span>
                ))}
                <span className="location__hours-note">{restaurantInfo.hoursNote}</span>
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${restaurantInfo.phone.replace(/\s/g, '')}`}>{restaurantInfo.phone}</a>
                <br />
                <span className="location__hours-note">Orders &amp; enquiries: {restaurantInfo.phoneOrders}</span>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
