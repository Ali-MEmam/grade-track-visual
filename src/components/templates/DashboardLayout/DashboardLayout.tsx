import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/organisms/Sidebar/Sidebar";
import { BottomNavigation } from "@/components/organisms/BottomNavigation/BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <main className="p-4 pb-28 overflow-auto">{children}</main>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-subtle">
        <AppSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};
