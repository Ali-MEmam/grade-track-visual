import { Badge } from "@/components/atoms/Badge/Badge";
import { Button } from "@/components/atoms/Button/Button";
import { Card } from "@/components/atoms/Card/Card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, MoreVertical, Edit, Trash2, Eye, FileText, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface SchoolStudentsProps {
  schoolId: string;
}

// Mock data for demonstration
const mockStudents = [
  {
    id: "1",
    name: "Alice Johnson",
    grade: "10th Grade",
    section: "A",
    rollNumber: "2024001",
    email: "alice.j@student.school.edu",
    phone: "+1 (555) 111-2222",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AliceJohnson",
    status: "active",
    attendance: "95%",
    gpa: "3.8",
    enrollmentDate: "2022-08-15",
  },
  {
    id: "2",
    name: "Bob Smith",
    grade: "11th Grade",
    section: "B",
    rollNumber: "2023045",
    email: "bob.s@student.school.edu",
    phone: "+1 (555) 222-3333",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BobSmith",
    status: "active",
    attendance: "88%",
    gpa: "3.5",
    enrollmentDate: "2021-08-20",
  },
  {
    id: "3",
    name: "Carol Williams",
    grade: "9th Grade",
    section: "C",
    rollNumber: "2024089",
    email: "carol.w@student.school.edu",
    phone: "+1 (555) 333-4444",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CarolWilliams",
    status: "active",
    attendance: "92%",
    gpa: "3.9",
    enrollmentDate: "2023-08-18",
  },
  {
    id: "4",
    name: "David Brown",
    grade: "12th Grade",
    section: "A",
    rollNumber: "2021012",
    email: "david.b@student.school.edu",
    phone: "+1 (555) 444-5555",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidBrown",
    status: "active",
    attendance: "90%",
    gpa: "3.6",
    enrollmentDate: "2020-08-22",
  },
  {
    id: "5",
    name: "Emma Davis",
    grade: "10th Grade",
    section: "B",
    rollNumber: "2024002",
    email: "emma.d@student.school.edu",
    phone: "+1 (555) 555-6666",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=EmmaDavis",
    status: "inactive",
    attendance: "85%",
    gpa: "3.4",
    enrollmentDate: "2022-08-15",
  },
];

export const SchoolStudents = ({ schoolId }: SchoolStudentsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.includes(searchQuery) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGrade = gradeFilter === "all" || student.grade === gradeFilter;
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;

    return matchesSearch && matchesGrade && matchesStatus;
  });

  const grades = [...new Set(mockStudents.map(s => s.grade))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Students</h2>
          <p className="text-sm text-muted-foreground">
            Manage enrolled students and their academic records
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Enroll Student
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, roll number, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={gradeFilter} onValueChange={setGradeFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Grades" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grades</SelectItem>
            {grades.map(grade => (
              <SelectItem key={grade} value={grade}>{grade}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Students Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[350px]">Student</TableHead>
              <TableHead>Grade/Section</TableHead>
              <TableHead className="hidden md:table-cell">GPA</TableHead>
              <TableHead className="hidden sm:table-cell">Attendance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Enrolled</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-start gap-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{student.name}</p>
                        <Badge variant="outline" className="text-xs">
                          {student.rollNumber}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{student.email}</p>
                      <p className="text-xs text-muted-foreground">{student.phone}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {student.grade} - {student.section}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="secondary" className="text-xs">
                    {student.gpa}
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span className="text-sm text-muted-foreground">{student.attendance}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={student.status === "active" ? "outline" : "destructive"}
                    className={`text-xs ${
                      student.status === "active"
                        ? "border-green-500 text-green-700 dark:text-green-400"
                        : ""
                    }`}
                  >
                    {student.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <span className="text-sm text-muted-foreground">
                    {new Date(student.enrollmentDate).toLocaleDateString()}
                  </span>
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
                        <FileText className="mr-2 h-4 w-4" />
                        Academic Records
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        Contact Parents
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Student
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Student
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-lg font-semibold mb-2">
              {searchQuery || gradeFilter !== "all" || statusFilter !== "all" 
                ? "No Students Found" 
                : "No Students"}
            </p>
            <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
              {searchQuery || gradeFilter !== "all" || statusFilter !== "all"
                ? "No students match your search criteria. Try adjusting your filters."
                : "No students have been enrolled in this school yet. Start enrolling students."}
            </p>
            {!searchQuery && gradeFilter === "all" && statusFilter === "all" && (
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Enroll First Student
              </Button>
            )}
          </div>
        )}
      </Card>

      {/* Summary */}
      {filteredStudents.length > 0 && (
        <div className="text-sm text-muted-foreground">
          Showing {filteredStudents.length} of {mockStudents.length} students
        </div>
      )}
    </div>
  );
};