import { NavLink } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { Home, Users, Calendar, BarChart3, Settings, Building, FileText } from "lucide-react";

// Get auth type to determine navigation items
const authType = localStorage.getItem("authType");
const isSchool = authType === "school";
const isSuperAdmin = authType === "superadmin";

// School navigation items for mobile
const schoolMobileItems = [
  { title: "Dashboard", url: "/school/dashboard", icon: Home },
  { title: "Students", url: "/school/students", icon: Users },
  { title: "Calendar", url: "/school/calendar", icon: Calendar },
  { title: "Analytics", url: "/school/analysis", icon: BarChart3 },
  { title: "Settings", url: "/school/settings", icon: Settings },
];

// SuperAdmin navigation items for mobile
const superAdminMobileItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  { title: "Schools", url: "/admin/schools", icon: Building },
  { title: "Reports", url: "/admin/reports", icon: FileText },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

// Use appropriate navigation based on auth type
const mainNavigationItems = isSuperAdmin 
  ? superAdminMobileItems 
  : schoolMobileItems;

interface BottomNavItemProps {
  title: string;
  url: string;
  icon: LucideIcon;
  isMiddle?: boolean;
}

const BottomNavItem = ({
  title,
  url,
  icon: Icon,
  isMiddle = false,
}: BottomNavItemProps) => {
  if (isMiddle) {
    return (
      <NavLink
        to={url}
        end
        className="flex flex-col items-center justify-center py-2 px-1 transition-all duration-200"
      >
        {({ isActive }) => (
          <>
            <div
              className={`relative -top-3 w-14 h-14 rounded-full bg-primary dark:bg-gradient-primary shadow-lg flex items-center justify-center transition-all duration-200 ${
                isActive ? "scale-110 shadow-xl" : "hover:scale-105"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <span
              className={`text-xs font-medium transition-all duration-200 -mt-2 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {title}
            </span>
          </>
        )}
      </NavLink>
    );
  }

  return (
    <NavLink
      to={url}
      end
      className={({ isActive }) =>
        `flex flex-col items-center justify-center py-2 px-1 transition-all duration-200 ${
          isActive
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div
            className={`transition-transform duration-200 ${
              isActive ? "scale-110" : ""
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <span
            className={`text-xs mt-1 font-medium transition-all duration-200 ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {title}
          </span>
        </>
      )}
    </NavLink>
  );
};

export const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border/50 shadow-lg md:hidden">
      <div className="flex items-center justify-around px-2 pt-4 py-2 pb-4">
        {mainNavigationItems.map((item, index) => (
          <BottomNavItem
            key={item.title}
            title={item.title}
            url={item.url}
            icon={item.icon}
            isMiddle={index === 2}
          />
        ))}
      </div>
    </nav>
  );
};
