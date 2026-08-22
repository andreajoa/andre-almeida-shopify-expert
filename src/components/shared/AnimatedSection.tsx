"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
}

const directionClass: Record<string, string> = {
  up: "translate-y-8",
  down: "-translate-y-8",
  left: "translate-x-8",
  right: "-translate-x-8",
  none: "",
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reducedMotion) {
      el.style.opacity = "1"
      el.style.transform = "translate(0,0)"
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1"
          el.style.transform = "translate(0,0)"
          observer.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(directionClass[direction], className)}
      style={{
        opacity: 0,
        transition: `opacity 650ms cubic-bezier(0.22,1,0.36,1) ${delay * 1000}ms, transform 650ms cubic-bezier(0.22,1,0.36,1) ${delay * 1000}ms`,
      }}
    >
      {children}
    </div>
  )
}
