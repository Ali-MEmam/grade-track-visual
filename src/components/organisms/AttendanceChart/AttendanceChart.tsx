import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card/Card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mon", attendance: 92 },
  { name: "Tue", attendance: 94 },
  { name: "Wed", attendance: 88 },
  { name: "Thu", attendance: 96 },
  { name: "Fri", attendance: 91 },
  { name: "Sat", attendance: 85 },
  { name: "Sun", attendance: 89 }
]

export const AttendanceChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Weekly Attendance Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] sm:h-[300px] lg:h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="name" 
                className="text-xs fill-muted-foreground"
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                className="text-xs fill-muted-foreground"
                axisLine={false}
                tickLine={false}
                domain={[80, 100]}
              />
              <Line 
                type="monotone" 
                dataKey="attendance" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}