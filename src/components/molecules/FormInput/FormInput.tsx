import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.ComponentProps<"input"> {
  label: string;
  isRequired?: boolean;
  error?: string;
  info?: string;
  containerClassName?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ 
    label, 
    isRequired = false, 
    error, 
    info, 
    className, 
    containerClassName, 
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${React.useId()}`;
    const messageId = `${inputId}-message`;
    
    return (
      <div className={cn("grid gap-2", containerClassName)}>
        <Label 
          htmlFor={inputId} 
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
        
        <Input
          id={inputId}
          ref={ref}
          className={cn(
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          aria-describedby={error || info ? messageId : undefined}
          aria-invalid={!!error}
          {...props}
        />
        
        {(error || info) && (
          <p
            id={messageId}
            className={cn(
              "text-sm",
              error 
                ? "text-destructive font-medium" 
                : "text-muted-foreground"
            )}
          >
            {error || info}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput, type FormInputProps };