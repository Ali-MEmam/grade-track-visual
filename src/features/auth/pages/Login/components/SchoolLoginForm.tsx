import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SchoolLoginCredentials } from '@/features/auth/types/auth.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, School, Mail, Lock, Hash } from 'lucide-react';

const schoolLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  schoolCode: z.string().min(3, 'School code is required'),
});

interface SchoolLoginFormProps {
  onSubmit: (data: SchoolLoginCredentials) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export const SchoolLoginForm: React.FC<SchoolLoginFormProps> = ({
  onSubmit,
  loading = false,
  error = null,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchoolLoginCredentials>({
    resolver: zodResolver(schoolLoginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-2">
            <School className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">School Login</h3>
          <p className="text-sm text-muted-foreground">
            Access your school's management portal
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="schoolCode">
            <Hash className="inline h-4 w-4 mr-1" />
            School Code
          </Label>
          <Input
            id="schoolCode"
            type="text"
            placeholder="Enter your school code"
            disabled={loading}
            {...register('schoolCode')}
          />
          {errors.schoolCode && (
            <p className="text-sm text-destructive">{errors.schoolCode.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            <Mail className="inline h-4 w-4 mr-1" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@school.edu"
            disabled={loading}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">
            <Lock className="inline h-4 w-4 mr-1" />
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            disabled={loading}
            {...register('password')}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign in to School Portal'
        )}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        <p>Don't have a school account?</p>
        <p>Contact your system administrator</p>
      </div>
    </form>
  );
};