"use client"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
        variant === "primary" && "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25",
        variant === "secondary" && "bg-emerald-600 text-white hover:bg-emerald-500 hover:scale-105",
        variant === "outline" && "border border-white/20 text-white backdrop-blur-sm hover:bg-white/10 hover:scale-105",
        variant === "ghost" && "text-slate-300 hover:text-white hover:bg-white/5",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-base",
        size === "lg" && "px-8 py-4 text-lg",
        className
      )}
      {...props}
    >{children}</button>
  )
)
Button.displayName = "Button"
export { Button }
