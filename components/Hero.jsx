'use client'

/**
 * Hero section: primary message and CTAs; copy panel uses global .glass--hero.
 * BEM block: hero (see Hero.module.css).
 */

import { useInView } from '@/hooks/useInView'
import styles from './Hero.module.css'

function scrollToSection(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const [ref, visible] = useInView({ threshold: 0.05, rootMargin: '0px', once: true })

  return (
    <section
      id="home"
      className={styles.hero}
      ref={ref}
      aria-labelledby="hero-heading"
    >
      <div className={styles.hero__inner}>
        <div
          className={`${styles.hero__copy} glass glass--hero ${visible ? styles['hero__copy--animate'] : ''}`}
        >
          <h1 id="hero-heading" className={styles.hero__headline}>
            <span className={styles['hero__headline-line']}>Crafting digital</span>
            <span
              className={`${styles['hero__headline-line']} ${styles['hero__headline-line--muted']}`}
            >
              experiences that matter
            </span>
          </h1>

          <p className={styles.hero__lede}>
            Developer and entrepreneur focused on building thoughtful, scalable solutions for the modern
            web.
          </p>

          <div className={styles.hero__actions}>
            <button
              type="button"
              className={styles['hero__button--primary']}
              onClick={() => scrollToSection('#projects')}
            >
              View Work
            </button>
            <button
              type="button"
              className={styles['hero__button--secondary']}
              onClick={() => scrollToSection('#contact')}
            >
              Get in touch →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
