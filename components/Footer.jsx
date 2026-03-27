'use client'

/**
 * Footer row uses `glass glassFooter`.
 */

import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.root}>
      <div className={`${styles.inner} glass glassFooter`}>
        <p className={styles.copy}>© {year} Jordan Benson</p>
        <nav className={styles.nav} aria-label="Social">
          <a
            href="https://github.com/ChristIsKingAlways"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/jordan-l-benson/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  )
}
