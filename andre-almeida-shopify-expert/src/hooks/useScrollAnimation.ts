"use client"
import { useEffect, useRef, useState } from "react"

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setIsVisible(true); obs.unobserve(el) }
    }, { threshold })
    obs.observe(el)
    return () => obs.unobserve(el)
  }, [threshold])

  return { ref, isVisible }
}
