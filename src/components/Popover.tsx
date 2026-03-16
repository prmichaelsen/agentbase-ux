/**
 * Popover — Themeable positioned popover with auto viewport adjustment.
 *
 * Renders in a portal. Supports above/below anchor positioning with
 * automatic flipping when insufficient viewport space.
 */

import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '../lib/theming'

interface PopoverProps {
  open: boolean
  anchorRef: RefObject<HTMLElement | null>
  onClose: () => void
  children: ReactNode
  className?: string
  anchor?: 'above' | 'below'
}

export function Popover({ open, anchorRef, onClose, children, className, anchor = 'below' }: PopoverProps) {
  const t = useTheme()
  const popoverRef = useRef<HTMLDivElement>(null)
  const [adjustedStyle, setAdjustedStyle] = useState<React.CSSProperties>({})

  useEffect(() => {
    if (!open) return
    function handlePointerDown(e: PointerEvent | TouchEvent) {
      const target = e.target as Node
      if (
        popoverRef.current && !popoverRef.current.contains(target) &&
        anchorRef.current && !anchorRef.current.contains(target)
      ) {
        onClose()
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose, anchorRef])

  useEffect(() => {
    if (!open || !popoverRef.current || !anchorRef.current) return
    const anchorRect = anchorRef.current.getBoundingClientRect()
    const popoverRect = popoverRef.current.getBoundingClientRect()
    const padding = 16
    const style: React.CSSProperties = { position: 'absolute', zIndex: 50 }

    let left = anchorRect.left + window.scrollX
    if (left + popoverRect.width > window.innerWidth - padding) {
      left = Math.max(padding, window.innerWidth - popoverRect.width - padding)
    }
    if (left < padding) left = padding
    style.left = left

    const spaceBelow = window.innerHeight - anchorRect.bottom
    const spaceAbove = anchorRect.top

    if (anchor === 'below') {
      if (spaceBelow >= popoverRect.height + padding || spaceBelow >= spaceAbove) {
        style.top = anchorRect.bottom + window.scrollY
      } else {
        style.bottom = document.documentElement.scrollHeight - anchorRect.top - window.scrollY
      }
    } else {
      if (spaceAbove >= popoverRect.height + padding || spaceAbove >= spaceBelow) {
        style.bottom = document.documentElement.scrollHeight - anchorRect.top - window.scrollY
      } else {
        style.top = anchorRect.bottom + window.scrollY
      }
    }
    setAdjustedStyle(style)
  }, [open, anchor, anchorRef])

  if (!open || !anchorRef.current) return null

  const rect = anchorRef.current.getBoundingClientRect()
  const initialStyle: React.CSSProperties = {
    position: 'absolute',
    left: rect.left + window.scrollX,
    zIndex: 50,
    visibility: adjustedStyle.left != null ? 'visible' : 'hidden',
    ...(anchor === 'above'
      ? { bottom: document.documentElement.scrollHeight - rect.top - window.scrollY }
      : { top: rect.bottom + window.scrollY }),
  }

  const style = adjustedStyle.left != null ? adjustedStyle : initialStyle
  const defaultClasses = `${t.elevated} ${t.border} shadow-lg rounded-lg`

  return createPortal(
    <div ref={popoverRef} style={style} className={className ?? defaultClasses}>
      {children}
    </div>,
    document.body,
  )
}
