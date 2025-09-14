import { Badge } from "@/components/atoms/Badge/Badge";
import { Button } from "@/components/atoms/Button/Button";
import { Card } from "@/components/atoms/Card/Card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, MoreVertical, Edit, Trash2, Eye, Calendar, BookOpen } from "lucide-react";
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

      {/* Teachers Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[350px]">Teacher</TableHead>
              <TableHead>Subjects</TableHead>
              <TableHead className="hidden md:table-cell">Qualification</TableHead>
              <TableHead className="hidden sm:table-cell">Experience</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>
                  <div className="flex items-start gap-3">
                    <img
                      src={teacher.avatar}
                      alt={teacher.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="space-y-1">
                      <p className="font-medium">{teacher.name}</p>
                      <p className="text-xs text-muted-foreground">{teacher.email}</p>
                      <p className="text-xs text-muted-foreground">{teacher.phone}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.map((subject, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="text-sm text-muted-foreground">{teacher.qualification}</span>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span className="text-sm text-muted-foreground">{teacher.experience}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={teacher.status === "active" ? "outline" : "warning"}
                    className={`text-xs ${
                      teacher.status === "active"
                        ? "border-green-500 text-green-700 dark:text-green-400"
                        : ""
                    }`}
                  >
                    {teacher.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Teacher
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BookOpen className="mr-2 h-4 w-4" />
                        Assign Subjects
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        View Schedule
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Teacher
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Empty State */}
        {filteredTeachers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-lg font-semibold mb-2">
              {searchQuery ? "No Teachers Found" : "No Teachers"}
            </p>
            <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
              {searchQuery 
                ? "No teachers match your search criteria. Try adjusting your search."
                : "No teachers have been assigned to this school yet. Add teachers to manage classes."}
            </p>
            {!searchQuery && (
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add First Teacher
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};