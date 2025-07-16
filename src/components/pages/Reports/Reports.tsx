import { useState, useEffect } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { ReportCard, ReportData } from "./Components/ReportCard";
import {
  ReportFilters,
  ReportFilters as FilterState,
} from "./Components/ReportFilters";
import { ExportControls, ExportOptions } from "./Components/ExportControls";
import { ReportGenerator, NewReportConfig } from "./Components/ReportGenerator";
import { ReportsTable } from "./Components/ReportsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Grid, List, BarChart3 } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useToast } from "@/hooks/use-toast";

// Mock data for reports
const mockReports: ReportData[] = [
  {
    id: "1",
    title: "Monthly Attendance Summary",
    type: "attendance",
    dateRange: {
      start: new Date(2024, 0, 1),
      end: new Date(2024, 0, 31),
    },
    summary: {
      totalRecords: 1250,
      attendanceRate: 92.5,
      keyMetric: "Attendance Rate",
      keyMetricValue: "92.5%",
    },
    status: "completed",
    generatedDate: new Date(2024, 1, 1, 9, 30),
    generatedBy: "Dr. Smith",
  },
  {
    id: "2",
    title: "Q1 Performance Analysis",
    type: "performance",
    dateRange: {
      start: new Date(2024, 0, 1),
      end: new Date(2024, 2, 31),
    },
    summary: {
      totalRecords: 890,
      averageScore: 78.4,
      keyMetric: "Average Score",
      keyMetricValue: "78.4%",
    },
    status: "completed",
    generatedDate: new Date(2024, 3, 2, 14, 15),
    generatedBy: "Prof. Johnson",
  },
  {
    id: "3",
    title: "Class Activity Report - February",
    type: "activity",
    dateRange: {
      start: new Date(2024, 1, 1),
      end: new Date(2024, 1, 29),
    },
    summary: {
      totalRecords: 456,
      keyMetric: "Participation Rate",
      keyMetricValue: "85.2%",
    },
    status: "generating",
    generatedDate: new Date(2024, 2, 1, 8, 0),
    generatedBy: "Ms. Davis",
  },
  {
    id: "4",
    title: "Custom Academic Progress Report",
    type: "custom",
    dateRange: {
      start: new Date(2024, 0, 15),
      end: new Date(2024, 2, 15),
    },
    summary: {
      totalRecords: 234,
      keyMetric: "Progress Score",
      keyMetricValue: "7.8/10",
    },
    status: "scheduled",
    generatedDate: new Date(2024, 2, 15, 10, 0),
    generatedBy: "Admin User",
  },
  {
    id: "5",
    title: "Weekly Attendance Tracking",
    type: "attendance",
    dateRange: {
      start: new Date(2024, 2, 18),
      end: new Date(2024, 2, 24),
    },
    summary: {
      totalRecords: 567,
      attendanceRate: 94.1,
      keyMetric: "Attendance Rate",
      keyMetricValue: "94.1%",
    },
    status: "completed",
    generatedDate: new Date(2024, 2, 25, 16, 45),
    generatedBy: "Dr. Wilson",
  },
  {
    id: "6",
    title: "Teacher Performance Review",
    type: "performance",
    dateRange: {
      start: new Date(2024, 1, 1),
      end: new Date(2024, 1, 28),
    },
    summary: {
      totalRecords: 45,
      averageScore: 88.7,
      keyMetric: "Performance Score",
      keyMetricValue: "88.7%",
    },
    status: "failed",
    generatedDate: new Date(2024, 2, 1, 11, 30),
    generatedBy: "Admin User",
  },
];

export const Reports = () => {
  const [reports, setReports] = useState<ReportData[]>(mockReports);
  const [filteredReports, setFilteredReports] =
    useState<ReportData[]>(mockReports);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    type: "all",
    status: "all",
    dateRange: undefined,
    searchTerm: "",
  });
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [showGenerator, setShowGenerator] = useState(false);
  const { toast } = useToast();

  // Filter reports based on current filters
  useEffect(() => {
    let filtered = reports;

    // Filter by type
    if (filters.type !== "all") {
      filtered = filtered.filter((report) => report.type === filters.type);
    }

    // Filter by status
    if (filters.status !== "all") {
      filtered = filtered.filter((report) => report.status === filters.status);
    }

    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (report) =>
          report.title.toLowerCase().includes(searchLower) ||
          report.generatedBy.toLowerCase().includes(searchLower) ||
          report.type.toLowerCase().includes(searchLower)
      );
    }

    // Filter by date range
    if (filters.dateRange?.from && filters.dateRange?.to) {
      filtered = filtered.filter((report) => {
        const reportStart = report.dateRange.start.getTime();
        const reportEnd = report.dateRange.end.getTime();
        const filterStart = filters.dateRange!.from!.getTime();
        const filterEnd = filters.dateRange!.to!.getTime();

        return (
          (reportStart >= filterStart && reportEnd <= filterEnd) ||
          (reportStart <= filterEnd && reportEnd >= filterStart)
        );
      });
    }

    setFilteredReports(filtered);
  }, [reports, filters]);

  const handleClearFilters = () => {
    setFilters({
      type: "all",
      status: "all",
      dateRange: undefined,
      searchTerm: "",
    });
  };

  const handleGenerateReport = async (config: NewReportConfig) => {
    // Simulate report generation
    const newReport: ReportData = {
      id: `${reports.length + 1}`,
      title: config.title,
      type: config.type,
      dateRange: {
        start: config.dateRange.from!,
        end: config.dateRange.to!,
      },
      summary: {
        totalRecords: Math.floor(Math.random() * 1000) + 100,
        keyMetric: "Generated Metric",
        keyMetricValue: `${Math.floor(Math.random() * 100)}%`,
      },
      status: "generating",
      generatedDate: new Date(),
      generatedBy: "Current User",
    };

    setReports((prev) => [newReport, ...prev]);

    // Simulate generation completion after 3 seconds
    setTimeout(() => {
      setReports((prev) =>
        prev.map((r) =>
          r.id === newReport.id ? { ...r, status: "completed" as const } : r
        )
      );
      toast({
        title: "Report ready",
        description: `${config.title} has been generated successfully.`,
      });
    }, 3000);
  };

  const handleViewReport = (reportId: string) => {
    const report = reports.find((r) => r.id === reportId);
    if (report) {
      toast({
        title: "Opening report",
        description: `Opening ${report.title}...`,
      });
      // In a real app, this would navigate to a detailed report view
    }
  };

  const handleDownloadReport = async (
    reportId: string,
    format: "csv" | "pdf"
  ) => {
    const report = reports.find((r) => r.id === reportId);
    if (report) {
      // Simulate download
      toast({
        title: "Download started",
        description: `Downloading ${
          report.title
        } as ${format.toUpperCase()}...`,
      });
    }
  };

  const handleDeleteReport = async (reportId: string) => {
    setReports((prev) => prev.filter((r) => r.id !== reportId));
    setSelectedReports((prev) => prev.filter((id) => id !== reportId));
  };

  const handleDuplicateReport = (reportId: string) => {
    const report = reports.find((r) => r.id === reportId);
    if (report) {
      const duplicatedReport: ReportData = {
        ...report,
        id: `${reports.length + 1}`,
        title: `${report.title} (Copy)`,
        generatedDate: new Date(),
        status: "generating",
      };
      setReports((prev) => [duplicatedReport, ...prev]);

      // Simulate generation completion
      setTimeout(() => {
        setReports((prev) =>
          prev.map((r) =>
            r.id === duplicatedReport.id
              ? { ...r, status: "completed" as const }
              : r
          )
        );
      }, 2000);
    }
  };

  const handleExport = async (reportIds: string[], options: ExportOptions) => {
    // Simulate export
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const handleScheduleExport = async (
    reportIds: string[],
    options: ExportOptions & { schedule: Date }
  ) => {
    // Simulate scheduling
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const completedReports = filteredReports.filter(
    (r) => r.status === "completed"
  );
  const recentReports = filteredReports
    .sort((a, b) => b.generatedDate.getTime() - a.generatedDate.getTime())
    .slice(0, 6);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground">
            Generate, manage, and export your school reports
          </p>
        </div>
        <Button onClick={() => setShowGenerator(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-muted-foreground">Total Reports</p>
              <p className="text-2xl font-bold">{reports.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold">{completedReports.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-orange-600" />
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold">
                {reports.filter((r) => r.status === "generating").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold">
                {
                  reports.filter(
                    (r) =>
                      r.generatedDate.getMonth() === new Date().getMonth() &&
                      r.generatedDate.getFullYear() === new Date().getFullYear()
                  ).length
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <ReportFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Reports Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Export Controls and View Toggle */}
          <div className="flex items-center justify-between">
            <ExportControls
              selectedReports={selectedReports}
              onExport={handleExport}
              onScheduleExport={handleScheduleExport}
            />
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">
                All Reports ({filteredReports.length})
              </TabsTrigger>
              <TabsTrigger value="recent">
                Recent ({recentReports.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({completedReports.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredReports.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                      <p className="text-muted-foreground">
                        No reports match your current filters.
                      </p>
                      <Button
                        variant="outline"
                        onClick={handleClearFilters}
                        className="mt-2"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  ) : (
                    filteredReports.map((report) => (
                      <ReportCard
                        key={report.id}
                        report={report}
                        onView={handleViewReport}
                        onDownload={handleDownloadReport}
                      />
                    ))
                  )}
                </div>
              ) : (
                <ReportsTable
                  reports={filteredReports}
                  selectedReports={selectedReports}
                  onSelectionChange={setSelectedReports}
                  onView={handleViewReport}
                  onDownload={handleDownloadReport}
                  onDelete={handleDeleteReport}
                  onDuplicate={handleDuplicateReport}
                />
              )}
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentReports.map((report) => (
                    <ReportCard
                      key={report.id}
                      report={report}
                      onView={handleViewReport}
                      onDownload={handleDownloadReport}
                    />
                  ))}
                </div>
              ) : (
                <ReportsTable
                  reports={recentReports}
                  selectedReports={selectedReports}
                  onSelectionChange={setSelectedReports}
                  onView={handleViewReport}
                  onDownload={handleDownloadReport}
                  onDelete={handleDeleteReport}
                  onDuplicate={handleDuplicateReport}
                />
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {completedReports.map((report) => (
                    <ReportCard
                      key={report.id}
                      report={report}
                      onView={handleViewReport}
                      onDownload={handleDownloadReport}
                    />
                  ))}
                </div>
              ) : (
                <ReportsTable
                  reports={completedReports}
                  selectedReports={selectedReports}
                  onSelectionChange={setSelectedReports}
                  onView={handleViewReport}
                  onDownload={handleDownloadReport}
                  onDelete={handleDeleteReport}
                  onDuplicate={handleDuplicateReport}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Report Generator Modal */}
      <ReportGenerator
        isOpen={showGenerator}
        onClose={() => setShowGenerator(false)}
        onGenerate={handleGenerateReport}
      />
    </div>
  );
};
