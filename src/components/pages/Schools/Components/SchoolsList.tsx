import { useState, useMemo } from "react";
import { School, SchoolFilters as SchoolFiltersType } from "../types/schools.types";
import { SchoolCard } from "./SchoolCard";
import { SchoolFilters } from "./SchoolFilters";
import { Pagination } from "@/components/molecules/Pagination/Pagination";
import { Button } from "@/components/atoms/Button/Button";
import { Plus, Grid, List, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SchoolsListProps {
  schools: School[];
  isLoading?: boolean;
  onCreateSchool: () => void;
  onEditSchool: (school: School) => void;
  onDeleteSchool: (id: string) => void;
  className?: string;
}

const ITEMS_PER_PAGE = 12;

export const SchoolsList = ({
  schools,
  isLoading = false,
  onCreateSchool,
  onEditSchool,
  onDeleteSchool,
  className,
}: SchoolsListProps) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SchoolFiltersType>({
    search: "",
    type: "all",
    status: "all",
  });

  const [schoolToDelete, setSchoolToDelete] = useState<School | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      const matchesSearch =
        filters.search === "" ||
        school.nameEn.toLowerCase().includes(filters.search.toLowerCase()) ||
        school.nameAr?.toLowerCase().includes(filters.search.toLowerCase()) ||
        school.address.city.toLowerCase().includes(filters.search.toLowerCase()) ||
        school.email.toLowerCase().includes(filters.search.toLowerCase());

      // Since backend doesn't have type and status fields, skip these filters for now
      const matchesType = filters.type === "all";
      const matchesStatus = filters.status === "all";

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [schools, filters]);

  const totalPages = Math.ceil(filteredSchools.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentSchools = filteredSchools.slice(startIndex, endIndex);

  const handleClearFilters = () => {
    setFilters({
      search: "",
      type: "all",
      status: "all",
    });
    setCurrentPage(1);
  };

  const handleDeleteConfirm = () => {
    if (schoolToDelete) {
      onDeleteSchool(schoolToDelete.id);
      setSchoolToDelete(null);
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <SchoolFilters
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={handleClearFilters}
          className="w-full lg:flex-1"
        />

        <div className="flex gap-2 w-full lg:w-auto">
          <div className="flex gap-1 p-1 bg-muted rounded-lg">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="h-8 w-8"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="h-8 w-8"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Button onClick={onCreateSchool} className="flex-1 lg:flex-initial">
            <Plus className="h-4 w-4 mr-2" />
            Add School
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredSchools.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-4">
            {filters.search || (filters.type !== "all") || (filters.status !== "all")
              ? "No schools found matching your filters."
              : "No schools available."}
          </p>
          {(filters.search || (filters.type !== "all") || (filters.status !== "all")) && (
            <Button variant="outline" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      ) : (
        <>
          <div
            className={cn(
              "grid gap-4 animate-fade-in",
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            )}
          >
            {currentSchools.map((school, index) => (
              <div
                key={school.id}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
                className="animate-scale-in"
              >
                <SchoolCard
                  school={school}
                  onView={() => navigate(`/schools/${school.id}`)}
                  onEdit={onEditSchool}
                  onDelete={setSchoolToDelete}
                />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      <AlertDialog open={!!schoolToDelete} onOpenChange={() => setSchoolToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete School</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{schoolToDelete?.nameEn}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};