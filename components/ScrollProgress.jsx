'use client'

/**
 * Reads document scroll as 0–1 via useSyncExternalStore; renders a thin gradient bar.
 * BEM block: scroll-progress (see ScrollProgress.module.css).
 */

import { useScrollProgress } from '@/hooks/useScrollProgress'
import styles from './ScrollProgress.module.css'

export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      className={styles['scroll-progress__bar']}
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden
    />
  )
}
