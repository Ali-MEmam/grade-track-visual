import { useState } from "react";
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
import { Plus, Search, MoreVertical, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStudents } from "./hooks/useStudents";
import { useCreateStudent } from "./hooks/useCreateStudent";
import { useUpdateStudent } from "./hooks/useUpdateStudent";
import { useDeleteStudent } from "./hooks/useDeleteStudent";
import { AddStudentModal } from "./components/AddStudentModal";
import { EditStudentModal } from "./components/EditStudentModal";
import { StudentDetailsModal } from "./components/StudentDetailsModal";
import { Student } from "./types/student.types";

interface StudentsProps {
  schoolId: string;
}

export const Students = ({ schoolId }: StudentsProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const { data: students = [], isLoading, error } = useStudents();
  const createStudentMutation = useCreateStudent(schoolId);
  const updateStudentMutation = useUpdateStudent(schoolId);
  const deleteStudentMutation = useDeleteStudent(schoolId);

  const filteredStudents = students.filter(student =>
    student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenEditModal = (student: Student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleOpenDetailsModal = (student: Student) => {
    setSelectedStudent(student);
    setIsDetailsModalOpen(true);
  };

  const handleDelete = (studentId: string) => {
    if (confirm("Are you sure you want to remove this student?")) {
      deleteStudentMutation.mutate(studentId);
    }
  };

  const getStatusVariant = (isActive: boolean) => {
    return isActive ? "outline" : "destructive";
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? "border-green-500 text-green-700 dark:text-green-400"
      : "";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Students</h2>
          <p className="text-sm text-muted-foreground">
            Manage student enrollment and information
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search students by name, email, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Students Table */}
      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-destructive mb-2">Failed to load students</p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[350px]">Student</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="hidden md:table-cell">Class</TableHead>
                  <TableHead>Status</TableHead>
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
                          alt={student.fullName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="space-y-1">
                          <p className="font-medium">{student.fullName}</p>
                          <p className="text-xs text-muted-foreground">
                            Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm">{student.email}</p>
                        <p className="text-xs text-muted-foreground">{student.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline" className="text-xs">
                        {student.classId}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(student.isActive)}
                        className={`text-xs ${getStatusColor(student.isActive)}`}
                      >
                        {student.isActive ? "Active" : "Inactive"}
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
                          <DropdownMenuItem onClick={() => handleOpenDetailsModal(student)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleOpenEditModal(student)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Student
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(student.id)}
                          >
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
                  {searchQuery ? "No Students Found" : "No Students"}
                </p>
                <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
                  {searchQuery
                    ? "No students match your search criteria. Try adjusting your search."
                    : "No students have been enrolled in this school yet."}
                </p>
                {!searchQuery && (
                  <Button onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Student
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </Card>

      {/* Add Student Modal */}
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={createStudentMutation.mutateAsync}
        schoolId={schoolId}
      />

      {/* Edit Student Modal */}
      {selectedStudent && (
        <EditStudentModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedStudent(null);
          }}
          onSubmit={(data) => updateStudentMutation.mutateAsync({ id: selectedStudent.id, data })}
          student={selectedStudent}
          schoolId={schoolId}
        />
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
        <StudentDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedStudent(null);
          }}
          student={selectedStudent}
        />
      )}
    </div>
  );
};
