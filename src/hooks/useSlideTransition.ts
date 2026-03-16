import { useState, useEffect, useRef, useCallback } from 'react'

export function useSlideTransition(isOpen: boolean, duration = 300) {
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState(false)
  const nodeRef = useRef<HTMLDivElement | null>(null)

  const closingRef = useRef(false)

  const handleTransitionEnd = useCallback(() => {
    if (closingRef.current) {
      closingRef.current = false
      setMounted(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      closingRef.current = false
      setMounted(true)
    } else if (mounted) {
      closingRef.current = true
      setActive(false)
      const timer = setTimeout(() => {
        if (closingRef.current) {
          closingRef.current = false
          setMounted(false)
        }
      }, duration + 50)
      return () => clearTimeout(timer)
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (mounted && isOpen && !active) {
      const node = nodeRef.current
      if (node) {
        // Force reflow — same technique as react-transition-group
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        node.scrollTop
      }
      setActive(true)
    }
  }, [mounted]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return
    node.addEventListener('transitionend', handleTransitionEnd)
    return () => node.removeEventListener('transitionend', handleTransitionEnd)
  }, [mounted, handleTransitionEnd])

  return { mounted, active, ref: nodeRef }
}
