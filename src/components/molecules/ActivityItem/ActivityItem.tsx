import { Badge } from "@/components/atoms/Badge/Badge"

interface ActivityItemProps {
  type: "enrollment" | "assignment" | "alert"
  title: string
  description: string
  time: string
  user?: string
}

export const ActivityItem = ({ type, title, description, time, user }: ActivityItemProps) => {
  const getBadgeVariant = () => {
    switch (type) {
      case "enrollment": return "default"
      case "assignment": return "secondary" 
      case "alert": return "destructive"
      default: return "outline"
    }
  }

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-sm font-medium text-foreground truncate">
            {title}
          </h4>
          <Badge variant={getBadgeVariant()} className="text-xs shrink-0">
            {type}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mb-1">
          {description}
        </p>
        {user && (
          <p className="text-xs text-muted-foreground">
            by {user}
          </p>
        )}
      </div>
      <span className="text-xs text-muted-foreground shrink-0">
        {time}
      </span>
    </div>
  )
}