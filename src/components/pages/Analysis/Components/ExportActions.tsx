import { useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileText, FileSpreadsheet, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export type ExportFormat = "csv" | "pdf";

interface ExportActionsProps {
  onExport: (format: ExportFormat) => Promise<void>;
  className?: string;
  disabled?: boolean;
}

export const ExportActions = ({
  onExport,
  className,
  disabled = false,
}: ExportActionsProps) => {
  const [loading, setLoading] = useState<ExportFormat | null>(null);
  const { toast } = useToast();

  const handleExport = async (format: ExportFormat) => {
    setLoading(format);
    try {
      await onExport(format);
      toast({
        title: "Export Successful",
        description: `Analytics data exported as ${format.toUpperCase()} successfully.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: `Failed to export data as ${format.toUpperCase()}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={className}
          disabled={disabled || loading !== null}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Export
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleExport("csv")}
          disabled={loading !== null}
        >
          <FileSpreadsheet className="h-4 w-4" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleExport("pdf")}
          disabled={loading !== null}
        >
          <FileText className="h-4 w-4" />
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export type { ExportActionsProps };
