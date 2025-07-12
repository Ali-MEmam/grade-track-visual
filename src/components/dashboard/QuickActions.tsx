import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  UserPlus, 
  FileText, 
  Calendar, 
  Bell, 
  BookOpen, 
  BarChart3 
} from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      title: "Add Student",
      description: "Register new student",
      icon: UserPlus,
      variant: "default" as const,
      action: () => console.log("Add student")
    },
    {
      title: "Create Report",
      description: "Generate report",
      icon: FileText,
      variant: "secondary" as const,
      action: () => console.log("Create report")
    },
    {
      title: "Schedule Event",
      description: "Add to calendar",
      icon: Calendar,
      variant: "tertiary" as const,
      action: () => console.log("Schedule event")
    },
    {
      title: "Send Notice",
      description: "Notify parents/students",
      icon: Bell,
      variant: "success" as const,
      action: () => console.log("Send notice")
    },
    {
      title: "Manage Classes",
      description: "View all classes",
      icon: BookOpen,
      variant: "outline" as const,
      action: () => console.log("Manage classes")
    },
    {
      title: "View Analytics",
      description: "Performance insights",
      icon: BarChart3,
      variant: "ghost" as const,
      action: () => console.log("View analytics")
    }
  ]

  return (
    <Card className="shadow-card hover:shadow-hover transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {actions.map((action, index) => (
            <Button
              key={action.title}
              variant={action.variant}
              className="h-auto p-3 sm:p-4 justify-start gap-2 sm:gap-3 animate-scale-in text-left"
              onClick={action.action}
            >
              <action.icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <div className="text-left min-w-0">
                <div className="font-medium text-xs sm:text-sm truncate">{action.title}</div>
                <div className="text-xs opacity-70 truncate hidden sm:block">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}