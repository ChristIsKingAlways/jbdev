'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './ParticleField.module.css'

export default function ParticleField() {
  const canvasRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    /** @type {number | undefined} */
    let animationId
    /** @type {{ x: number; y: number; vx: number; vy: number; size: number; opacity: number }[]} */
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles = []
      const area = canvas.width * canvas.height
      const density = reducedMotion ? 28000 : 15000
      const count = Math.max(8, Math.floor(area / density))

      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (reducedMotion ? 0 : 0.3),
          vy: (Math.random() - 0.5) * (reducedMotion ? 0 : 0.3),
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.45 + 0.12,
        })
      }
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`
        ctx.fill()
      })
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 175, 55, ${particle.opacity})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.hypot(dx, dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animationId = requestAnimationFrame(tick)
    }

    const onResize = () => {
      resize()
      createParticles()
      if (reducedMotion) drawStatic()
    }

    resize()
    createParticles()

    if (reducedMotion) {
      drawStatic()
    } else {
      tick()
    }

    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      if (animationId != null) cancelAnimationFrame(animationId)
      window.removeEventListener('resize', onResize)
    }
  }, [reducedMotion])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden />
}
