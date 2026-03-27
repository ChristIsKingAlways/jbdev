'use client'

import { useSyncExternalStore } from 'react'

function subscribe(callback) {
  const mq = window.matchMedia('(pointer: fine)')
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

function getSnapshot() {
  return window.matchMedia('(pointer: fine)').matches
}

function getServerSnapshot() {
  return false
}

export function usePointerFine() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
