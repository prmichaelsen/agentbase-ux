import { useEffect } from 'react'

function getHistoryKey(): string | null {
  if (typeof window === 'undefined') return null
  return window.history.state?.key ?? null
}

function storageKey(historyKey: string): string {
  return `scroll:${historyKey}`
}

export function useScrollRestore() {
  useEffect(() => {
    const key = getHistoryKey()
    if (!key) return

    const saved = sessionStorage.getItem(storageKey(key))
    if (saved != null) {
      const y = parseInt(saved, 10)
      if (!isNaN(y)) {
        requestAnimationFrame(() => window.scrollTo(0, y))
      }
    }

    return () => {
      const currentKey = getHistoryKey()
      if (currentKey) {
        sessionStorage.setItem(storageKey(currentKey), String(window.scrollY))
      }
    }
  }, [])
}
