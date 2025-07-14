import { NavLink } from "react-router-dom"
import { LucideIcon } from "lucide-react"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

interface NavigationItemProps {
  title: string
  url: string
  icon: LucideIcon
  collapsed?: boolean
}

export const NavigationItem = ({ title, url, icon: Icon, collapsed }: NavigationItemProps) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <NavLink 
          to={url} 
          end
          className={({ isActive }) => 
            isActive 
              ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium" 
              : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          }
        >
          <Icon className="w-4 h-4" />
          <span className="group-data-[collapsible=icon]:hidden">{title}</span>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}