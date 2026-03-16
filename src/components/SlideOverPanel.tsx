/**
 * SlideOverPanel — Themeable right-side slide-over overlay with backdrop.
 */

import { useEffect, useState, type ReactNode } from 'react'
import { useTheme } from '../lib/theming'

interface SlideOverPanelProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export function SlideOverPanel({ open, onClose, children }: SlideOverPanelProps) {
  const t = useTheme()
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      setMounted(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
    } else {
      setVisible(false)
      const timer = setTimeout(() => setMounted(false), 200)
      return () => clearTimeout(timer)
    }
  }, [open])

  if (!mounted) return null

  return (
    <>
      <div
        className={`fixed inset-0 z-20 transition-opacity duration-200 ${t.overlay} ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 bottom-0 w-72 ${t.sidebar} overflow-y-auto z-30 transition-transform duration-200 ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        {children}
      </div>
    </>
  )
}
