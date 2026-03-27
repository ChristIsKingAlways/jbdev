'use client'

/**
 * Portfolio grid: Microlink screenshots, dense responsive columns.
 * BEM: projects (section), project-card (tile). See Projects.module.css.
 */

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
      className={styles['project-card']}
    >
      <div className={styles['project-card__thumb']}>
        <Image
          src={project.image}
          alt={`Preview of ${project.title}`}
          className={styles['project-card__image']}
          fill
          sizes="(max-width: 23.99rem) 34vw, (max-width: 47.99rem) 22vw, (max-width: 63.99rem) 16vw, 12vw"
        />
      </div>
      <div className={styles['project-card__meta']}>
        <div className={styles['project-card__text']}>
          <h3 className={styles['project-card__title']}>{project.title}</h3>
          <p className={styles['project-card__category']}>{project.category}</p>
        </div>
        <span className={styles['project-card__arrow']} aria-hidden>
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
      className={styles.projects}
      aria-labelledby="projects-heading"
      ref={ref}
    >
      <div className={styles.projects__inner}>
        <header className={styles.projects__header}>
          <p className={styles.projects__eyebrow}>Selected Work</p>
          <h2 id="projects-heading" className={styles.projects__title}>
            Recent projects
          </h2>
        </header>

        <div
          className={`${styles.projects__grid} ${visible ? styles['projects__grid--visible'] : ''}`}
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
