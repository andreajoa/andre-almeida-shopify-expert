import { cn } from "@/lib/utils"

export function Badge({ children, variant = "default", className }: {
  children: React.ReactNode; variant?: string; className?: string
}) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
      variant === "default" && "bg-white/10 text-slate-300",
      variant === "indigo" && "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
      variant === "emerald" && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      variant === "purple" && "bg-purple-500/10 text-purple-400 border border-purple-500/20",
      className
    )}>{children}</span>
  )
}
