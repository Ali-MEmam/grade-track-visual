import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { PrivateRoute } from '@/components/routing/PrivateRoute';
import { PublicRoute } from '@/components/routing/PublicRoute';
import { DashboardLayout } from '@/components/templates/DashboardLayout/DashboardLayout';

// Import pages
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import { Students } from '@/components/pages/Students/Students';
import { Teachers } from '@/components/pages/Teachers/Teachers';
import { Calendar } from '@/components/pages/Calendar/Calendar';
import { Notifications } from '@/components/pages/Notifications/Notifications';
import { Settings } from '@/components/pages/Settings/Settings';
import { Analysis } from '@/components/pages/Analysis/Analysis';
import { Classes } from '@/components/pages/Classes/Classes';
import { Syllabus } from '@/components/pages/Syllabus/Syllabus';
import { Reports } from '@/components/pages/Reports/Reports';
import { Login } from '@/components/pages/Auth/Login';
import { Register } from '@/components/pages/Auth/Register';

export const Routes: React.FC = () => {
  return (
    <RouterRoutes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />

      {/* Private Routes with Dashboard Layout */}
      <Route 
        path="/*" 
        element={
          <PrivateRoute>
            <DashboardLayout>
              <RouterRoutes>
                <Route path="/" element={<Index />} />
                <Route path="/students" element={<Students />} />
                <Route 
                  path="/teachers" 
                  element={
                    <PrivateRoute requiredRole="admin">
                      <Teachers />
                    </PrivateRoute>
                  } 
                />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<Settings />} />
                <Route 
                  path="/analytics" 
                  element={
                    <PrivateRoute requiredRole="admin">
                      <Analysis />
                    </PrivateRoute>
                  } 
                />
                <Route path="/classes" element={<Classes />} />
                <Route path="/syllabus" element={<Syllabus />} />
                <Route 
                  path="/reports" 
                  element={
                    <PrivateRoute requiredRole="admin">
                      <Reports />
                    </PrivateRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </RouterRoutes>
            </DashboardLayout>
          </PrivateRoute>
        } 
      />
    </RouterRoutes>
  );
};