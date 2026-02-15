import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "indigo" | "emerald" | "purple" | "orange" | "rose"
  className?: string
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
        {
          "bg-white/10 text-slate-300": variant === "default",
          "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20": variant === "indigo",
          "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20": variant === "emerald",
          "bg-purple-500/10 text-purple-400 border border-purple-500/20": variant === "purple",
          "bg-orange-500/10 text-orange-400 border border-orange-500/20": variant === "orange",
          "bg-rose-500/10 text-rose-400 border border-rose-500/20": variant === "rose",
        },
        className
      )}
    >
      {children}
    </span>
  )
}
