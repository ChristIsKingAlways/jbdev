'use client'

/**
 * After HOVER_MS on one element, shows truncated outerHTML in a glass tooltip.
 * Opt out: data-no-markup-inspector on an element. Root carries data-markup-inspector.
 * Styles: HoverCodeTooltip.module.css (scoped names + global `glass`).
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './HoverCodeTooltip.module.css'

const HOVER_MS = 1500
const MAX_CHARS = 900
const ATTR_ROOT = 'data-markup-inspector'
const ATTR_IGNORE = 'data-no-markup-inspector'

function isExcluded(el) {
  if (!el || !(el instanceof Element)) return true
  const tag = el.tagName
  if (tag === 'HTML' || tag === 'BODY' || tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') {
    return true
  }
  if (el.getAttribute(ATTR_IGNORE) === 'true') return true
  if (el.closest(`[${ATTR_ROOT}]`)) return true
  return false
}

function formatElementCode(el) {
  try {
    let raw = el.outerHTML
    raw = raw.replace(/\s+/g, ' ').trim()
    if (raw.length > MAX_CHARS) {
      return `${raw.slice(0, MAX_CHARS)}\n…`
    }
    return raw
  } catch {
    return `<${el.tagName?.toLowerCase() ?? '?'}>`
  }
}

function clampPosition(clientX, clientY, boxW, boxH) {
  const pad = 12
  const vw = window.innerWidth
  const vh = window.innerHeight
  const w = Math.min(boxW, vw - pad * 2)
  const h = Math.min(boxH, vh - pad * 2)

  let x = clientX + pad
  let y = clientY + pad

  if (x + w > vw - pad) x = clientX - w - pad
  if (x < pad) x = pad
  if (y + h > vh - pad) y = clientY - h - pad
  if (y < pad) y = pad

  return { x, y }
}

export default function HoverCodeTooltip() {
  const [panel, setPanel] = useState(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const rootRef = useRef(null)
  const activeElRef = useRef(null)
  const timerRef = useRef(null)
  const showPosRef = useRef({ x: 0, y: 0 })

  const hide = useCallback(() => {
    if (timerRef.current != null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    activeElRef.current = null
    setPanel(null)
  }, [])

  const scheduleShow = useCallback((el, clientX, clientY) => {
    if (timerRef.current != null) clearTimeout(timerRef.current)
    activeElRef.current = el
    showPosRef.current = { x: clientX, y: clientY }
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null
      if (activeElRef.current !== el) return
      setPanel(formatElementCode(el))
    }, HOVER_MS)
  }, [])

  useLayoutEffect(() => {
    if (!panel) return undefined
    const root = rootRef.current
    if (!root) return undefined

    const reposition = () => {
      const rect = root.getBoundingClientRect()
      const { x, y } = clampPosition(showPosRef.current.x, showPosRef.current.y, rect.width, rect.height)
      setPos({ x, y })
    }

    reposition()
    const ro = new ResizeObserver(reposition)
    ro.observe(root)
    return () => ro.disconnect()
  }, [panel])

  useEffect(() => {
    const onMouseOver = (e) => {
      if (!(e.target instanceof Element)) return
      const t = e.target
      if (isExcluded(t)) return
      if (activeElRef.current !== t) {
        scheduleShow(t, e.clientX, e.clientY)
      }
    }

    const onMouseOut = (e) => {
      if (!(e.target instanceof Element)) return
      const related = e.relatedTarget
      const active = activeElRef.current
      if (!active) return
      if (related instanceof Node && active.contains(related)) return
      hide()
    }

    const onScroll = () => hide()
    const onKeyDown = (e) => {
      if (e.key === 'Escape') hide()
    }

    document.addEventListener('mouseover', onMouseOver, true)
    document.addEventListener('mouseout', onMouseOut, true)
    window.addEventListener('scroll', onScroll, { passive: true, capture: true })
    window.addEventListener('resize', hide)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      if (timerRef.current != null) clearTimeout(timerRef.current)
      document.removeEventListener('mouseover', onMouseOver, true)
      document.removeEventListener('mouseout', onMouseOut, true)
      window.removeEventListener('scroll', onScroll, { capture: true })
      window.removeEventListener('resize', hide)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [hide, scheduleShow])

  if (!panel) return null

  return (
    <div
      ref={rootRef}
      {...{ [ATTR_ROOT]: '' }}
      className={`glass ${styles.panel}`}
      style={{ left: pos.x, top: pos.y }}
      aria-hidden="true"
    >
      <div className={styles.label}>Markup</div>
      <pre className={styles.code}>
        <code>{panel}</code>
      </pre>
    </div>
  )
}
