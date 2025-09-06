import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import { Button } from "@/components/atoms/Button/Button";
import { Badge } from "@/components/atoms/Badge/Badge";
import {
  Download,
  Eye,
  Calendar,
  Users,
  TrendingUp,
  FileText,
} from "lucide-react";
import { format } from "date-fns";

export interface ReportData {
  id: string;
  title: string;
  type: "attendance" | "performance" | "activity" | "custom";
  dateRange: {
    start: Date;
    end: Date;
  };
  summary: {
    totalRecords: number;
    averageScore?: number;
    attendanceRate?: number;
    keyMetric: string;
    keyMetricValue: string;
  };
  status: "completed" | "generating" | "scheduled" | "failed";
  generatedDate: Date;
  generatedBy: string;
}

interface ReportCardProps {
  report: ReportData;
  onView: (reportId: string) => void;
  onDownload: (reportId: string, format: "csv" | "pdf") => void;
  onSchedule?: (reportId: string) => void;
  className?: string;
}

export const ReportCard = ({
  report,
  onView,
  onDownload,
  onSchedule,
  className,
}: ReportCardProps) => {
  const getTypeIcon = (type: ReportData["type"]) => {
    switch (type) {
      case "attendance":
        return <Users className="w-4 h-4" />;
      case "performance":
        return <TrendingUp className="w-4 h-4" />;
      case "activity":
        return <Calendar className="w-4 h-4" />;
      case "custom":
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: ReportData["status"]) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success border-success/20";
      case "generating":
        return "bg-primary/10 text-primary border-primary/20";
      case "scheduled":
        return "bg-warning/10 text-warning border-warning/20";
      case "failed":
        return "bg-destructive/10 text-destructive border-destructive/20";
    }
  };

  const getTypeLabel = (type: ReportData["type"]) => {
    switch (type) {
      case "attendance":
        return "Attendance Report";
      case "performance":
        return "Performance Report";
      case "activity":
        return "Activity Report";
      case "custom":
        return "Custom Report";
    }
  };

  return (
    <Card className={`bg-card dark:bg-gradient-card border shadow-card hover:shadow-hover transition-all duration-200 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-primary">
                {getTypeIcon(report.type)}
              </div>
            </div>
            <div>
              <CardTitle className="text-base font-semibold mb-1">
                {report.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {getTypeLabel(report.type)}
              </p>
            </div>
          </div>
          <Badge variant="outline" className={getStatusColor(report.status)}>
            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Date Range */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>
            {format(report.dateRange.start, "MMM dd")} -{" "}
            {format(report.dateRange.end, "MMM dd, yyyy")}
          </span>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-muted/50 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground mb-1">Total Records</p>
            <p className="text-lg font-semibold text-foreground">
              {report.summary.totalRecords}
            </p>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground mb-1">
              {report.summary.keyMetric}
            </p>
            <p className="text-lg font-semibold text-foreground">
              {report.summary.keyMetricValue}
            </p>
          </div>
        </div>

        {/* Generated Info */}
        <div className="text-xs text-muted-foreground">
          Generated on {format(report.generatedDate, "MMM dd, yyyy 'at' HH:mm")}{" "}
          by {report.generatedBy}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(report.id)}
            disabled={report.status !== "completed"}
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDownload(report.id, "csv")}
            disabled={report.status !== "completed"}
          >
            <Download className="w-4 h-4" />
          </Button>
          {onSchedule && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSchedule(report.id)}
            >
              Schedule
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
