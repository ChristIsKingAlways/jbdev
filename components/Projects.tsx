'use client'

import { useState } from 'react'

interface Project {
  id: number
  title: string
  category: string
  image: string
  link: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Iron Disciple',
    category: 'Social Media Platform',
    image: 'https://api.microlink.io/?url=https://irondisciple.org&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=5000&timestamp=1710700001',
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

function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={project.link}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-6">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-dark-900/20" />
      </div>
      
      <div className="flex items-baseline justify-between">
        <div>
          <h3 className="text-xl font-medium text-white mb-1">
            {project.title}
          </h3>
          <p className="text-sm text-white/40">
            {project.category}
          </p>
        </div>
        <span className="text-white/30 group-hover:text-white/60 transition-colors">
          →
        </span>
      </div>
    </a>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 md:py-40">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-20">
          <p className="text-sm text-white/40 uppercase tracking-wider mb-4">
            Selected Work
          </p>
          <h2 className="text-3xl md:text-4xl font-medium text-white">
            Recent projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
