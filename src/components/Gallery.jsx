import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import { dishPhotos, ambiencePhotos, unlistedDishPhotos } from '../data/dishPhotos'

const GALLERY_ITEMS = [
  { ...dishPhotos['briyani-lamb-shank'], name: 'Nasi Briyani Lamb Shank' },
  { ...ambiencePhotos.galleryCandle, name: 'Ikan goreng dengan nasi' },
  { ...dishPhotos['ayam-tandoori-roti'], name: 'Ayam Tandoori' },
  { ...dishPhotos['naan-cheese-leleh'], name: 'Roti Naan Cheese Leleh' },
  { ...ambiencePhotos.galleryTandoor2, name: 'Fresh from the tandoor' },
  { ...dishPhotos['seekh-kebab-naan-board'], name: 'Seekh Kebab' },
  { ...ambiencePhotos.galleryInterior2, name: 'Ikan goreng nasi lauk' },
  { ...dishPhotos['pulau-kambing'], name: 'Nasi Pulau Kambing' },
  { ...dishPhotos['set-talam'], name: 'Set Talam' },
  { ...ambiencePhotos.gallerySpices2, name: 'Malaysian sweet dessert' },
  { ...dishPhotos['chapli-kebab'], name: 'Chapli Kebab' },
  { ...ambiencePhotos.galleryNaanBasket2, name: 'Udang sambal dengan nasi' },
  { ...dishPhotos['tomyam-seafood'], name: 'Tomyam Seafood' },
  { ...dishPhotos['combo-4in1'], name: 'Combo 4in1' },
  { ...unlistedDishPhotos['whole-fish'], name: "Chef's whole fish" },
  { ...unlistedDishPhotos['wood-fired-pizza'], name: 'Wood-fired pizza' },
]

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null)

  const close = useCallback(() => setOpenIndex(null), [])
  const showPrev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)),
    [],
  )
  const showNext = useCallback(() => setOpenIndex((i) => (i === null ? i : (i + 1) % GALLERY_ITEMS.length)), [])

  return (
    <section id="gallery" className="gallery-section section">
      <div className="container">
        <div className="section-heading center">
          <p className="eyebrow">Gallery</p>
          <h2 className="section-title">
            From the <em>kitchen &amp; table</em>
          </h2>
        </div>

        <div className="gallery-grid">
          {GALLERY_ITEMS.map((photo, i) => (
            <Reveal as="figure" key={photo.src} delay={(i % 4) * 0.06} className="gallery-item">
              <button type="button" className="gallery-item__trigger" onClick={() => setOpenIndex(i)}>
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <span className="gallery-item__caption">{photo.name}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Lightbox
        items={GALLERY_ITEMS}
        index={openIndex}
        onClose={close}
        onPrev={showPrev}
        onNext={showNext}
      />
    </section>
  )
}

function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const closeButtonRef = useRef(null)
  const isOpen = index !== null

  useEffect(() => {
    if (!isOpen) return undefined

    closeButtonRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, onPrev, onNext])

  const item = isOpen ? items[index] : null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={item.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <button type="button" className="lightbox__close" onClick={onClose} ref={closeButtonRef} aria-label="Close">
            &times;
          </button>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
          >
            &#8249;
          </button>

          <motion.figure
            key={item.src}
            className="lightbox__figure"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={item.src} alt={item.alt} />
            <figcaption>{item.name}</figcaption>
          </motion.figure>

          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
          >
            &#8250;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
