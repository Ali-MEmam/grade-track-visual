import { Button } from "@/components/atoms/Button/Button";
import {
  DataTable,
  TableHeader,
} from "@/components/molecules/DataTable/DataTable";
import { Pagination } from "@/components/molecules/Pagination/Pagination";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";
import { TeacherFilter } from "./Components/Filters";
import { TableActions } from "./Components/TableActions.Teacher";
import { TableCell } from "./Components/TableCell";

// Mock teacher data
const teachersData = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Teacher ${i + 1}`,
  email: `teacher${i + 1}@school.edu`,
  subject: [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Physics",
    "Chemistry",
    "Biology",
    "Art",
    "Music",
    "Physical Education",
  ][Math.floor(Math.random() * 10)],
  department: [
    "Science",
    "Mathematics",
    "Languages",
    "Social Studies",
    "Arts",
    "Physical Education",
  ][Math.floor(Math.random() * 6)],
  status: Math.random() > 0.1 ? "Active" : "Inactive",
  hireDate: new Date(
    2015 + Math.floor(Math.random() * 8),
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1
  ).toLocaleDateString(),
  experience: Math.floor(Math.random() * 20) + 1,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=teacher${i + 1}`,
}));

const ITEMS_PER_PAGE = 10;

// Table headers configuration
const tableHeaders: TableHeader[] = [
  { key: "teacher", label: "Teacher" },
  { key: "subject", label: "Subject", className: "hidden sm:table-cell" },
  { key: "department", label: "Department", className: "hidden md:table-cell" },
  { key: "status", label: "Status", className: "hidden lg:table-cell" },
  {
    key: "experience",
    label: "Experience",
    className: "hidden lg:table-cell",
  },
];

export function Teachers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);

  // Filter teachers
  const filteredTeachers = teachersData.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      subjectFilter === "all" || teacher.subject === subjectFilter;
    const matchesDepartment =
      departmentFilter === "all" || teacher.department === departmentFilter;
    const matchesStatus =
      statusFilter === "all" ||
      teacher.status.toLowerCase() === statusFilter.toLowerCase();

    return (
      matchesSearch && matchesSubject && matchesDepartment && matchesStatus
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredTeachers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTeachers = filteredTeachers.slice(
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
          <h1 className="text-2xl sm:text-3xl font-bold">Teachers</h1>
          <p className="text-muted-foreground">
            Manage teacher records and information
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Teacher
        </Button>
      </div>

      <TeacherFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        subjectFilter={subjectFilter}
        setSubjectFilter={setSubjectFilter}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <Card>
        {/* Teachers Table */}
        <DataTable
          headers={tableHeaders}
          data={paginatedTeachers}
          renderCell={TableCell}
          renderActions={TableActions}
          emptyMessage="No teachers found"
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={filteredTeachers.length}
          showStatus={true}
        />
      </Card>
    </div>
  );
}
