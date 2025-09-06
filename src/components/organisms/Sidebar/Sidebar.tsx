import {
  BookOpen,
  Users,
  Calendar,
  BarChart3,
  Settings,
  Home,
  GraduationCap,
  FileText,
  Bell,
  ClipboardList,
  Building,
} from "lucide-react";
import Logo from "@/assets/logo.jpeg";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavigationItem } from "@/components/molecules/NavigationItem/NavigationItem";

// Get auth type to determine navigation items
const authType = localStorage.getItem("authType");
const isSchool = authType === "school";
const isSuperAdmin = authType === "superadmin";

// School navigation items
const schoolNavigationItems = [
  { title: "Dashboard", url: "/school/dashboard", icon: Home },
  { title: "Students", url: "/school/students", icon: Users },
  { title: "Teachers", url: "/school/teachers", icon: GraduationCap },
  { title: "Classes", url: "/school/classes", icon: BookOpen },
  { title: "Syllabus", url: "/school/syllabus", icon: ClipboardList },
  { title: "Calendar", url: "/school/calendar", icon: Calendar },
  { title: "Analytics", url: "/school/analysis", icon: BarChart3 },
];

// SuperAdmin navigation items
const superAdminNavigationItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  { title: "Schools", url: "/admin/schools", icon: Building },
  { title: "Reports", url: "/admin/reports", icon: FileText },
];

// Use appropriate navigation based on auth type
const navigationItems = isSuperAdmin 
  ? superAdminNavigationItems 
  : schoolNavigationItems;

const systemItems = [
  { title: "Notifications", url: isSchool ? "/school/notifications" : "/admin/notifications", icon: Bell },
  { title: "Settings", url: isSchool ? "/school/settings" : "/admin/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent>
        {/* Logo/Brand Section */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Zamel" className="w-12 h-12 rounded-lg" />
            <div className="group-data-[collapsible=icon]:hidden">
              <h2 className="text-lg font-bold text-sidebar-foreground">
                Zamel
              </h2>
              <p className="text-xs text-sidebar-foreground/60">
                School Management
              </p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <NavigationItem
                  key={item.title}
                  title={item.title}
                  url={item.url}
                  icon={item.icon}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Section */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <NavigationItem
                  key={item.title}
                  title={item.title}
                  url={item.url}
                  icon={item.icon}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Collapse Toggle */}
        <div className="p-4 border-t border-sidebar-border">
          <SidebarTrigger className="w-full" />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
