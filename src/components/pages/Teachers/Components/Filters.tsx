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
import { Filter, Search } from "lucide-react";

interface TeacherFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  subjectFilter: string;
  setSubjectFilter: (value: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

const subjects = [
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
];

const departments = [
  "Science",
  "Mathematics",
  "Languages",
  "Social Studies",
  "Arts",
  "Physical Education",
];

export const TeacherFilter = ({
  searchTerm,
  setSearchTerm,
  subjectFilter,
  setSubjectFilter,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter,
}: TeacherFilterProps) => {
  return (
    <Card className="p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search teachers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((department) => (
              <SelectItem key={department} value={department}>
                {department}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="w-full">
          <Filter className="w-4 h-4 mr-2" />
          Advanced Filters
        </Button>
      </div>
    </Card>
  );
};
