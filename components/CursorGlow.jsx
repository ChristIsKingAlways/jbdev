'use client'

import { useEffect, useState } from 'react'
import { usePointerFine } from '@/hooks/usePointerFine'
import styles from './CursorGlow.module.css'

export default function CursorGlow() {
  const finePointer = usePointerFine()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!finePointer) return undefined

    const onMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.body.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.body.removeEventListener('mouseleave', onLeave)
    }
  }, [finePointer])

  if (!finePointer) return null

  return (
    <div
      className={styles.glow}
      style={{
        left: position.x,
        top: position.y,
        opacity: visible ? 1 : 0,
      }}
      aria-hidden
    />
  )
}
