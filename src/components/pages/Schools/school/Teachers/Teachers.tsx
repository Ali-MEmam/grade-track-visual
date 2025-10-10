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
import { Plus, Search, MoreVertical, Edit, Trash2, Eye, BookOpen, Calendar, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTeachers } from "./hooks/useTeachers";
import { useCreateTeacher } from "./hooks/useCreateTeacher";
import { useDeleteTeacher } from "./hooks/useDeleteTeacher";
import { AddTeacherModal } from "./components/AddTeacherModal";

interface TeachersProps {
  schoolId: string;
}

export const Teachers = ({ schoolId }: TeachersProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: teachers = [], isLoading, error } = useTeachers(schoolId);
  const createTeacherMutation = useCreateTeacher(schoolId);
  const deleteTeacherMutation = useDeleteTeacher(schoolId);

  const filteredTeachers = teachers.filter(teacher =>
    teacher.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.subjects.some(subject => 
      subject.toLowerCase().includes(searchQuery.toLowerCase())
    ) ||
    teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h2 className="text-xl font-semibold">Teachers</h2>
          <p className="text-sm text-muted-foreground">
            Manage teaching staff and their subject assignments
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Teacher
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search teachers by name, subject, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Teachers Table */}
      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-destructive mb-2">Failed to load teachers</p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[350px]">Teacher</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead className="hidden md:table-cell">Classes</TableHead>
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
                          alt={teacher.fullName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="space-y-1">
                          <p className="font-medium">{teacher.fullName}</p>
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
                      <div className="flex flex-wrap gap-1">
                        {teacher.classIds.map((classId, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {classId}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(teacher.isActive)}
                        className={`text-xs ${getStatusColor(teacher.isActive)}`}
                      >
                        {teacher.isActive ? "Active" : "Inactive"}
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
                            Manage Subjects
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            View Schedule
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => {
                              if (confirm("Are you sure you want to remove this teacher?")) {
                                deleteTeacherMutation.mutate(teacher.id);
                              }
                            }}
                          >
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
                    : "No teachers have been assigned to this school yet."}
                </p>
                {!searchQuery && (
                  <Button onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Teacher
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </Card>

      {/* Add Teacher Modal */}
      <AddTeacherModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={createTeacherMutation.mutateAsync}
        schoolId={schoolId}
      />
    </div>
  );
};