import { useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export type DateRange = {
  from: Date;
  to: Date;
};

export type PresetRange = "week" | "month" | "quarter" | "year" | "custom";

interface DateRangeFilterProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

const presetRanges: {
  value: PresetRange;
  label: string;
  getDates: () => DateRange;
}[] = [
  {
    value: "week",
    label: "This Week",
    getDates: () => {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - dayOfWeek);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return { from: startOfWeek, to: endOfWeek };
    },
  },
  {
    value: "month",
    label: "This Month",
    getDates: () => {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return { from: startOfMonth, to: endOfMonth };
    },
  },
  {
    value: "quarter",
    label: "This Quarter",
    getDates: () => {
      const today = new Date();
      const quarter = Math.floor(today.getMonth() / 3);
      const startOfQuarter = new Date(today.getFullYear(), quarter * 3, 1);
      const endOfQuarter = new Date(today.getFullYear(), quarter * 3 + 3, 0);
      return { from: startOfQuarter, to: endOfQuarter };
    },
  },
  {
    value: "year",
    label: "This Year",
    getDates: () => {
      const today = new Date();
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      const endOfYear = new Date(today.getFullYear(), 11, 31);
      return { from: startOfYear, to: endOfYear };
    },
  },
];

export const DateRangeFilter = ({
  value,
  onChange,
  className,
}: DateRangeFilterProps) => {
  const [selectedPreset, setSelectedPreset] = useState<PresetRange>("month");
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const handlePresetChange = (preset: PresetRange) => {
    setSelectedPreset(preset);
    if (preset !== "custom") {
      const presetRange = presetRanges.find((p) => p.value === preset);
      if (presetRange) {
        onChange(presetRange.getDates());
      }
    }
  };

  const formatDateRange = () => {
    if (!value.from || !value.to) return "Select date range";

    if (format(value.from, "yyyy-MM-dd") === format(value.to, "yyyy-MM-dd")) {
      return format(value.from, "MMM dd, yyyy");
    }

    return `${format(value.from, "MMM dd")} - ${format(
      value.to,
      "MMM dd, yyyy"
    )}`;
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Preset Buttons */}
      <div className="flex gap-1">
        {presetRanges.map((preset) => (
          <Button
            key={preset.value}
            variant={selectedPreset === preset.value ? "default" : "outline"}
            size="sm"
            onClick={() => handlePresetChange(preset.value)}
          >
            {preset.label}
          </Button>
        ))}
      </div>

      {/* Custom Date Range Picker */}
      <Popover open={isCustomOpen} onOpenChange={setIsCustomOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={selectedPreset === "custom" ? "default" : "outline"}
            size="sm"
            className="gap-2"
            onClick={() => {
              setSelectedPreset("custom");
              setIsCustomOpen(true);
            }}
          >
            <CalendarIcon className="h-4 w-4" />
            {selectedPreset === "custom" ? formatDateRange() : "Custom"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="range"
            selected={{
              from: value.from,
              to: value.to,
            }}
            onSelect={(range) => {
              if (range?.from && range?.to) {
                onChange({ from: range.from, to: range.to });
                setIsCustomOpen(false);
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export type { DateRangeFilterProps };
