import { Card, CardContent, CardHeader } from "@/components/atoms/Card/Card";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/ui/input";
import { Plus, Search, GraduationCap, Mail, Phone, BookOpen, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface SchoolTeachersProps {
  schoolId: string;
}

// Mock data for demonstration
const mockTeachers = [
  {
    id: "1",
    name: "Mr. Robert Chen",
    subjects: ["Mathematics", "Physics"],
    email: "r.chen@school.edu",
    phone: "+1 (555) 456-7890",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RobertChen",
    status: "active",
    experience: "8 years",
    qualification: "M.Sc. Mathematics",
  },
  {
    id: "2",
    name: "Ms. Maria Garcia",
    subjects: ["English Literature", "Creative Writing"],
    email: "m.garcia@school.edu",
    phone: "+1 (555) 567-8901",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MariaGarcia",
    status: "active",
    experience: "12 years",
    qualification: "M.A. English",
  },
  {
    id: "3",
    name: "Dr. Jennifer Lee",
    subjects: ["Chemistry", "Biology"],
    email: "j.lee@school.edu",
    phone: "+1 (555) 678-9012",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JenniferLee",
    status: "active",
    experience: "15 years",
    qualification: "Ph.D. Chemistry",
  },
  {
    id: "4",
    name: "Mr. David Brown",
    subjects: ["History", "Geography"],
    email: "d.brown@school.edu",
    phone: "+1 (555) 789-0123",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidBrown",
    status: "on-leave",
    experience: "6 years",
    qualification: "B.A. History",
  },
];

export const SchoolTeachers = ({ schoolId }: SchoolTeachersProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTeachers = mockTeachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.subjects.some(subject => 
      subject.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Teachers</h2>
          <p className="text-sm text-muted-foreground">
            Manage teaching staff and their subject assignments
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Teacher
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search teachers by name or subject..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Teachers Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Avatar */}
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="w-12 h-12 rounded-full"
                  />
                  
                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{teacher.name}</h3>
                      <Badge 
                        variant={teacher.status === "active" ? "success" : "warning"}
                        className="text-xs"
                      >
                        {teacher.status}
                      </Badge>
                    </div>

                    {/* Subjects */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {teacher.subjects.map((subject, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{teacher.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span>{teacher.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="h-3 w-3" />
                        <span>{teacher.qualification}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        <span>{teacher.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit Teacher</DropdownMenuItem>
                    <DropdownMenuItem>Assign Subjects</DropdownMenuItem>
                    <DropdownMenuItem>View Schedule</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Remove Teacher
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTeachers.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {searchQuery ? "No Teachers Found" : "No Teachers"}
            </h3>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              {searchQuery 
                ? "No teachers match your search criteria. Try adjusting your search."
                : "No teachers have been assigned to this school yet. Add teachers to manage classes."}
            </p>
            {!searchQuery && (
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add First Teacher
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};