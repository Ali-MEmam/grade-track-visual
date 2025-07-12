import { StatsOverview } from "@/components/dashboard/StatsOverview"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { AttendanceChart } from "@/components/dashboard/AttendanceChart"

const Index = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, Principal Smith
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening at your school today
        </p>
      </div>

      {/* Stats Overview */}
      <StatsOverview />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Charts and Analytics */}
        <div className="lg:col-span-2 space-y-8">
          <AttendanceChart />
        </div>

        {/* Right Column - Activity and Actions */}
        <div className="space-y-8">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Index;
