import { Input } from "@/components/ui/input";
import { Button } from "@/components/atoms/Button/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { SchoolFilters as SchoolFiltersType } from "../types/schools.types";

interface SchoolFiltersProps {
  filters: SchoolFiltersType;
  onFiltersChange: (filters: SchoolFiltersType) => void;
  onClearFilters: () => void;
  className?: string;
}

export const SchoolFilters = ({
  filters,
  onFiltersChange,
  onClearFilters,
  className,
}: SchoolFiltersProps) => {
  const hasActiveFilters = 
    filters.search || 
    (filters.type && filters.type !== "all") || 
    (filters.status && filters.status !== "all") || 
    filters.establishedYearFrom || 
    filters.establishedYearTo;

  return (
    <div className={`space-y-4 animate-slide-in ${className || ''}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search schools by name..."
            value={filters.search}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
            className="pl-10"
          />
        </div>

        <Select
          value={filters.type}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, type: value })
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="School Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="elementary">Elementary</SelectItem>
            <SelectItem value="middle">Middle School</SelectItem>
            <SelectItem value="high">High School</SelectItem>
            <SelectItem value="university">University</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, status: value })
          }
        >
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="icon"
            onClick={onClearFilters}
            className="shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Active filters:</span>
          <div className="flex gap-2 flex-wrap">
            {filters.search && (
              <span className="px-2 py-1 bg-muted rounded-md">
                Search: {filters.search}
              </span>
            )}
            {filters.type && filters.type !== "all" && (
              <span className="px-2 py-1 bg-muted rounded-md capitalize">
                Type: {filters.type}
              </span>
            )}
            {filters.status && filters.status !== "all" && (
              <span className="px-2 py-1 bg-muted rounded-md capitalize">
                Status: {filters.status}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};