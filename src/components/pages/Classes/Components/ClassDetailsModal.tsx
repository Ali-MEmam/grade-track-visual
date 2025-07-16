import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import {
  BookOpen,
  Users,
  Clock,
  Calendar,
  MapPin,
  User,
  GraduationCap,
  Mail,
  Phone,
} from "lucide-react";
import { ClassData } from "./ClassCard";

interface ClassDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: ClassData | null;
}

// Mock student data for the class
const mockStudents = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.j@school.edu",
    grade: "A",
    attendance: 95,
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.s@school.edu",
    grade: "B+",
    attendance: 87,
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol.d@school.edu",
    grade: "A-",
    attendance: 92,
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.w@school.edu",
    grade: "B",
    attendance: 89,
  },
  {
    id: "5",
    name: "Eva Brown",
    email: "eva.b@school.edu",
    grade: "A+",
    attendance: 98,
  },
];

const mockScheduleDetails = [
  { day: "Monday", time: "09:00 - 10:30", room: "Room 201" },
  { day: "Wednesday", time: "09:00 - 10:30", room: "Room 201" },
  { day: "Friday", time: "09:00 - 10:30", room: "Room 201" },
];

export const ClassDetailsModal = ({
  isOpen,
  onClose,
  classData,
}: ClassDetailsModalProps) => {
  if (!classData) return null;

  const getStatusColor = (status: ClassData["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
      case "inactive":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "archived":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getTeacherInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-bold">
                {classData.name}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {classData.subject}
                </span>
                <Badge className={getStatusColor(classData.status)}>
                  {classData.status}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Class Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Class Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Enrollment</p>
                      <p className="text-sm text-muted-foreground">
                        {classData.studentsCount} of {classData.capacity}{" "}
                        students
                      </p>
                    </div>
                  </div>

                  {classData.room && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Room</p>
                        <p className="text-sm text-muted-foreground">
                          {classData.room}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Schedule</p>
                      <p className="text-sm text-muted-foreground">
                        {classData.schedule.days.join(", ")} •{" "}
                        {classData.schedule.time}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Teacher Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Instructor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={classData.teacher.avatar}
                        alt={classData.teacher.name}
                      />
                      <AvatarFallback>
                        {getTeacherInitials(classData.teacher.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{classData.teacher.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Subject Teacher
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {classData.teacher.name.toLowerCase().replace(" ", ".")}
                        @school.edu
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">94.2%</div>
                    <div className="text-sm text-muted-foreground">
                      Average Attendance
                    </div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">B+</div>
                    <div className="text-sm text-muted-foreground">
                      Average Grade
                    </div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">85%</div>
                    <div className="text-sm text-muted-foreground">
                      Assignment Completion
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Enrolled Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {student.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-medium">{student.grade}</div>
                          <div className="text-muted-foreground">Grade</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">
                            {student.attendance}%
                          </div>
                          <div className="text-muted-foreground">
                            Attendance
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockScheduleDetails.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">{schedule.day}</h4>
                          <p className="text-sm text-muted-foreground">
                            {schedule.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {schedule.room}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export type { ClassDetailsModalProps };
