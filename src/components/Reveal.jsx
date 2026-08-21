import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Shared scroll-triggered fade/slide-in wrapper. Built on Framer Motion's
 * `whileInView` (IntersectionObserver under the hood) so every section
 * animates in consistently instead of each component hand-rolling one.
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 26,
  duration = 0.8,
  once = true,
  className,
  ...rest
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      transition={{ duration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
