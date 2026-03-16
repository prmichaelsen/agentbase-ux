import { useRef, useCallback, useEffect, type RefObject } from 'react'

interface SwipeGestureOptions {
  threshold?: number
  maxVertical?: number
  onSwipe: () => void
  onMove?: (translateX: number) => void
  onCancel?: () => void
}

export function useSwipeGesture<T extends HTMLElement>(
  options: SwipeGestureOptions,
): {
  ref: RefObject<T | null>
  onTouchStart: (e: React.TouchEvent) => void
  onTouchEnd: () => void
} {
  const { threshold = 80, maxVertical = 40, onSwipe, onMove, onCancel } = options
  const ref = useRef<T | null>(null)
  const startX = useRef(0)
  const startY = useRef(0)
  const tracking = useRef(false)
  const swiping = useRef(false)

  const onMoveRef = useRef(onMove)
  const onCancelRef = useRef(onCancel)
  const onSwipeRef = useRef(onSwipe)
  onMoveRef.current = onMove
  onCancelRef.current = onCancel
  onSwipeRef.current = onSwipe

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleTouchMove = (e: TouchEvent) => {
      if (!tracking.current) return
      const touch = e.touches[0]
      const dx = touch.clientX - startX.current
      const dy = Math.abs(touch.clientY - startY.current)
      const absDx = Math.abs(dx)

      if (!swiping.current && dy > maxVertical) {
        tracking.current = false
        onMoveRef.current?.(0)
        onCancelRef.current?.()
        return
      }

      if (!swiping.current && absDx > 10) {
        swiping.current = true
      }

      if (swiping.current) {
        e.preventDefault()
        onMoveRef.current?.(dx)
      }
    }

    el.addEventListener('touchmove', handleTouchMove, { passive: false })
    return () => el.removeEventListener('touchmove', handleTouchMove)
  }, [maxVertical])

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    startX.current = touch.clientX
    startY.current = touch.clientY
    tracking.current = true
    swiping.current = false
  }, [])

  const onTouchEnd = useCallback(() => {
    if (!tracking.current) return
    tracking.current = false
    swiping.current = false

    const el = ref.current
    if (el) {
      const transform = el.style.transform
      const match = transform.match(/translateX\((-?\d+(?:\.\d+)?)px\)/)
      if (match) {
        const dx = parseFloat(match[1])
        if (Math.abs(dx) > threshold) {
          onSwipeRef.current()
          return
        }
      }
    }

    onMoveRef.current?.(0)
    onCancelRef.current?.()
  }, [threshold])

  return { ref, onTouchStart, onTouchEnd }
}
