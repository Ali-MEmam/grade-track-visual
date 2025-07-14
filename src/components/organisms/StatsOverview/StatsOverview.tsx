import { Users, GraduationCap, BookOpen, TrendingUp } from "lucide-react"
import { StatCard } from "@/components/molecules/StatCard/StatCard"

const stats = [
  {
    title: "Total Students",
    value: "2,847",
    description: "Active enrollments",
    icon: Users,
    trend: { value: 12, label: "from last month", type: "increase" as const }
  },
  {
    title: "Total Teachers", 
    value: "89",
    description: "Faculty members",
    icon: GraduationCap,
    trend: { value: 3, label: "from last month", type: "increase" as const }
  },
  {
    title: "Active Classes",
    value: "156",
    description: "This semester",
    icon: BookOpen,
    trend: { value: 8, label: "from last semester", type: "increase" as const }
  },
  {
    title: "Attendance Rate",
    value: "94.2%",
    description: "This week",
    icon: TrendingUp,
    trend: { value: 2.1, label: "from last week", type: "increase" as const }
  }
]

export const StatsOverview = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          trend={stat.trend}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
        />
      ))}
    </div>
  )
}