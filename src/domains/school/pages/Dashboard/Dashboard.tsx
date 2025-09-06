import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/Card/Card';
import { Users, GraduationCap, BookOpen, Calendar, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/atoms/Button/Button';

export const SchoolDashboard: React.FC = () => {
  // This would come from API/context
  const schoolData = {
    schoolName: 'Lincoln High School',
    stats: {
      totalStudents: 450,
      totalTeachers: 32,
      activeClasses: 24,
      upcomingEvents: 5,
      attendanceRate: 94.5,
      averageGrade: 85.2,
    },
  };

  const recentActivities = [
    { id: 1, type: 'grade', message: 'Math exam grades posted for Grade 10', time: '2 hours ago' },
    { id: 2, type: 'event', message: 'Parent-Teacher meeting scheduled', time: '5 hours ago' },
    { id: 3, type: 'student', message: '3 new students enrolled', time: '1 day ago' },
  ];

  const upcomingClasses = [
    { id: 1, subject: 'Mathematics', teacher: 'Mr. Johnson', time: '9:00 AM', room: 'A-101' },
    { id: 2, subject: 'Science', teacher: 'Ms. Smith', time: '10:30 AM', room: 'B-203' },
    { id: 3, subject: 'English', teacher: 'Mrs. Davis', time: '1:00 PM', room: 'C-105' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome to {schoolData.schoolName}</h1>
        <p className="text-muted-foreground">School Management Dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schoolData.stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teachers</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schoolData.stats.totalTeachers}</div>
            <p className="text-xs text-muted-foreground">All present today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schoolData.stats.activeClasses}</div>
            <p className="text-xs text-muted-foreground">6 in session</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schoolData.stats.upcomingEvents}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schoolData.stats.attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Grade</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schoolData.stats.averageGrade}%</div>
            <p className="text-xs text-muted-foreground">B+ average</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today's Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((class_) => (
                <div key={class_.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{class_.subject}</p>
                    <p className="text-sm text-muted-foreground">
                      {class_.teacher} • Room {class_.room}
                    </p>
                  </div>
                  <div className="text-sm font-medium">{class_.time}</div>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                View Full Schedule
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                View All Activities
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};