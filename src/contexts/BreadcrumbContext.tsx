import React, { createContext, useContext, useState, useCallback } from "react";

interface BreadcrumbContextType {
  customLabels: Record<string, string>;
  setCustomLabel: (path: string, label: string) => void;
  clearCustomLabel: (path: string) => void;
  clearAllCustomLabels: () => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export const BreadcrumbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customLabels, setCustomLabels] = useState<Record<string, string>>({});

  const setCustomLabel = useCallback((path: string, label: string) => {
    setCustomLabels(prev => ({
      ...prev,
      [path]: label
    }));
  }, []);

  const clearCustomLabel = useCallback((path: string) => {
    setCustomLabels(prev => {
      const newLabels = { ...prev };
      delete newLabels[path];
      return newLabels;
    });
  }, []);

  const clearAllCustomLabels = useCallback(() => {
    setCustomLabels({});
  }, []);

  return (
    <BreadcrumbContext.Provider
      value={{
        customLabels,
        setCustomLabel,
        clearCustomLabel,
        clearAllCustomLabels
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
};