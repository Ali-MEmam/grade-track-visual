import { useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Filter, X, Search } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

export interface ReportFilters {
  type: "all" | "attendance" | "performance" | "activity" | "custom";
  status: "all" | "completed" | "generating" | "scheduled" | "failed";
  dateRange: DateRange | undefined;
  searchTerm: string;
}

interface ReportFiltersProps {
  filters: ReportFilters;
  onFiltersChange: (filters: ReportFilters) => void;
  onClearFilters: () => void;
  className?: string;
}

export const ReportFilters = ({
  filters,
  onFiltersChange,
  onClearFilters,
  className,
}: ReportFiltersProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const updateFilter = (key: keyof ReportFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const hasActiveFilters =
    filters.type !== "all" ||
    filters.status !== "all" ||
    filters.dateRange ||
    filters.searchTerm.length > 0;

  const formatDateRange = (dateRange: DateRange | undefined) => {
    if (!dateRange) return "Select date range";
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "MMM dd")} - ${format(
        dateRange.to,
        "MMM dd, yyyy"
      )}`;
    }
    if (dateRange.from) {
      return `From ${format(dateRange.from, "MMM dd, yyyy")}`;
    }
    return "Select date range";
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search Reports</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by title, type, or creator..."
              value={filters.searchTerm}
              onChange={(e) => updateFilter("searchTerm", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Report Type */}
        <div className="space-y-2">
          <Label>Report Type</Label>
          <Select
            value={filters.type}
            onValueChange={(value) => updateFilter("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="attendance">Attendance Reports</SelectItem>
              <SelectItem value="performance">Performance Reports</SelectItem>
              <SelectItem value="activity">Activity Reports</SelectItem>
              <SelectItem value="custom">Custom Reports</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={filters.status}
            onValueChange={(value) => updateFilter("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="generating">Generating</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <Label>Date Range</Label>
          <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDateRange(filters.dateRange)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={filters.dateRange?.from}
                selected={filters.dateRange}
                onSelect={(dateRange) => {
                  updateFilter("dateRange", dateRange);
                  if (dateRange?.from && dateRange?.to) {
                    setIsDatePickerOpen(false);
                  }
                }}
                numberOfMonths={2}
              />
              <div className="p-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    updateFilter("dateRange", undefined);
                    setIsDatePickerOpen(false);
                  }}
                  className="w-full"
                >
                  Clear Date Range
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Quick Filters */}
        <div className="space-y-2">
          <Label>Quick Filters</Label>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const today = new Date();
                const lastWeek = new Date();
                lastWeek.setDate(today.getDate() - 7);
                updateFilter("dateRange", { from: lastWeek, to: today });
              }}
              className="text-xs"
            >
              Last 7 Days
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const today = new Date();
                const lastMonth = new Date();
                lastMonth.setMonth(today.getMonth() - 1);
                updateFilter("dateRange", { from: lastMonth, to: today });
              }}
              className="text-xs"
            >
              Last 30 Days
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const today = new Date();
                const thisMonth = new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  1
                );
                updateFilter("dateRange", { from: thisMonth, to: today });
              }}
              className="text-xs"
            >
              This Month
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
