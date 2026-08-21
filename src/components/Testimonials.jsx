import { testimonials } from '../data/testimonials'

const track = [...testimonials, ...testimonials]

export default function Testimonials() {
  return (
    <section className="testimonials-section section">
      <div className="container">
        <div className="section-heading center">
          <p className="eyebrow">What Guests Say</p>
          <h2 className="section-title">
            Words from the <em>table</em>
          </h2>
        </div>
      </div>

      <div className="t-carousel" aria-label="Guest reviews">
        <div className="t-track">
          {track.map((t, i) => (
            <article key={i} className="t-card" aria-label={`Review by ${t.name}`}>
              {/* Front — review text */}
              <div className="t-card__front">
                <p className="t-card__stars">★★★★★</p>
                <blockquote className="t-card__quote">
                  <span className="t-card__qmark">&ldquo;</span>
                  {t.quote}
                </blockquote>
                <footer className="t-card__footer">
                  <span className="t-card__name">{t.name}</span>
                  <span className="t-card__hint" aria-hidden="true">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                    hover
                  </span>
                </footer>
              </div>

              {/* Back — food photo revealed on hover */}
              <div className="t-card__photo" aria-hidden="true">
                <img src={t.photo} alt={t.photoCaption} />
                <div className="t-card__photo-caption">{t.photoCaption}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
