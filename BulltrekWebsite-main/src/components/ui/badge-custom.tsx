import { cn } from "@/lib/utils"

interface BadgeCustomProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: "outline" | "green"
}

export function BadgeCustom({ 
  children, 
  variant = "outline",
  className,
  ...props 
}: BadgeCustomProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
        variant === "outline" && "ring-0 text-secondary-50 text-md",
        variant === "green" && "bg-green-50 text-green-700 ring-green-200/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

