import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ambiencePhotos } from '../data/dishPhotos'

export default function Statement() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section className="statement" ref={ref} aria-label="From our kitchen">
      <motion.div className="statement__media" style={{ y }}>
        <img src={ambiencePhotos.statement.src} alt={ambiencePhotos.statement.alt} loading="lazy" />
        <div className="statement__scrim" />
      </motion.div>

      <div className="statement__content">
        <p className="eyebrow">From Our Kitchen</p>
        <p className="statement__line">
          Nothing waits under a lamp. <em>Every tray leaves the kitchen the moment it&rsquo;s ready</em> — cooked
          to order, packed to order, served to order.
        </p>
      </div>
    </section>
  )
}
