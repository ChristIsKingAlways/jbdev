'use client'

import { useSyncExternalStore } from 'react'

function subscribe(callback) {
  window.addEventListener('scroll', callback, { passive: true })
  return () => window.removeEventListener('scroll', callback)
}

function getSnapshot() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  return docHeight > 0 ? scrollTop / docHeight : 0
}

function getServerSnapshot() {
  return 0
}

/**
 * Scroll progress 0–1; uses useSyncExternalStore for concurrent-safe reads.
 */
export function useScrollProgress() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
