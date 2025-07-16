import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Button } from "@/components/atoms/Button/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Users, Clock, Calendar, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface ClassData {
  id: string;
  name: string;
  subject: string;
  teacher: {
    id: string;
    name: string;
    avatar?: string;
  };
  studentsCount: number;
  schedule: {
    days: string[];
    time: string;
  };
  status: "active" | "inactive" | "archived";
  room?: string;
  capacity: number;
}

interface ClassCardProps {
  classData: ClassData;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  className?: string;
}

export const ClassCard = ({
  classData,
  onView,
  onEdit,
  onArchive,
  onDelete,
  className,
}: ClassCardProps) => {
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
    <Card className={cn("transition-all hover:shadow-md", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">
              {classData.name}
            </CardTitle>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {classData.subject}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(classData.status)}>
              {classData.status}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onView(classData.id)}>
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(classData.id)}>
                  Edit Class
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onArchive(classData.id)}>
                  Archive Class
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(classData.id)}
                  className="text-destructive focus:text-destructive"
                >
                  Delete Class
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Teacher Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={classData.teacher.avatar}
              alt={classData.teacher.name}
            />
            <AvatarFallback className="text-xs">
              {getTeacherInitials(classData.teacher.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{classData.teacher.name}</p>
            <p className="text-xs text-muted-foreground">Instructor</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {classData.studentsCount}/{classData.capacity} students
            </span>
          </div>

          {classData.room && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {classData.room}
              </span>
            </div>
          )}
        </div>

        {/* Schedule */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Schedule</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {classData.schedule.days.map((day) => (
                <Badge
                  key={day}
                  variant="outline"
                  className="text-xs px-2 py-1"
                >
                  {day.slice(0, 3)}
                </Badge>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {classData.schedule.time}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(classData.id)}
            className="flex-1"
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onEdit(classData.id)}
            className="flex-1"
          >
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export type { ClassCardProps };
