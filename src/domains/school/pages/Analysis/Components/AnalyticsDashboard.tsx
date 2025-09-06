import { useState, useEffect } from "react";
import { MetricCard } from "./MetricCard";
import { AttendanceChart } from "./AttendanceChart";
import { PerformanceChart } from "./PerformanceChart";
import { DateRangeFilter, DateRange } from "./DateRangeFilter";
import { ExportActions, ExportFormat } from "./ExportActions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  UserCheck,
  Clock,
} from "lucide-react";

// Mock data - in a real app, this would come from an API
const mockMetrics = {
  totalStudents: 2847,
  totalTeachers: 89,
  activeClasses: 156,
  attendanceRate: 94.2,
  averageGrade: 3.4,
  onTimeRate: 87.3,
};

export const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return { from: startOfMonth, to: endOfMonth };
  });

  const [loading, setLoading] = useState(false);

  // Simulate data loading when date range changes
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [dateRange]);

  const handleExport = async (format: ExportFormat) => {
    // Simulate export delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In a real app, this would generate and download the file
    console.log(`Exporting analytics data as ${format}`, {
      dateRange,
      metrics: mockMetrics,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with filters and export */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Analytics Overview
          </h2>
          <p className="text-sm text-muted-foreground">
            Performance metrics and trends for your school
          </p>
        </div>

        <div className="flex items-center gap-4">
          <DateRangeFilter value={dateRange} onChange={setDateRange} />
          <ExportActions onExport={handleExport} />
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          title="Total Students"
          value={mockMetrics.totalStudents.toLocaleString()}
          description="Active enrollments"
          icon={Users}
          trend={{ value: 5.2, label: "from last month", type: "increase" }}
          loading={loading}
        />

        <MetricCard
          title="Total Teachers"
          value={mockMetrics.totalTeachers}
          description="Faculty members"
          icon={GraduationCap}
          trend={{ value: 2.1, label: "from last month", type: "increase" }}
          loading={loading}
        />

        <MetricCard
          title="Active Classes"
          value={mockMetrics.activeClasses}
          description="This semester"
          icon={BookOpen}
          trend={{ value: 8.3, label: "from last semester", type: "increase" }}
          loading={loading}
        />

        <MetricCard
          title="Attendance Rate"
          value={`${mockMetrics.attendanceRate}%`}
          description="This period"
          icon={UserCheck}
          trend={{ value: 1.8, label: "from last period", type: "increase" }}
          loading={loading}
        />

        <MetricCard
          title="Average Grade"
          value={mockMetrics.averageGrade.toFixed(1)}
          description="GPA across all students"
          icon={TrendingUp}
          trend={{ value: 0.3, label: "from last period", type: "increase" }}
          loading={loading}
        />

        <MetricCard
          title="On-Time Rate"
          value={`${mockMetrics.onTimeRate}%`}
          description="Punctuality metric"
          icon={Clock}
          trend={{ value: 2.1, label: "from last period", type: "decrease" }}
          loading={loading}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AttendanceChart loading={loading} />
        <PerformanceChart loading={loading} />
      </div>

      {/* Teacher Workload Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Teacher Workload Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 animate-pulse">
                  <div className="h-8 w-8 bg-muted rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                  <div className="h-4 bg-muted rounded w-16"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {[
                {
                  name: "Dr. Sarah Johnson",
                  classes: 6,
                  students: 180,
                  load: "high",
                },
                {
                  name: "Prof. Michael Brown",
                  classes: 5,
                  students: 150,
                  load: "normal",
                },
                {
                  name: "Ms. Emily Davis",
                  classes: 4,
                  students: 120,
                  load: "normal",
                },
                {
                  name: "Dr. Robert Wilson",
                  classes: 7,
                  students: 210,
                  load: "high",
                },
                {
                  name: "Mrs. Jennifer Lee",
                  classes: 3,
                  students: 90,
                  load: "low",
                },
              ].map((teacher) => (
                <div
                  key={teacher.name}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {teacher.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h4 className="font-medium">{teacher.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {teacher.classes} classes • {teacher.students} students
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        teacher.load === "high"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                          : teacher.load === "low"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                      }`}
                    >
                      {teacher.load} load
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export type { DateRange };
