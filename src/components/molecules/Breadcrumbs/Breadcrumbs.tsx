import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";

export const Breadcrumbs = () => {
  const location = useLocation();
  const { customLabels } = useBreadcrumb();
  
  // Split pathname into segments and filter out empty strings
  const pathSegments = location.pathname.split("/").filter(Boolean);
  
  // Don't show breadcrumbs on root or single-level paths
  if (pathSegments.length <= 1) {
    return null;
  }

  // Generate breadcrumb items
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const isLast = index === pathSegments.length - 1;
    
    // Get custom label if available, otherwise format the segment
    const getLabel = (segment: string, path: string) => {
      // Check for custom label first
      if (customLabels[path]) {
        return customLabels[path];
      }
      
      // Format segment name (capitalize and replace hyphens with spaces)
      return segment
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };
    
    const label = getLabel(segment, path);
    
    return { path, label, isLast };
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-2 border-b border-border bg-background/50">
      <Breadcrumb>
        <BreadcrumbList>
          {/* Home/Dashboard link */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center gap-1">
                <Home className="h-3 w-3" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          {/* Dynamic breadcrumb items */}
          {breadcrumbItems.map((item, index) => (
            <span key={item.path} className="flex items-center">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {item.isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.path}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};