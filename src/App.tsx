import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/templates/DashboardLayout/DashboardLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Students } from "@/components/pages/Students/Students";
import { Teachers } from "@/components/pages/Teachers/Teachers";
import { Calendar } from "@/components/pages/Calendar/Calendar";
import { Notifications } from "@/components/pages/Notifications/Notifications";
import { Settings } from "@/components/pages/Settings/Settings";
import { Analysis } from "@/components/pages/Analysis/Analysis";
import { Classes } from "@/components/pages/Classes/Classes";
import { Syllabus } from "@/components/pages/Syllabus/Syllabus";
import { Reports } from "@/components/pages/Reports/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/students" element={<Students />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/analytics" element={<Analysis />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/syllabus" element={<Syllabus />} />
            <Route path="/reports" element={<Reports />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
