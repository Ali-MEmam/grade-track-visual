import { StatsOverview } from "@/components/organisms/StatsOverview/StatsOverview"
import { RecentActivity } from "@/components/organisms/RecentActivity/RecentActivity"
import { QuickActions } from "@/components/organisms/QuickActions/QuickActions"
import { AttendanceChart } from "@/components/organisms/AttendanceChart/AttendanceChart"

export const Dashboard = () => {
  return (
    <div className="space-y-6 lg:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
          Welcome back, Principal Smith
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Here's what's happening at your school today
        </p>
      </div>

      {/* Stats Overview */}
      <StatsOverview />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column - Charts and Analytics */}
        <div className="xl:col-span-2 space-y-6 lg:space-y-8">
          <AttendanceChart />
        </div>

        {/* Right Column - Activity and Actions */}
        <div className="space-y-6 lg:space-y-8">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}