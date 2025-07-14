import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card/Card"
import { Badge } from "@/components/atoms/Badge/Badge"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  trend?: {
    value: number
    label: string
    type: "increase" | "decrease"
  }
  className?: string
  style?: React.CSSProperties
}

export const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  className,
  style 
}: StatCardProps) => {
  return (
    <Card className={cn("transition-all duration-200 hover:shadow-elegant", className)} style={style}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <Icon className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && (
          <div className="mt-2">
            <Badge 
              variant={trend.type === "increase" ? "default" : "secondary"}
              className="text-xs"
            >
              {trend.type === "increase" ? "+" : "-"}{trend.value}% {trend.label}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}