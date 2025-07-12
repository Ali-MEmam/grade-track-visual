import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  change?: {
    value: string
    trend: "up" | "down" | "neutral"
  }
  icon: LucideIcon
  variant?: "default" | "primary" | "secondary" | "success" | "warning"
  className?: string
}

export function StatCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  variant = "default",
  className 
}: StatCardProps) {
  const variants = {
    default: "bg-gradient-card border-border",
    primary: "bg-gradient-primary text-primary-foreground border-primary/20",
    secondary: "bg-gradient-secondary text-secondary-foreground border-secondary/20",
    success: "bg-success/10 border-success/20 text-success-foreground",
    warning: "bg-warning/10 border-warning/20 text-warning-foreground"
  }

  const iconVariants = {
    default: "text-primary bg-primary/10",
    primary: "text-primary-foreground bg-white/20",
    secondary: "text-secondary-foreground bg-white/20",
    success: "text-success bg-success/10",
    warning: "text-warning bg-warning/10"
  }

  const getTrendColor = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up": return "text-success"
      case "down": return "text-destructive"
      case "neutral": return "text-muted-foreground"
    }
  }

  return (
    <Card className={cn(
      "shadow-card hover:shadow-hover transition-all duration-300 hover:scale-[1.02]",
      variants[variant],
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <p className={cn(
              "text-sm font-medium",
              variant === "default" ? "text-muted-foreground" : "text-current opacity-80"
            )}>
              {title}
            </p>
            <div className="space-y-1">
              <p className="text-2xl font-bold">
                {value}
              </p>
              {change && (
                <p className={cn(
                  "text-xs font-medium",
                  variant === "default" ? getTrendColor(change.trend) : "text-current opacity-70"
                )}>
                  {change.value}
                </p>
              )}
            </div>
          </div>
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            iconVariants[variant]
          )}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}