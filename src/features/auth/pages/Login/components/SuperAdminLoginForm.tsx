import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SuperAdminLoginCredentials } from '@/features/auth/types/auth.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Shield, Mail, Lock, AlertTriangle } from 'lucide-react';

const superAdminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

interface SuperAdminLoginFormProps {
  onSubmit: (data: SuperAdminLoginCredentials) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export const SuperAdminLoginForm: React.FC<SuperAdminLoginFormProps> = ({
  onSubmit,
  loading = false,
  error = null,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SuperAdminLoginCredentials>({
    resolver: zodResolver(superAdminLoginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/10 rounded-full mb-2">
            <Shield className="h-8 w-8 text-destructive" />
          </div>
          <h3 className="text-xl font-semibold">Super Admin Login</h3>
          <p className="text-sm text-muted-foreground">
            System-wide administration access
          </p>
        </div>

        <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 dark:text-orange-200">
            This is a restricted area. Unauthorized access attempts will be logged.
          </AlertDescription>
        </Alert>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="admin-email">
            <Mail className="inline h-4 w-4 mr-1" />
            Admin Email
          </Label>
          <Input
            id="admin-email"
            type="email"
            placeholder="admin@system.com"
            disabled={loading}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="admin-password">
            <Lock className="inline h-4 w-4 mr-1" />
            Admin Password
          </Label>
          <Input
            id="admin-password"
            type="password"
            placeholder="Enter admin password"
            disabled={loading}
            {...register('password')}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-destructive hover:bg-destructive/90" 
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Authenticating...
          </>
        ) : (
          <>
            <Shield className="mr-2 h-4 w-4" />
            Sign in as Super Admin
          </>
        )}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        <p>Need super admin access?</p>
        <p>Contact system support</p>
      </div>
    </form>
  );
};