import Reveal from './Reveal'
import { ambiencePhotos } from '../data/dishPhotos'

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container about__grid">
        <Reveal as="div" className="about__copy">
          <p className="eyebrow">Our Story</p>
          <h2 className="section-title">
            Two kitchens, <em>one table</em>
          </h2>
          <p className="about__paragraph">
            ZR Kitchen sits on Jalan Kangar Jaya in Kampung Seriab, where the tandoor never
            really goes quiet. Every plate here carries two traditions at once — slow-braised
            biryani, hand-torn naan and char-grilled kebab from the tandoor, served alongside
            the wok-fried rice, tomyam and kerabu megi of a Malaysian kitchen. Nothing on the
            menu is an afterthought; the hot line doesn&rsquo;t open until 4pm because everything is
            cooked to order, not held under a lamp.
          </p>
          <p className="about__paragraph">
            It&rsquo;s a family-run room, built for regulars who order without looking at the menu
            and first-timers working through the lamb shank, the seekh kebab, and the cheese
            naan in the same sitting.
          </p>
          {/* TODO(owner): swap this in for a real chef bio / photo if you'd like one — kept general since no bio was provided. */}
          <div className="about__contact-note">
            <span className="about__contact-label">Tempahan &amp; Pertanyaan</span>
            <span>Reservations &amp; enquiries — 013-520 2651</span>
          </div>
        </Reveal>

        <div className="about__images">
          <Reveal as="div" delay={0.1} className="about__image">
            <img src={ambiencePhotos.aboutExterior.src} alt={ambiencePhotos.aboutExterior.alt} loading="lazy" width={800} height={600} />
          </Reveal>
          <Reveal as="div" delay={0.18} className="about__image">
            <img src={ambiencePhotos.aboutTandoorPrep.src} alt={ambiencePhotos.aboutTandoorPrep.alt} loading="lazy" width={800} height={600} />
          </Reveal>
          <Reveal as="div" delay={0.26} className="about__image">
            <img src={ambiencePhotos.aboutNaanBasket.src} alt={ambiencePhotos.aboutNaanBasket.alt} loading="lazy" width={800} height={600} />
          </Reveal>
          <Reveal as="div" delay={0.34} className="about__image">
            <img src={ambiencePhotos.aboutSpices.src} alt={ambiencePhotos.aboutSpices.alt} loading="lazy" width={800} height={600} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
