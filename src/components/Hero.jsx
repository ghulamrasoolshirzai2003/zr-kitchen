import { motion, useScroll, useTransform } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ambiencePhotos } from '../data/dishPhotos'
import video1 from '../assets/dishes/hero-video1.mp4'
import video2 from '../assets/dishes/hero-video2.mp4'
import video3 from '../assets/dishes/hero-video3.mp4'

const VIDEOS = [video1, video2, video3]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const [showVideo, setShowVideo] = useState(false)
  const [idx, setIdx] = useState(0)
  const [videoVisible, setVideoVisible] = useState(false)

  useEffect(() => {
    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!noMotion) setShowVideo(true)
  }, [])

  const handleCanPlay = useCallback((e) => {
    e.target.play().then(() => setVideoVisible(true)).catch(() => {})
  }, [])

  const handleEnded = useCallback(() => {
    setVideoVisible(false)
    setTimeout(() => setIdx(i => (i + 1) % VIDEOS.length), 500)
  }, [])

  return (
    <section id="home" className="hero" ref={ref}>
      <motion.div className="hero__media" style={{ y }}>
        {showVideo && (
          <video
            key={idx}
            className="hero__video"
            style={{ opacity: videoVisible ? 1 : 0 }}
            src={VIDEOS[idx]}
            muted
            autoPlay
            playsInline
            onCanPlay={handleCanPlay}
            onEnded={handleEnded}
          />
        )}
        <div className="hero__scrim" />
      </motion.div>

      <motion.div className="hero__content" style={{ opacity }}>
        <motion.p
          className="eyebrow hero__eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Kampung Seriab &middot; Kangar &middot; Perlis
        </motion.p>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          ZR <em>Kitchen</em>
        </motion.h1>

        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          Slow-cooked biryani, tandoor-fired naan, and Malaysian classics — a taste of home, made with heart.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="#menu" className="btn btn-primary">View Menu</a>
          <a href="#reservations" className="btn btn-outline">Reserve a Table</a>
        </motion.div>
      </motion.div>

      <a href="#about" className="hero__scroll-cue" aria-label="Scroll to learn more">
        <span />
      </a>
    </section>
  )
}
