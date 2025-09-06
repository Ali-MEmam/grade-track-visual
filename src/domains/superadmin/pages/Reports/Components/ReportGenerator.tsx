import { useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  CalendarIcon,
  Users,
  TrendingUp,
  Calendar as CalendarActivityIcon,
  FileText,
  Loader2,
  Info,
} from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useToast } from "@/hooks/use-toast";

export interface NewReportConfig {
  title: string;
  type: "attendance" | "performance" | "activity" | "custom";
  description?: string;
  dateRange: DateRange;
  parameters: {
    includeStudents: string[]; // student IDs or "all"
    includeClasses: string[]; // class IDs or "all"
    includeTeachers: string[]; // teacher IDs or "all"
    metrics: string[];
    groupBy: "none" | "class" | "grade" | "subject";
    includeCharts: boolean;
    includeComments: boolean;
  };
  schedule?: {
    frequency: "once" | "daily" | "weekly" | "monthly";
    time: string;
    endDate?: Date;
  };
}

interface ReportGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (config: NewReportConfig) => Promise<void>;
  className?: string;
}

// Mock data for dropdowns
const mockStudents = [
  { id: "all", name: "All Students" },
  { id: "1", name: "Alice Johnson" },
  { id: "2", name: "Bob Smith" },
  { id: "3", name: "Carol Brown" },
];

const mockClasses = [
  { id: "all", name: "All Classes" },
  { id: "1", name: "Mathematics 101" },
  { id: "2", name: "English Literature" },
  { id: "3", name: "Physics Advanced" },
];

const mockTeachers = [
  { id: "all", name: "All Teachers" },
  { id: "1", name: "Dr. Smith" },
  { id: "2", name: "Prof. Johnson" },
  { id: "3", name: "Ms. Davis" },
];

export const ReportGenerator = ({
  isOpen,
  onClose,
  onGenerate,
  className,
}: ReportGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "basic" | "parameters" | "schedule"
  >("basic");
  const [config, setConfig] = useState<NewReportConfig>({
    title: "",
    type: "attendance",
    description: "",
    dateRange: { from: undefined, to: undefined },
    parameters: {
      includeStudents: ["all"],
      includeClasses: ["all"],
      includeTeachers: ["all"],
      metrics: [],
      groupBy: "none",
      includeCharts: true,
      includeComments: false,
    },
  });
  const { toast } = useToast();

  const getReportTypeInfo = (type: NewReportConfig["type"]) => {
    switch (type) {
      case "attendance":
        return {
          icon: <Users className="w-5 h-5" />,
          title: "Attendance Report",
          description: "Track student attendance patterns and statistics",
          defaultMetrics: [
            "attendance_rate",
            "absent_days",
            "late_arrivals",
            "early_departures",
          ],
        };
      case "performance":
        return {
          icon: <TrendingUp className="w-5 h-5" />,
          title: "Performance Report",
          description: "Analyze student academic performance and grades",
          defaultMetrics: [
            "average_grade",
            "grade_distribution",
            "improvement_trend",
            "failing_students",
          ],
        };
      case "activity":
        return {
          icon: <CalendarActivityIcon className="w-5 h-5" />,
          title: "Activity Report",
          description: "Monitor class activities and participation",
          defaultMetrics: [
            "participation_rate",
            "assignment_completion",
            "activity_engagement",
            "class_interactions",
          ],
        };
      case "custom":
        return {
          icon: <FileText className="w-5 h-5" />,
          title: "Custom Report",
          description: "Create a custom report with your selected parameters",
          defaultMetrics: [],
        };
    }
  };

  const handleTypeChange = (type: NewReportConfig["type"]) => {
    const typeInfo = getReportTypeInfo(type);
    setConfig({
      ...config,
      type,
      parameters: {
        ...config.parameters,
        metrics: typeInfo.defaultMetrics,
      },
    });
  };

  const handleGenerate = async () => {
    if (!config.title || !config.dateRange.from || !config.dateRange.to) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      await onGenerate(config);
      onClose();
      // Reset form
      setConfig({
        title: "",
        type: "attendance",
        description: "",
        dateRange: { from: undefined, to: undefined },
        parameters: {
          includeStudents: ["all"],
          includeClasses: ["all"],
          includeTeachers: ["all"],
          metrics: [],
          groupBy: "none",
          includeCharts: true,
          includeComments: false,
        },
      });
      setCurrentStep("basic");
      toast({
        title: "Report Generated",
        description:
          "Your report is being generated and will be available shortly.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating the report.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const typeInfo = getReportTypeInfo(config.type);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Generate New Report
          </DialogTitle>
          <DialogDescription>
            Create a new report with custom parameters and settings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-center space-x-4">
            {["basic", "parameters", "schedule"].map((step, index) => (
              <div
                key={step}
                className={`flex items-center ${index > 0 ? "ml-4" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === step
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`ml-2 text-sm ${
                    currentStep === step ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {step.charAt(0).toUpperCase() + step.slice(1)}
                </span>
                {index < 2 && <div className="w-12 h-0.5 bg-gray-200 ml-4" />}
              </div>
            ))}
          </div>

          {/* Basic Information */}
          {currentStep === "basic" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="report-title">Report Title *</Label>
                <Input
                  id="report-title"
                  placeholder="Enter report title"
                  value={config.title}
                  onChange={(e) =>
                    setConfig({ ...config, title: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Report Type *</Label>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    ["attendance", "performance", "activity", "custom"] as const
                  ).map((type) => {
                    const info = getReportTypeInfo(type);
                    return (
                      <Card
                        key={type}
                        className={`cursor-pointer transition-colors ${
                          config.type === type
                            ? "ring-2 ring-blue-600 bg-blue-50"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => handleTypeChange(type)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="text-blue-600">{info.icon}</div>
                            <div>
                              <h3 className="font-medium text-sm">
                                {info.title}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1">
                                {info.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-description">Description</Label>
                <Textarea
                  id="report-description"
                  placeholder="Optional description for the report"
                  value={config.description || ""}
                  onChange={(e) =>
                    setConfig({ ...config, description: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Date Range *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {config.dateRange.from && config.dateRange.to
                        ? `${format(
                            config.dateRange.from,
                            "MMM dd"
                          )} - ${format(config.dateRange.to, "MMM dd, yyyy")}`
                        : "Select date range"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={config.dateRange.from}
                      selected={config.dateRange}
                      onSelect={(range) =>
                        setConfig({
                          ...config,
                          dateRange: range || {
                            from: undefined,
                            to: undefined,
                          },
                        })
                      }
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}

          {/* Parameters */}
          {currentStep === "parameters" && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  {typeInfo.icon}
                  <div>
                    <h3 className="font-medium">{typeInfo.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {typeInfo.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Include Students</Label>
                  <Select
                    value={config.parameters.includeStudents[0]}
                    onValueChange={(value) =>
                      setConfig({
                        ...config,
                        parameters: {
                          ...config.parameters,
                          includeStudents: [value],
                        },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockStudents.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Include Classes</Label>
                  <Select
                    value={config.parameters.includeClasses[0]}
                    onValueChange={(value) =>
                      setConfig({
                        ...config,
                        parameters: {
                          ...config.parameters,
                          includeClasses: [value],
                        },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockClasses.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Include Teachers</Label>
                  <Select
                    value={config.parameters.includeTeachers[0]}
                    onValueChange={(value) =>
                      setConfig({
                        ...config,
                        parameters: {
                          ...config.parameters,
                          includeTeachers: [value],
                        },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTeachers.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Group Results By</Label>
                <Select
                  value={config.parameters.groupBy}
                  onValueChange={(value) =>
                    setConfig({
                      ...config,
                      parameters: {
                        ...config.parameters,
                        groupBy: value as any,
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Grouping</SelectItem>
                    <SelectItem value="class">By Class</SelectItem>
                    <SelectItem value="grade">By Grade</SelectItem>
                    <SelectItem value="subject">By Subject</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Report Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-charts"
                      checked={config.parameters.includeCharts}
                      onCheckedChange={(checked) =>
                        setConfig({
                          ...config,
                          parameters: {
                            ...config.parameters,
                            includeCharts: !!checked,
                          },
                        })
                      }
                    />
                    <Label htmlFor="include-charts" className="text-sm">
                      Include charts and visualizations
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-comments"
                      checked={config.parameters.includeComments}
                      onCheckedChange={(checked) =>
                        setConfig({
                          ...config,
                          parameters: {
                            ...config.parameters,
                            includeComments: !!checked,
                          },
                        })
                      }
                    />
                    <Label htmlFor="include-comments" className="text-sm">
                      Include teacher comments and notes
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Schedule (Optional) */}
          {currentStep === "schedule" && (
            <div className="space-y-4">
              <div className="flex items-start gap-2 p-4 bg-amber-50 rounded-lg">
                <Info className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">
                    Scheduling is Optional
                  </p>
                  <p className="text-sm text-amber-700">
                    You can generate this report once now, or set up a recurring
                    schedule.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Schedule Frequency</Label>
                <Select
                  value={config.schedule?.frequency || "once"}
                  onValueChange={(value) =>
                    setConfig({
                      ...config,
                      schedule: {
                        frequency: value as any,
                        time: config.schedule?.time || "09:00",
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">Generate Once Now</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {config.schedule?.frequency !== "once" && (
                <div className="space-y-2">
                  <Label htmlFor="schedule-time">Time of Day</Label>
                  <Input
                    id="schedule-time"
                    type="time"
                    value={config.schedule?.time || "09:00"}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        schedule: {
                          ...config.schedule!,
                          time: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <div>
            {currentStep !== "basic" && (
              <Button
                variant="outline"
                onClick={() => {
                  const steps = ["basic", "parameters", "schedule"];
                  const currentIndex = steps.indexOf(currentStep);
                  setCurrentStep(steps[currentIndex - 1] as any);
                }}
              >
                Previous
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {currentStep === "schedule" ? (
              <Button onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Report"
                )}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  const steps = ["basic", "parameters", "schedule"];
                  const currentIndex = steps.indexOf(currentStep);
                  setCurrentStep(steps[currentIndex + 1] as any);
                }}
              >
                Next
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
