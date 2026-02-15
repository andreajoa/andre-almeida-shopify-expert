"use client"

import { cn } from "@/lib/utils"

interface CardProps {
  className?: string
  children: React.ReactNode
  variant?: "default" | "glass" | "gradient"
  hover?: boolean
}

export function Card({ className, children, variant = "default", hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 md:p-8 transition-all duration-500",
        {
          "bg-slate-800/50 border border-white/5": variant === "default",
          "bg-white/5 backdrop-blur-xl border border-white/10": variant === "glass",
          "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5":
            variant === "gradient",
        },
        hover && "hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/5",
        className
      )}
    >
      {children}
    </div>
  )
}
