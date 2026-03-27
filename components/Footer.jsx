'use client'

import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} glass-surface glass-surface--footer`}>
        <p className={styles.copy}>© {year} Jordan Benson</p>
        <nav className={styles.links} aria-label="Social">
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
