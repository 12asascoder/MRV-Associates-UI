import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export function useAnimatedNumber(value: number, active = true, duration = 700) {
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(value)
  const current = useRef(value)

  if (reduced && active && display !== value) {
    setDisplay(value)
  }

  useEffect(() => {
    if (!active) return
    if (reduced) {
      current.current = value
      return
    }

    const start = current.current
    const delta = value - start
    const began = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const progress = Math.min(1, (now - began) / duration)
      const eased = 1 - (1 - progress) ** 3
      const next = start + delta * eased
      current.current = next
      setDisplay(next)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, duration, reduced, value])

  return display
}
