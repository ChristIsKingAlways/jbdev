'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight mb-8">
            <span className="text-white">Crafting digital</span>
            <br />
            <span className="text-white/60">experiences that matter</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/50 max-w-xl mb-12 leading-relaxed font-light">
            Developer and entrepreneur focused on building thoughtful, 
            scalable solutions for the modern web.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => scrollToSection('#projects')}
              className="px-8 py-4 text-sm font-medium text-dark-900 bg-white rounded-full
                         transition-all duration-300 hover:bg-white/90"
            >
              View Work
            </button>

            <button
              onClick={() => scrollToSection('#contact')}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Get in touch →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
