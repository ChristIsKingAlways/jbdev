'use client'

import { memo } from 'react'
import Image from 'next/image'
import { useInView } from '@/hooks/useInView'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    id: 1,
    title: 'Iron Disciple',
    category: 'Social Media Platform',
    image:
      'https://api.microlink.io/?url=https://irondisciple.org&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=5000&timestamp=1710700001',
    link: 'https://irondisciple.org',
  },
  {
    id: 2,
    title: 'Close It',
    category: 'CRM',
    image: 'https://api.microlink.io/?url=https://closeit.online&screenshot=true&meta=false&embed=screenshot.url',
    link: 'https://closeit.online',
  },
  {
    id: 3,
    title: 'Authoship',
    category: 'SaaS Platform',
    image: 'https://api.microlink.io/?url=https://authoship.io&screenshot=true&meta=false&embed=screenshot.url',
    link: 'https://authoship.io',
  },
]

const ProjectCard = memo(function ProjectCard({ project }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <div className={styles.thumb}>
        <Image
          src={project.image}
          alt={`Preview of ${project.title}`}
          className={styles.image}
          fill
          sizes="(max-width: 23.99rem) 34vw, (max-width: 47.99rem) 22vw, (max-width: 63.99rem) 16vw, 12vw"
        />
      </div>
      <div className={styles.meta}>
        <div className={styles.text}>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <p className={styles.category}>{project.category}</p>
        </div>
        <span className={styles.arrow} aria-hidden>
          →
        </span>
      </div>
    </a>
  )
})

export default function Projects() {
  const [ref, visible] = useInView({ threshold: 0.08, once: true })

  return (
    <section
      id="projects"
      className={styles.section}
      aria-labelledby="projects-heading"
      ref={ref}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Selected Work</p>
          <h2 id="projects-heading" className={styles.title}>
            Recent projects
          </h2>
        </header>

        <div className={`${styles.grid} ${styles.reveal} ${visible ? styles.revealVisible : ''}`}>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
