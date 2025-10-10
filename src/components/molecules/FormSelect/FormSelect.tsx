import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormSelectProps {
  label: string;
  items: { value: string; label: string }[];
  selected: string[];
  onSelected: (selected: string[]) => void;
  placeholder?: string;
  isRequired?: boolean;
  error?: string;
  info?: string;
  isLoading?: boolean;
  disabled?: boolean;
  containerClassName?: string;
  id?: string;
}

const FormSelect = React.forwardRef<HTMLDivElement, FormSelectProps>(
  (
    {
      label,
      items = [],
      selected = [],
      onSelected,
      placeholder = "Select items...",
      isRequired = false,
      error,
      info,
      isLoading = false,
      disabled = false,
      containerClassName,
      id,
    },
    ref
  ) => {
    const selectId = id || `select-${React.useId()}`;
    const messageId = `${selectId}-message`;

    const handleSelect = (value: string) => {
      if (selected.includes(value)) {
        // Remove if already selected
        onSelected(selected.filter((item) => item !== value));
      } else {
        // Add if not selected
        onSelected([...selected, value]);
      }
    };

    const getDisplayText = () => {
      if (selected.length === 0) {
        return placeholder;
      }
      if (selected.length === 1) {
        const selectedItem = items.find((item) => item.value === selected[0]);
        return selectedItem?.label || `${selected.length} selected`;
      }
      return `${selected.length} selected`;
    };

    return (
      <div ref={ref} className={cn("grid gap-2", containerClassName)}>
        <Label
          htmlFor={selectId}
          className={cn(
            "text-sm font-medium leading-none",
            error && "text-destructive"
          )}
        >
          {label}
          {isRequired && (
            <span className="text-destructive ml-1" aria-label="required">
              *
            </span>
          )}
        </Label>

        {isLoading ? (
          <div className="flex items-center justify-center py-3 border rounded-md">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground mr-2" />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        ) : (
          <Select onValueChange={handleSelect} disabled={disabled}>
            <SelectTrigger
              id={selectId}
              className={cn(
                error && "border-destructive focus-visible:ring-destructive"
              )}
              aria-describedby={error || info ? messageId : undefined}
              aria-invalid={!!error}
            >
              <SelectValue placeholder={getDisplayText()} />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {items.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className="cursor-pointer"
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {(error || info) && (
          <p
            id={messageId}
            className={cn(
              "text-sm",
              error ? "text-destructive font-medium" : "text-muted-foreground"
            )}
          >
            {error || info}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";

export { FormSelect, type FormSelectProps };
