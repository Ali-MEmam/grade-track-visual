import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/atoms/Card/Card';
import { LoginToggle } from './components/LoginToggle';
import { SchoolLoginForm } from './components/SchoolLoginForm';
import { SuperAdminLoginForm } from './components/SuperAdminLoginForm';
import { 
  AuthType, 
  SchoolLoginCredentials, 
  SuperAdminLoginCredentials 
} from '@/features/auth/types/auth.types';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const Login: React.FC = () => {
  const [authType, setAuthType] = useState<AuthType>('school');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSchoolLogin = async (credentials: SchoolLoginCredentials) => {
    setLoading(true);
    setError(null);
    
    try {
      // Pass schoolCode to login function
      await login(credentials.email, credentials.password, credentials.schoolCode);
      
      toast.success('Welcome to School Portal');
      navigate('/school/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSuperAdminLogin = async (credentials: SuperAdminLoginCredentials) => {
    setLoading(true);
    setError(null);
    
    try {
      // Pass no schoolCode for superadmin
      await login(credentials.email, credentials.password);
      
      toast.success('Welcome Super Admin');
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gradient-to-br dark:from-background dark:via-background dark:to-muted/20 p-4">
      <Card className="w-full max-w-lg shadow-xl">
        <CardContent className="p-8">
          <div className="space-y-8">
            <LoginToggle 
              value={authType} 
              onChange={setAuthType} 
            />
            
            <div className="transition-all duration-300">
              {authType === 'school' ? (
                <SchoolLoginForm
                  onSubmit={handleSchoolLogin}
                  loading={loading}
                  error={error}
                />
              ) : (
                <SuperAdminLoginForm
                  onSubmit={handleSuperAdminLogin}
                  loading={loading}
                  error={error}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};