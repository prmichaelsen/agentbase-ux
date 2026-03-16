/**
 * Modal — Themeable portal-based modal with escape/backdrop dismiss.
 *
 * Supports persistent mode (no dismiss), configurable max-width,
 * and iOS safe-area-inset-top.
 */

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '../lib/theming'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  style?: React.CSSProperties
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  persistent?: boolean
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
}

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  style,
  maxWidth = 'md',
  persistent = false,
}: ModalProps) {
  const t = useTheme()

  useEffect(() => {
    if (persistent) return
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleEscapeKey)
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, persistent])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  if (!isOpen) return null
  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      className={`fixed inset-0 z-[55] flex items-center justify-center overflow-hidden ${t.overlay}`}
      onClick={persistent ? undefined : handleBackdropClick}
      style={{ width: '100vw', height: '100vh', top: 0, left: 0, margin: 0, paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div
        className={`relative max-h-[90vh] w-full ${maxWidthClasses[maxWidth]} overflow-auto rounded-xl ${t.card} p-6 shadow-xl m-4`}
        onClick={(e) => e.stopPropagation()}
        style={{ margin: '1rem', ...(style || {}) }}
      >
        {!persistent && (
          <button
            type="button"
            className={`absolute top-4 right-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full ${t.textMuted} ${t.hover} transition-colors`}
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        {title && (
          <div className="mb-4 pr-8">
            <h3 className={`text-xl font-bold ${t.textPrimary}`}>{title}</h3>
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>,
    document.body,
  )
}
