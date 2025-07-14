import { Plus, UserPlus, BookOpen, FileText, Calendar, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card/Card"
import { Button } from "@/components/atoms/Button/Button"

const actions = [
  { 
    label: "Add Student", 
    icon: UserPlus, 
    description: "Enroll new student",
    variant: "default" as const
  },
  { 
    label: "Create Class", 
    icon: BookOpen, 
    description: "Set up new course",
    variant: "secondary" as const
  },
  { 
    label: "Generate Report", 
    icon: FileText, 
    description: "Academic reports",
    variant: "outline" as const
  },
  { 
    label: "Schedule Event", 
    icon: Calendar, 
    description: "Add to calendar",
    variant: "outline" as const
  },
  { 
    label: "Manage Staff", 
    icon: Users, 
    description: "Faculty management",
    variant: "secondary" as const
  },
  { 
    label: "Quick Entry", 
    icon: Plus, 
    description: "Fast data input",
    variant: "default" as const
  }
]

export const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={action.label}
              variant={action.variant}
              className="h-auto p-4 flex flex-col items-start gap-2 text-left transition-all duration-200 hover:scale-105"
              style={{ animationDelay: `${index * 50}ms` } as React.CSSProperties}
            >
              <div className="flex items-center gap-2 w-full">
                <action.icon className="w-4 h-4 shrink-0" />
                <span className="font-medium text-sm">{action.label}</span>
              </div>
              <span className="text-xs opacity-80 font-normal">
                {action.description}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}