'use client'

/**
 * Site navigation: fixed bar, in-page anchor scroll, glass states.
 * BEM block: navigation (see Navigation.module.css).
 */

import { useEffect, useState } from 'react'
import styles from './Navigation.module.css'

const NAV_LINKS = [
  { name: 'Work', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

function scrollToSelector(selector) {
  if (selector === '#home' || selector === '') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.querySelector(selector)
  el?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`${styles.navigation} ${scrolled ? styles['navigation--scrolled'] : styles['navigation--expanded']}`}
    >
      <nav className={styles.navigation__inner} aria-label="Primary">
        <a
          href="#home"
          className={styles.navigation__brand}
          onClick={(e) => {
            e.preventDefault()
            scrollToSelector('#home')
          }}
        >
          Jordan Benson
        </a>

        <ul className={styles.navigation__list}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={styles.navigation__link}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSelector(link.href)
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={styles['navigation__cta-mobile']}
          onClick={() => scrollToSelector('#contact')}
        >
          Contact
        </button>
      </nav>
    </header>
  )
}
