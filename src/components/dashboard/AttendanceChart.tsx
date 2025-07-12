import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const attendanceData = [
  { day: 'Mon', present: 950, absent: 45 },
  { day: 'Tue', present: 920, absent: 75 },
  { day: 'Wed', present: 980, absent: 15 },
  { day: 'Thu', present: 940, absent: 55 },
  { day: 'Fri', present: 890, absent: 105 },
]

export function AttendanceChart() {
  return (
    <Card className="shadow-card hover:shadow-hover transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Weekly Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-card)'
                }}
              />
              <Bar 
                dataKey="present" 
                fill="hsl(var(--success))" 
                name="Present"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="absent" 
                fill="hsl(var(--destructive))" 
                name="Absent"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-sm text-muted-foreground">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-destructive rounded-full"></div>
            <span className="text-sm text-muted-foreground">Absent</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}