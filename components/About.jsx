'use client'

/**
 * About + skills. Bio panel: `glass glassAbout`.
 */

import { useInView } from '@/hooks/useInView'
import styles from './About.module.css'

const SKILLS = [
  'React',
  'Next.js',
  'JavaScript',
  'HTML & CSS',
  'Supabase',
  'Vercel',
  'API design',
  'Automation',
]

export default function About() {
  const [ref, visible] = useInView({ threshold: 0.1, once: true })

  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading" ref={ref}>
      <div className={`${styles.inner} ${visible ? styles.innerVisible : ''}`}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>About</p>
          <h2 id="about-heading" className={styles.lead}>
            Builder. Problem solver. Always learning.
          </h2>
        </div>

        <div className={`${styles.body} glass glassAbout`}>
          <p>
            I&apos;m a builder at heart with a background in IT support and a growing focus on full-stack
            development. After 17 years of solving real-world technical problems, I&apos;ve shifted toward
            creating digital tools, websites, and systems that actually move things forward.
          </p>

          <p>
            I don&apos;t come from a traditional developer path—I come from hands-on experience. I&apos;ve
            spent years troubleshooting, learning how systems break, and more importantly, how to fix them.
            That perspective carries into everything I build today: practical, user-focused, and built to work
            in the real world.
          </p>

          <p>
            Right now, I&apos;m actively developing projects that combine modern web technologies with
            automation and AI. From building platforms like IronDisciple to working with tools like Supabase,
            Vercel, and API integrations, I&apos;m focused on creating solutions that are not just
            functional—but meaningful.
          </p>

          <p>
            I&apos;m especially interested in building things that help people—whether that&apos;s through
            better user experiences, smarter systems, or tools that solve real problems.
          </p>

          <p className={styles.emphasis}>
            I&apos;m not just learning to code. I&apos;m building, testing, and improving every day.
          </p>

          <ul className={styles.skills} aria-label="Focus areas">
            {SKILLS.map((skill) => (
              <li key={skill} className={styles.skillTag}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
