import { useState, useMemo } from "react";
import { ClassCard, ClassData } from "./ClassCard";
import { ClassFilters } from "./ClassFilters";
import { ClassDetailsModal } from "./ClassDetailsModal";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { Pagination } from "@/components/molecules/Pagination/Pagination";
import { Button } from "@/components/atoms/Button/Button";
import { Plus, Grid, List } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ClassesListProps {
  classes: ClassData[];
  onClassUpdate: (id: string, updates: Partial<ClassData>) => void;
  onClassDelete: (id: string) => void;
  onCreateClass: () => void;
  className?: string;
}

const ITEMS_PER_PAGE = 12;

export const ClassesList = ({
  classes,
  onClassUpdate,
  onClassDelete,
  onCreateClass,
  className,
}: ClassesListProps) => {
  const [filters, setFilters] = useState<ClassFilters>({
    search: "",
    subject: "",
    teacher: "",
    status: "",
    schedule: "",
  });

  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [deleteClass, setDeleteClass] = useState<ClassData | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  // Extract unique subjects and teachers for filters
  const subjects = useMemo(() => {
    return Array.from(new Set(classes.map((c) => c.subject))).sort();
  }, [classes]);

  const teachers = useMemo(() => {
    const teacherMap = new Map();
    classes.forEach((c) => {
      if (!teacherMap.has(c.teacher.id)) {
        teacherMap.set(c.teacher.id, c.teacher);
      }
    });
    return Array.from(teacherMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [classes]);

  // Filter classes based on filters
  const filteredClasses = useMemo(() => {
    return classes.filter((classItem) => {
      const matchesSearch =
        filters.search === "" ||
        classItem.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        classItem.subject
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        classItem.teacher.name
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      const matchesSubject =
        filters.subject === "" || classItem.subject === filters.subject;
      const matchesTeacher =
        filters.teacher === "" || classItem.teacher.id === filters.teacher;
      const matchesStatus =
        filters.status === "" || classItem.status === filters.status;

      const matchesSchedule =
        filters.schedule === "" ||
        (() => {
          const time = classItem.schedule.time.toLowerCase();
          switch (filters.schedule) {
            case "morning":
              return (
                time.includes("am") ||
                time.includes("09:") ||
                time.includes("10:") ||
                time.includes("11:")
              );
            case "afternoon":
              return (
                time.includes("pm") &&
                (time.includes("12:") ||
                  time.includes("01:") ||
                  time.includes("02:") ||
                  time.includes("03:") ||
                  time.includes("04:"))
              );
            case "evening":
              return (
                time.includes("pm") &&
                (time.includes("05:") ||
                  time.includes("06:") ||
                  time.includes("07:") ||
                  time.includes("08:"))
              );
            case "weekend":
              return classItem.schedule.days.some(
                (day) =>
                  day.toLowerCase().includes("sat") ||
                  day.toLowerCase().includes("sun")
              );
            default:
              return true;
          }
        })();

      return (
        matchesSearch &&
        matchesSubject &&
        matchesTeacher &&
        matchesStatus &&
        matchesSchedule
      );
    });
  }, [classes, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredClasses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedClasses = filteredClasses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleView = (id: string) => {
    const classData = classes.find((c) => c.id === id);
    if (classData) {
      setSelectedClass(classData);
    }
  };

  const handleEdit = (id: string) => {
    // In a real app, this would open an edit modal
    toast({
      title: "Edit Class",
      description: "Edit functionality would be implemented here.",
    });
  };

  const handleArchive = async (id: string) => {
    const classData = classes.find((c) => c.id === id);
    if (classData) {
      onClassUpdate(id, { status: "archived" });
      toast({
        title: "Class Archived",
        description: `${classData.name} has been archived successfully.`,
      });
    }
  };

  const handleDelete = (id: string) => {
    const classData = classes.find((c) => c.id === id);
    if (classData) {
      setDeleteClass(classData);
    }
  };

  const confirmDelete = async () => {
    if (deleteClass) {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        onClassDelete(deleteClass.id);
        setDeleteClass(null);
        toast({
          title: "Class Deleted",
          description: `${deleteClass.name} has been deleted successfully.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete class. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Classes</h2>
          <p className="text-sm text-muted-foreground">
            {filteredClasses.length} of {classes.length} classes
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex border rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 w-8"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8 w-8"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Button onClick={onCreateClass} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Class
          </Button>
        </div>
      </div>

      {/* Filters */}
      <ClassFilters
        filters={filters}
        onFiltersChange={setFilters}
        subjects={subjects}
        teachers={teachers}
      />

      {/* Classes Grid/List */}
      {paginatedClasses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            {filteredClasses.length === 0 &&
            Object.values(filters).some((v) => v !== "") ? (
              <>
                <h3 className="text-lg font-medium mb-2">No classes found</h3>
                <p>Try adjusting your filters to see more classes.</p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium mb-2">No classes yet</h3>
                <p>Get started by creating your first class.</p>
                <Button onClick={onCreateClass} className="mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  Add Class
                </Button>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <div
            className={cn(
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            )}
          >
            {paginatedClasses.map((classData) => (
              <ClassCard
                key={classData.id}
                classData={classData}
                onView={handleView}
                onEdit={handleEdit}
                onArchive={handleArchive}
                onDelete={handleDelete}
                className={viewMode === "list" ? "max-w-none" : ""}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}

      {/* Modals */}
      <ClassDetailsModal
        isOpen={selectedClass !== null}
        onClose={() => setSelectedClass(null)}
        classData={selectedClass}
      />

      <DeleteConfirmDialog
        isOpen={deleteClass !== null}
        onClose={() => setDeleteClass(null)}
        onConfirm={confirmDelete}
        classData={deleteClass}
        loading={loading}
      />
    </div>
  );
};

export type { ClassesListProps };
