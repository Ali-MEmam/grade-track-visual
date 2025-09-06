import { useState } from "react";
import { ClassesList } from "./Components/ClassesList";
import { ClassData } from "./Components/ClassCard";
import { useToast } from "@/hooks/use-toast";

// Mock classes data
const mockClasses: ClassData[] = [
  {
    id: "1",
    name: "Advanced Mathematics",
    subject: "Mathematics",
    teacher: {
      id: "t1",
      name: "Dr. Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahJohnson",
    },
    studentsCount: 28,
    capacity: 30,
    schedule: {
      days: ["Monday", "Wednesday", "Friday"],
      time: "09:00 - 10:30",
    },
    status: "active",
    room: "Room 201",
  },
  {
    id: "2",
    name: "Physics Fundamentals",
    subject: "Physics",
    teacher: {
      id: "t2",
      name: "Prof. Michael Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MichaelBrown",
    },
    studentsCount: 25,
    capacity: 28,
    schedule: {
      days: ["Tuesday", "Thursday"],
      time: "14:00 - 15:30",
    },
    status: "active",
    room: "Lab 1",
  },
  {
    id: "3",
    name: "English Literature",
    subject: "English",
    teacher: {
      id: "t3",
      name: "Ms. Emily Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=EmilyDavis",
    },
    studentsCount: 32,
    capacity: 35,
    schedule: {
      days: ["Monday", "Tuesday", "Thursday"],
      time: "11:00 - 12:00",
    },
    status: "active",
    room: "Room 105",
  },
  {
    id: "4",
    name: "World History",
    subject: "History",
    teacher: {
      id: "t4",
      name: "Dr. Robert Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RobertWilson",
    },
    studentsCount: 22,
    capacity: 30,
    schedule: {
      days: ["Wednesday", "Friday"],
      time: "10:00 - 11:30",
    },
    status: "active",
    room: "Room 203",
  },
  {
    id: "5",
    name: "Chemistry Lab",
    subject: "Chemistry",
    teacher: {
      id: "t5",
      name: "Mrs. Jennifer Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JenniferLee",
    },
    studentsCount: 18,
    capacity: 20,
    schedule: {
      days: ["Tuesday", "Thursday"],
      time: "16:00 - 17:30",
    },
    status: "active",
    room: "Lab 2",
  },
  {
    id: "6",
    name: "Art & Design",
    subject: "Art",
    teacher: {
      id: "t6",
      name: "Ms. Anna Garcia",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnnaGarcia",
    },
    studentsCount: 15,
    capacity: 25,
    schedule: {
      days: ["Monday", "Wednesday"],
      time: "13:00 - 14:30",
    },
    status: "active",
    room: "Art Studio",
  },
  {
    id: "7",
    name: "Computer Science",
    subject: "Computer Science",
    teacher: {
      id: "t7",
      name: "Dr. James Miller",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JamesMiller",
    },
    studentsCount: 30,
    capacity: 32,
    schedule: {
      days: ["Tuesday", "Thursday", "Friday"],
      time: "15:00 - 16:00",
    },
    status: "active",
    room: "Computer Lab",
  },
  {
    id: "8",
    name: "Spanish Language",
    subject: "Spanish",
    teacher: {
      id: "t8",
      name: "Señora Maria Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MariaRodriguez",
    },
    studentsCount: 20,
    capacity: 25,
    schedule: {
      days: ["Monday", "Wednesday", "Friday"],
      time: "12:00 - 13:00",
    },
    status: "active",
    room: "Room 107",
  },
  {
    id: "9",
    name: "Biology",
    subject: "Biology",
    teacher: {
      id: "t9",
      name: "Dr. Lisa Thompson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LisaThompson",
    },
    studentsCount: 26,
    capacity: 28,
    schedule: {
      days: ["Tuesday", "Thursday"],
      time: "08:00 - 09:30",
    },
    status: "inactive",
    room: "Lab 3",
  },
  {
    id: "10",
    name: "Music Theory",
    subject: "Music",
    teacher: {
      id: "t10",
      name: "Mr. David Clark",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidClark",
    },
    studentsCount: 12,
    capacity: 20,
    schedule: {
      days: ["Wednesday", "Friday"],
      time: "17:00 - 18:00",
    },
    status: "archived",
    room: "Music Room",
  },
];

export const Classes = () => {
  const [classes, setClasses] = useState<ClassData[]>(mockClasses);
  const { toast } = useToast();

  const handleClassUpdate = (id: string, updates: Partial<ClassData>) => {
    setClasses((prev) =>
      prev.map((classItem) =>
        classItem.id === id ? { ...classItem, ...updates } : classItem
      )
    );
  };

  const handleClassDelete = (id: string) => {
    setClasses((prev) => prev.filter((classItem) => classItem.id !== id));
  };

  const handleCreateClass = () => {
    toast({
      title: "Create Class",
      description: "Create class functionality would be implemented here.",
    });
  };

  return (
    <div className="space-y-6 lg:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
          Classes
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage all classes, schedules, and course information
        </p>
      </div>

      {/* Classes List */}
      <ClassesList
        classes={classes}
        onClassUpdate={handleClassUpdate}
        onClassDelete={handleClassDelete}
        onCreateClass={handleCreateClass}
      />
    </div>
  );
};
