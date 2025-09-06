import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Determine where to redirect based on auth type
  const authType = localStorage.getItem("authType");
  const homeUrl = authType === "superadmin" 
    ? "/admin/dashboard" 
    : authType === "school" 
    ? "/school/dashboard" 
    : "/login";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gradient-to-br dark:from-background dark:via-background dark:to-muted/20 p-4">
      <div className="text-center space-y-8 max-w-md animate-fade-in">
        {/* Large 404 with gradient effect */}
        <div className="relative">
          <h1 className="text-[150px] sm:text-[200px] font-bold leading-none select-none">
            <span className="bg-gradient-to-br from-primary/50 via-primary to-primary/50 bg-clip-text text-transparent">
              404
            </span>
          </h1>
          <div className="absolute inset-0 blur-3xl bg-primary/10 -z-10 animate-pulse"></div>
        </div>

        {/* Error message */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Search icon animation */}
        <div className="flex justify-center py-4">
          <div className="relative">
            <Search className="h-16 w-16 text-muted-foreground/30 animate-bounce" />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          
          <Link to={homeUrl}>
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              <Home className="h-4 w-4" />
              Go to Dashboard
            </Button>
          </Link>
        </div>

        {/* Additional help text */}
        <p className="text-sm text-muted-foreground pt-4">
          Lost? Try going back to the{" "}
          <Link to={homeUrl} className="text-primary hover:text-primary/80 underline">
            dashboard
          </Link>{" "}
          or use the navigation menu.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
