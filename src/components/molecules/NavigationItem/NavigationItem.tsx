import { NavLink } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

interface NavigationItemProps {
  title: string;
  url: string;
  icon: LucideIcon;
  collapsed?: boolean;
}

export const NavigationItem = ({
  title,
  url,
  icon: Icon,
  collapsed,
}: NavigationItemProps) => {
  return (
    <SidebarMenuItem>
      <NavLink
        to={url}
        end
        className={({ isActive }) =>
          `flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-all ${
            isActive
              ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
              : "text-black dark:text-sidebar-foreground hover:bg-sidebar-accent hover:text-black dark:hover:text-sidebar-accent-foreground"
          }`
        }
      >
        <Icon className="w-4 h-4" />
        <span className="group-data-[collapsible=icon]:hidden">{title}</span>
      </NavLink>
    </SidebarMenuItem>
  );
};
