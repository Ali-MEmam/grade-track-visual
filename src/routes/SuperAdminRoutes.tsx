import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/templates/DashboardLayout/DashboardLayout';
import { SuperAdminRoute } from './guards/SuperAdminRoute';

// SuperAdmin pages
import { SuperAdminDashboard } from '@/domains/superadmin/pages/Dashboard/Dashboard';
import { SuperAdminSchools } from '@/domains/superadmin/pages/Schools/Schools';
import { Reports } from '@/domains/superadmin/pages/Reports/Reports';

// Shared features
import { Settings } from '@/features/settings/pages/Settings/Settings';
import { Notifications } from '@/features/notifications/pages/Notifications/Notifications';

export const SuperAdminRoutes: React.FC = () => {
  return (
    <SuperAdminRoute>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/schools" element={<SuperAdminSchools />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </DashboardLayout>
    </SuperAdminRoute>
  );
};