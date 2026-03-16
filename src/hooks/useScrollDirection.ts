import { useEffect, useRef, useState } from 'react'

export function useScrollDirection(
  elementRef?: React.RefObject<HTMLElement | null>,
  threshold = 40,
): 'up' | 'down' | null {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null)
  const peak = useRef(0)

  useEffect(() => {
    const el = elementRef?.current

    const handleScroll = () => {
      const y = el ? el.scrollTop : window.scrollY

      if (y <= threshold) {
        if (direction === 'down') setDirection('up')
        peak.current = y
        return
      }

      if (direction !== 'down' && y > peak.current + threshold) {
        setDirection('down')
        peak.current = y
      } else if (direction !== 'up' && y < peak.current - threshold) {
        setDirection('up')
        peak.current = y
      } else {
        if (direction === 'down' && y > peak.current) {
          peak.current = y
        } else if (direction === 'up' && y < peak.current) {
          peak.current = y
        }
      }
    }

    const target = el || window
    target.addEventListener('scroll', handleScroll, { passive: true })
    return () => target.removeEventListener('scroll', handleScroll)
  }, [elementRef, threshold, direction])

  return direction
}
