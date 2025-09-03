import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

interface AttendanceDataPoint {
  date: string;
  attendance: number;
  target: number;
}

interface AttendanceChartProps {
  data?: AttendanceDataPoint[];
  loading?: boolean;
  className?: string;
}

// Mock data for demonstration
const mockData: AttendanceDataPoint[] = [
  { date: "Mon", attendance: 95, target: 90 },
  { date: "Tue", attendance: 87, target: 90 },
  { date: "Wed", attendance: 92, target: 90 },
  { date: "Thu", attendance: 89, target: 90 },
  { date: "Fri", attendance: 94, target: 90 },
  { date: "Sat", attendance: 96, target: 90 },
  { date: "Sun", attendance: 85, target: 90 },
];

export const AttendanceChart = ({
  data = mockData,
  loading = false,
  className,
}: AttendanceChartProps) => {
  if (loading) {
    return (
      <Card className={cn("animate-pulse", className)}>
        <CardHeader>
          <div className="h-6 bg-muted rounded w-1/3"></div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded"></div>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Attendance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            No attendance data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Attendance Trends
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Actual</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span className="text-muted-foreground">Target</span>
              </div>
            </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[70, 100]}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value}%`,
                name === "attendance" ? "Actual" : "Target",
              ]}
              labelFormatter={(label) => `Date: ${label}`}
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px hsl(var(--border) / 0.1)",
              }}
            />
            <Line
              type="monotone"
              dataKey="attendance"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export type { AttendanceChartProps, AttendanceDataPoint };
