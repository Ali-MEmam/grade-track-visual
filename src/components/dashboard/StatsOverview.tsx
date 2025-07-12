import { Users, GraduationCap, BookOpen, Calendar } from "lucide-react"
import { StatCard } from "@/components/ui/stat-card"

export function StatsOverview() {
  const stats = [
    {
      title: "Total Students",
      value: "1,247",
      change: { value: "+12% from last month", trend: "up" as const },
      icon: Users,
      variant: "primary" as const
    },
    {
      title: "Teachers",
      value: "86",
      change: { value: "+3 new this semester", trend: "up" as const },
      icon: GraduationCap,
      variant: "secondary" as const
    },
    {
      title: "Active Classes",
      value: "42",
      change: { value: "2 starting next week", trend: "neutral" as const },
      icon: BookOpen,
      variant: "success" as const
    },
    {
      title: "Events This Week",
      value: "8",
      change: { value: "3 parent meetings", trend: "neutral" as const },
      icon: Calendar,
      variant: "warning" as const
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
      {stats.map((stat, index) => (
        <StatCard 
          key={stat.title} 
          {...stat} 
          className="animate-slide-in"
        />
      ))}
    </div>
  )
}