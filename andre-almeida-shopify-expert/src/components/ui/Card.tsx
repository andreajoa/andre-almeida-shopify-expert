import { cn } from "@/lib/utils"

interface CardProps {
  className?: string
  children: React.ReactNode
  variant?: "default" | "glass" | "gradient"
}

export function Card({ className, children, variant = "default" }: CardProps) {
  return (
    <div className={cn(
      "rounded-2xl p-6 md:p-8 transition-all duration-500 hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/5",
      variant === "default" && "bg-slate-800/50 border border-white/5",
      variant === "glass" && "bg-white/5 backdrop-blur-xl border border-white/10",
      variant === "gradient" && "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5",
      className
    )}>{children}</div>
  )
}
