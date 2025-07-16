import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import { Button } from "@/components/atoms/Button/Button";
import { Badge } from "@/components/atoms/Badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Eye,
  Download,
  MoreVertical,
  Calendar,
  User,
  ArrowUpDown,
  Trash2,
  Copy,
  Share2,
  AlertTriangle,
} from "lucide-react";
import { format } from "date-fns";
import { ReportData } from "./ReportCard";
import { useToast } from "@/hooks/use-toast";

interface ReportsTableProps {
  reports: ReportData[];
  selectedReports: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  onView: (reportId: string) => void;
  onDownload: (reportId: string, format: "csv" | "pdf") => void;
  onDelete: (reportId: string) => void;
  onDuplicate?: (reportId: string) => void;
  className?: string;
}

type SortField = "title" | "type" | "status" | "generatedDate" | "totalRecords";
type SortDirection = "asc" | "desc";

export const ReportsTable = ({
  reports,
  selectedReports,
  onSelectionChange,
  onView,
  onDownload,
  onDelete,
  onDuplicate,
  className,
}: ReportsTableProps) => {
  const [sortField, setSortField] = useState<SortField>("generatedDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [deleteReport, setDeleteReport] = useState<ReportData | null>(null);
  const { toast } = useToast();

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedReports = [...reports].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortField) {
      case "title":
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case "type":
        aValue = a.type;
        bValue = b.type;
        break;
      case "status":
        aValue = a.status;
        bValue = b.status;
        break;
      case "generatedDate":
        aValue = a.generatedDate.getTime();
        bValue = b.generatedDate.getTime();
        break;
      case "totalRecords":
        aValue = a.summary.totalRecords;
        bValue = b.summary.totalRecords;
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSelectAll = () => {
    if (selectedReports.length === reports.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(reports.map((r) => r.id));
    }
  };

  const handleSelectReport = (reportId: string) => {
    if (selectedReports.includes(reportId)) {
      onSelectionChange(selectedReports.filter((id) => id !== reportId));
    } else {
      onSelectionChange([...selectedReports, reportId]);
    }
  };

  const getStatusColor = (status: ReportData["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "generating":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "scheduled":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
    }
  };

  const getTypeLabel = (type: ReportData["type"]) => {
    switch (type) {
      case "attendance":
        return "Attendance";
      case "performance":
        return "Performance";
      case "activity":
        return "Activity";
      case "custom":
        return "Custom";
    }
  };

  const handleDelete = async (report: ReportData) => {
    try {
      await onDelete(report.id);
      setDeleteReport(null);
      toast({
        title: "Report deleted",
        description: `${report.title} has been deleted successfully.`,
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "There was an error deleting the report.",
        variant: "destructive",
      });
    }
  };

  const handleDuplicate = (reportId: string) => {
    if (onDuplicate) {
      onDuplicate(reportId);
      toast({
        title: "Report duplicated",
        description: "A copy of the report has been created.",
      });
    }
  };

  const handleShare = (report: ReportData) => {
    // In a real app, this would generate a shareable link
    navigator.clipboard.writeText(
      `${window.location.origin}/reports/${report.id}`
    );
    toast({
      title: "Link copied",
      description: "Report link has been copied to clipboard.",
    });
  };

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Reports</CardTitle>
            <div className="text-sm text-muted-foreground">
              {reports.length} total reports
              {selectedReports.length > 0 && (
                <span className="ml-2">
                  • {selectedReports.length} selected
                </span>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedReports.length === reports.length &&
                        reports.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all reports"
                    />
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("title")}
                      className="h-auto p-0 font-semibold"
                    >
                      Report Title
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("type")}
                      className="h-auto p-0 font-semibold"
                    >
                      Type
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Date Range</TableHead>
                  <TableHead className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("totalRecords")}
                      className="h-auto p-0 font-semibold"
                    >
                      Records
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("status")}
                      className="h-auto p-0 font-semibold"
                    >
                      Status
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("generatedDate")}
                      className="h-auto p-0 font-semibold"
                    >
                      Generated
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedReports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="text-muted-foreground">
                        No reports found. Create your first report to get
                        started.
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedReports.map((report) => (
                    <TableRow
                      key={report.id}
                      className={`cursor-pointer hover:bg-muted/50 ${
                        selectedReports.includes(report.id) ? "bg-blue-50" : ""
                      }`}
                      onClick={() => handleSelectReport(report.id)}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedReports.includes(report.id)}
                          onCheckedChange={() => handleSelectReport(report.id)}
                          aria-label={`Select ${report.title}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{report.title}</div>
                          <div className="text-sm text-muted-foreground">
                            by {report.generatedBy}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getTypeLabel(report.type)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span>
                              {format(report.dateRange.start, "MMM dd")} -{" "}
                              {format(report.dateRange.end, "MMM dd, yyyy")}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-medium">
                          {report.summary.totalRecords}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusColor(report.status)}
                        >
                          {report.status.charAt(0).toUpperCase() +
                            report.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {format(report.generatedDate, "MMM dd, yyyy")}
                          <div className="text-xs">
                            {format(report.generatedDate, "HH:mm")}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => onView(report.id)}
                              disabled={report.status !== "completed"}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Report
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onDownload(report.id, "csv")}
                              disabled={report.status !== "completed"}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download CSV
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onDownload(report.id, "pdf")}
                              disabled={report.status !== "completed"}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleShare(report)}
                            >
                              <Share2 className="mr-2 h-4 w-4" />
                              Share Report
                            </DropdownMenuItem>
                            {onDuplicate && (
                              <DropdownMenuItem
                                onClick={() => handleDuplicate(report.id)}
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => setDeleteReport(report)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteReport} onOpenChange={() => setDeleteReport(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Delete Report
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deleteReport?.title}"? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteReport(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteReport && handleDelete(deleteReport)}
            >
              Delete Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
