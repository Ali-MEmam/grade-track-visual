import { 
  BookOpen, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  Home,
  GraduationCap,
  FileText,
  Bell
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { NavigationItem } from "@/components/molecules/NavigationItem/NavigationItem"

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Students", url: "/students", icon: Users },
  { title: "Teachers", url: "/teachers", icon: GraduationCap },
  { title: "Classes", url: "/classes", icon: BookOpen },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
]

const systemItems = [
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent>
        {/* Logo/Brand Section */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <h2 className="text-lg font-bold text-sidebar-foreground">EduDash</h2>
              <p className="text-xs text-sidebar-foreground/60">School Management</p>
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
  )
}