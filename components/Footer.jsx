'use client'

/**
 * Site footer: year, outbound social links; inner row uses global .glass--footer.
 * BEM block: footer (see Footer.module.css).
 */

import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`${styles.footer__inner} glass glass--footer`}>
        <p className={styles.footer__copy}>© {year} Jordan Benson</p>
        <nav className={styles.footer__nav} aria-label="Social">
          <a
            href="https://github.com/ChristIsKingAlways"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footer__link}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/jordan-l-benson/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footer__link}
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  )
}
