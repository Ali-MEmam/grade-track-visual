import { Button } from "@/components/atoms/Button/Button";
import {
  DataTable,
  TableHeader,
} from "@/components/molecules/DataTable/DataTable";
import { Pagination } from "@/components/molecules/Pagination/Pagination";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";
import { StudentFilter } from "./Components/Filters";
import { TableActions } from "./Components/TableActions.Student";
import { TableCell } from "./Components/TableCell";

// Mock student data
const studentsData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  email: `student${i + 1}@school.edu`,
  grade: `Grade ${Math.floor(Math.random() * 12) + 1}`,
  status: Math.random() > 0.5 ? "Active" : "Inactive",
  enrollmentDate: new Date(
    2023,
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1
  ).toLocaleDateString(),
  gpa: (Math.random() * 4).toFixed(2),
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 1}`,
}));

const ITEMS_PER_PAGE = 10;

// Table headers configuration
const tableHeaders: TableHeader[] = [
  { key: "student", label: "Student" },
  { key: "grade", label: "Grade", className: "hidden sm:table-cell" },
  { key: "status", label: "Status", className: "hidden md:table-cell" },
  { key: "gpa", label: "GPA", className: "hidden lg:table-cell" },
  {
    key: "enrollmentDate",
    label: "Enrollment Date",
    className: "hidden lg:table-cell",
  },
];

export function Students() {
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Filter students
  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === "all" || student.grade === gradeFilter;
    const matchesStatus =
      statusFilter === "all" ||
      student.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesGrade && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground">
            Manage student records and information
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>

      <StudentFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        gradeFilter={gradeFilter}
        setGradeFilter={setGradeFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <Card>
        {/* Students Table */}
        <DataTable
          headers={tableHeaders}
          data={paginatedStudents}
          renderCell={TableCell}
          renderActions={TableActions}
          emptyMessage="No students found"
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={filteredStudents.length}
          showStatus={true}
        />
      </Card>
    </div>
  );
}
