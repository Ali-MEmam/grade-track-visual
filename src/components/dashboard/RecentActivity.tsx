import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, UserPlus, BookOpen, FileText, AlertCircle } from "lucide-react"

interface Activity {
  id: string
  type: "enrollment" | "assignment" | "grade" | "alert"
  title: string
  description: string
  time: string
  user: {
    name: string
    initials: string
  }
}

export function RecentActivity() {
  const activities: Activity[] = [
    {
      id: "1",
      type: "enrollment",
      title: "New Student Enrolled",
      description: "Sarah Johnson enrolled in Advanced Mathematics",
      time: "2 hours ago",
      user: { name: "Sarah Johnson", initials: "SJ" }
    },
    {
      id: "2",
      type: "assignment",
      title: "Assignment Submitted",
      description: "Physics Lab Report by Michael Chen",
      time: "4 hours ago",
      user: { name: "Michael Chen", initials: "MC" }
    },
    {
      id: "3",
      type: "grade",
      title: "Grades Updated",
      description: "Chemistry Quiz results published",
      time: "6 hours ago",
      user: { name: "Dr. Smith", initials: "DS" }
    },
    {
      id: "4",
      type: "alert",
      title: "Attendance Alert",
      description: "Low attendance in Biology Class",
      time: "1 day ago",
      user: { name: "System", initials: "SY" }
    }
  ]

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "enrollment": return <UserPlus className="w-4 h-4" />
      case "assignment": return <FileText className="w-4 h-4" />
      case "grade": return <BookOpen className="w-4 h-4" />
      case "alert": return <AlertCircle className="w-4 h-4" />
    }
  }

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "enrollment": return "bg-success/10 text-success"
      case "assignment": return "bg-primary/10 text-primary"
      case "grade": return "bg-secondary/10 text-secondary"
      case "alert": return "bg-warning/10 text-warning"
    }
  }

  const getBadgeVariant = (type: Activity["type"]) => {
    switch (type) {
      case "enrollment": return "secondary"
      case "assignment": return "default"
      case "grade": return "outline"
      case "alert": return "destructive"
    }
  }

  return (
    <Card className="shadow-card hover:shadow-hover transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div 
            key={activity.id} 
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 animate-slide-in"
          >
            <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
                <Badge variant={getBadgeVariant(activity.type)} className="text-xs">
                  {activity.type}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-xs">{activity.user.initials}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}