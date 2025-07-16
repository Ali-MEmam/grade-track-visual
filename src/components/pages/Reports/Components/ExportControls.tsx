import { useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Download,
  FileText,
  Table,
  Mail,
  Calendar,
  Settings,
  Loader2,
  Check,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface ExportOptions {
  format: "csv" | "pdf" | "excel";
  includeCharts: boolean;
  includeFilters: boolean;
  customTitle?: string;
  notes?: string;
}

interface ExportControlsProps {
  selectedReports?: string[];
  onExport: (reportIds: string[], options: ExportOptions) => Promise<void>;
  onScheduleExport?: (
    reportIds: string[],
    options: ExportOptions & { schedule: Date }
  ) => Promise<void>;
  className?: string;
}

export const ExportControls = ({
  selectedReports = [],
  onExport,
  onScheduleExport,
  className,
}: ExportControlsProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [showCustomExport, setShowCustomExport] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: "csv",
    includeCharts: false,
    includeFilters: true,
  });
  const [scheduleDate, setScheduleDate] = useState("");
  const { toast } = useToast();

  const handleQuickExport = async (format: "csv" | "pdf" | "excel") => {
    if (selectedReports.length === 0) {
      toast({
        title: "No reports selected",
        description: "Please select reports to export.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    try {
      await onExport(selectedReports, { ...exportOptions, format });
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 2000);
      toast({
        title: "Export successful",
        description: `Reports exported as ${format.toUpperCase()}.`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting the reports.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleCustomExport = async () => {
    if (selectedReports.length === 0) {
      toast({
        title: "No reports selected",
        description: "Please select reports to export.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    try {
      await onExport(selectedReports, exportOptions);
      setShowCustomExport(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 2000);
      toast({
        title: "Export successful",
        description: `Reports exported as ${exportOptions.format.toUpperCase()}.`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting the reports.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleScheduleExport = async () => {
    if (!onScheduleExport || selectedReports.length === 0 || !scheduleDate) {
      return;
    }

    setIsExporting(true);
    try {
      await onScheduleExport(selectedReports, {
        ...exportOptions,
        schedule: new Date(scheduleDate),
      });
      setShowScheduleDialog(false);
      setScheduleDate("");
      toast({
        title: "Export scheduled",
        description: "The export has been scheduled successfully.",
      });
    } catch (error) {
      toast({
        title: "Scheduling failed",
        description: "There was an error scheduling the export.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <div className={`flex items-center gap-2 ${className}`}>
        {/* Quick Export Buttons */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickExport("csv")}
          disabled={isExporting || selectedReports.length === 0}
          className="flex items-center gap-2"
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : exportSuccess ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Table className="w-4 h-4" />
          )}
          CSV
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickExport("pdf")}
          disabled={isExporting || selectedReports.length === 0}
          className="flex items-center gap-2"
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : exportSuccess ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <FileText className="w-4 h-4" />
          )}
          PDF
        </Button>

        {/* Advanced Export Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={selectedReports.length === 0}
            >
              <Download className="w-4 h-4 mr-1" />
              More Options
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Export Options</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleQuickExport("excel")}>
              <Table className="w-4 h-4 mr-2" />
              Export as Excel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowCustomExport(true)}>
              <Settings className="w-4 h-4 mr-2" />
              Custom Export
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {onScheduleExport && (
              <DropdownMenuItem onClick={() => setShowScheduleDialog(true)}>
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Export
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Selection Info */}
        {selectedReports.length > 0 && (
          <span className="text-sm text-muted-foreground">
            {selectedReports.length} report
            {selectedReports.length === 1 ? "" : "s"} selected
          </span>
        )}
      </div>

      {/* Custom Export Dialog */}
      <Dialog open={showCustomExport} onOpenChange={setShowCustomExport}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Custom Export Options</DialogTitle>
            <DialogDescription>
              Customize your export settings for the selected reports.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="export-format">Export Format</Label>
              <select
                id="export-format"
                value={exportOptions.format}
                onChange={(e) =>
                  setExportOptions({
                    ...exportOptions,
                    format: e.target.value as "csv" | "pdf" | "excel",
                  })
                }
                className="w-full p-2 border border-input bg-background rounded-md"
              >
                <option value="csv">CSV</option>
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-title">Custom Title (Optional)</Label>
              <Input
                id="custom-title"
                placeholder="Enter custom title for export"
                value={exportOptions.customTitle || ""}
                onChange={(e) =>
                  setExportOptions({
                    ...exportOptions,
                    customTitle: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes to include in the export"
                value={exportOptions.notes || ""}
                onChange={(e) =>
                  setExportOptions({
                    ...exportOptions,
                    notes: e.target.value,
                  })
                }
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="include-charts"
                checked={exportOptions.includeCharts}
                onChange={(e) =>
                  setExportOptions({
                    ...exportOptions,
                    includeCharts: e.target.checked,
                  })
                }
                className="rounded border-input"
              />
              <Label htmlFor="include-charts" className="text-sm">
                Include charts and visualizations
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="include-filters"
                checked={exportOptions.includeFilters}
                onChange={(e) =>
                  setExportOptions({
                    ...exportOptions,
                    includeFilters: e.target.checked,
                  })
                }
                className="rounded border-input"
              />
              <Label htmlFor="include-filters" className="text-sm">
                Include filter information
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCustomExport(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCustomExport} disabled={isExporting}>
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Export Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Export</DialogTitle>
            <DialogDescription>
              Schedule the selected reports to be exported automatically.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="schedule-date">Schedule Date & Time</Label>
              <Input
                id="schedule-date"
                type="datetime-local"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowScheduleDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleScheduleExport}
              disabled={isExporting || !scheduleDate}
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Scheduling...
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Export
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
