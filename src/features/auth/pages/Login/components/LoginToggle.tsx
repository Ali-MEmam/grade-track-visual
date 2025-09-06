import React from 'react';
import { AuthType } from '@/features/auth/types/auth.types';
import { School, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoginToggleProps {
  value: AuthType;
  onChange: (value: AuthType) => void;
  className?: string;
}

export const LoginToggle: React.FC<LoginToggleProps> = ({ 
  value, 
  onChange, 
  className 
}) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold text-center">Select Login Type</h2>
        
        <div className="flex w-full max-w-md bg-muted rounded-lg p-1">
          <button
            type="button"
            onClick={() => onChange('school')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all duration-200",
              value === 'school' 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <School className="h-5 w-5" />
            <span className="font-medium">School</span>
          </button>
          
          <button
            type="button"
            onClick={() => onChange('superadmin')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all duration-200",
              value === 'superadmin' 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Shield className="h-5 w-5" />
            <span className="font-medium">Super Admin</span>
          </button>
        </div>
        
        <p className="text-sm text-muted-foreground text-center">
          {value === 'school' 
            ? "Login to manage your school's students, teachers, and classes"
            : "Login to manage multiple schools and system-wide settings"
          }
        </p>
      </div>
    </div>
  );
};