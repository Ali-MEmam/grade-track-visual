import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/templates/DashboardLayout/DashboardLayout';
import { SchoolRoute } from './guards/SchoolRoute';

// School pages
import { SchoolDashboard } from '@/domains/school/pages/Dashboard/Dashboard';
import { Students } from '@/domains/school/pages/Students/Students';
import { Teachers } from '@/domains/school/pages/Teachers/Teachers';
import { Classes } from '@/domains/school/pages/Classes/Classes';
import { Syllabus } from '@/domains/school/pages/Syllabus/Syllabus';
import { Calendar } from '@/domains/school/pages/Calendar/Calendar';
import { Analysis } from '@/domains/school/pages/Analysis/Analysis';

// Shared features
import { Settings } from '@/features/settings/pages/Settings/Settings';
import { Notifications } from '@/features/notifications/pages/Notifications/Notifications';

export const SchoolRoutes: React.FC = () => {
  return (
    <SchoolRoute>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/school/dashboard" replace />} />
          <Route path="/dashboard" element={<SchoolDashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/school/dashboard" replace />} />
        </Routes>
      </DashboardLayout>
    </SchoolRoute>
  );
};