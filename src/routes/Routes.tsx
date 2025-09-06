import React from "react";
import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { PublicRoute } from "@/components/routing/PublicRoute";
import { SchoolRoutes } from "./SchoolRoutes";
import { SuperAdminRoutes } from "./SuperAdminRoutes";

// Import auth pages
import { Login } from "@/features/auth/pages/Login/Login";

// Import common pages
import NotFound from "@/features/common/pages/NotFound";

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

      {/* School Routes */}
      <Route path="/school/*" element={<SchoolRoutes />} />

      {/* SuperAdmin Routes */}
      <Route path="/admin/*" element={<SuperAdminRoutes />} />

      {/* Default redirect based on auth type */}
      <Route path="/" element={<DefaultRedirect />} />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

// Component to redirect based on auth type
const DefaultRedirect: React.FC = () => {
  const authType = localStorage.getItem("authType");

  if (authType === "superadmin") {
    return <Navigate to="/admin/dashboard" replace />;
  } else if (authType === "school") {
    return <Navigate to="/school/dashboard" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};
