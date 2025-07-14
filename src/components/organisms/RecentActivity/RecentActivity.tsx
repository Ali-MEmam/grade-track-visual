import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card/Card"
import { ActivityItem } from "@/components/molecules/ActivityItem/ActivityItem"

const activities = [
  {
    type: "enrollment" as const,
    title: "New Student Enrolled",
    description: "Sarah Johnson joined Grade 10-A",
    time: "2 hours ago",
    user: "Admin"
  },
  {
    type: "assignment" as const,
    title: "Assignment Submitted",
    description: "Mathematics homework due today",
    time: "4 hours ago",
    user: "John Smith"
  },
  {
    type: "alert" as const,
    title: "Low Attendance Alert",
    description: "Grade 9-B attendance below 85%",
    time: "6 hours ago",
    user: "System"
  },
  {
    type: "enrollment" as const,
    title: "New Teacher Added",
    description: "Dr. Emily Davis - Science Department",
    time: "1 day ago",
    user: "Principal"
  },
  {
    type: "assignment" as const,
    title: "Exam Scheduled",
    description: "Physics final exam - Grade 12",
    time: "2 days ago",
    user: "Dr. Wilson"
  }
]

export const RecentActivity = () => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {activities.map((activity, index) => (
          <ActivityItem
            key={index}
            type={activity.type}
            title={activity.title}
            description={activity.description}
            time={activity.time}
            user={activity.user}
          />
        ))}
      </CardContent>
    </Card>
  )
}