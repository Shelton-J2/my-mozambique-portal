'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

export default function AnimatedCounter({ target, suffix = '', duration = 2200 }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const started = useRef(false)
  const rafRef = useRef(null)

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true
      let startTime = null

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = easeOutCubic(progress)

        setCount(Math.floor(eased * target))

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate)
        } else {
          setCount(target)
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [inView, target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}
