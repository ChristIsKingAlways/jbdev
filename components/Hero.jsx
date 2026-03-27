'use client'

/**
 * Landing section. Glass panel: global classes `glass` + `glassHero`.
 */

import { useInView } from '@/hooks/useInView'
import styles from './Hero.module.css'

function scrollToSection(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const [ref, visible] = useInView({ threshold: 0.05, rootMargin: '0px', once: true })

  return (
    <section id="home" className={styles.section} ref={ref} aria-labelledby="hero-heading">
      <div className={styles.inner}>
        <div className={`${styles.copy} glass glassHero ${visible ? styles.copyAnimated : ''}`}>
          <h1 id="hero-heading" className={styles.headline}>
            <span className={styles.line}>Crafting digital</span>
            <span className={`${styles.line} ${styles.lineMuted}`}>experiences that matter</span>
          </h1>

          <p className={styles.lede}>
            Developer and entrepreneur focused on building thoughtful, scalable solutions for the modern
            web.
          </p>

          <div className={styles.actions}>
            <button type="button" className={styles.btnPrimary} onClick={() => scrollToSection('#projects')}>
              View Work
            </button>
            <button type="button" className={styles.btnSecondary} onClick={() => scrollToSection('#contact')}>
              Get in touch →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
