'use client'

/**
 * IntersectionObserver wrapper: returns [ref, visible] for scroll-driven UI (e.g. reveals).
 */

import { useEffect, useRef, useState } from 'react'

/**
 * @param {object} [options]
 * @param {number} [options.threshold]
 * @param {string} [options.rootMargin]
 * @param {boolean} [options.once]
 */
export function useInView(options = {}) {
  const { threshold = 0.12, rootMargin = '0px 0px -8% 0px', once = true } = options
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, visible]
}
