import { useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  
  // Initialize theme on mount
  useEffect(() => {
    // Theme is automatically applied by the hook
  }, [theme]);
  
  return <>{children}</>;
};