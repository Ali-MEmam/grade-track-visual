import { useState } from "react";
import { SettingsForm, SettingsData } from "./Components/SettingsForm";
import { useTheme } from "@/hooks/useTheme";

export const Settings = () => {
  const { theme, setTheme } = useTheme();
  
  // Mock settings data with dynamic theme
  const mockSettings: SettingsData = {
    profile: {
      name: "Principal Smith",
      email: "principal.smith@school.edu",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PrincipalSmith",
    },
    notifications: {
      email: {
        enabled: true,
        newEnrollments: true,
        attendanceAlerts: true,
        systemUpdates: false,
        reports: true,
      },
      sms: {
        enabled: false,
        emergencyAlerts: true,
        attendanceAlerts: false,
        importantAnnouncements: false,
      },
      inApp: {
        enabled: true,
        allNotifications: true,
        mentions: true,
        reminders: true,
      },
    },
    theme: theme,
  };
  
  const [settings, setSettings] = useState<SettingsData>(mockSettings);

  const handleSave = (updates: Partial<SettingsData>) => {
    setSettings((prev) => ({
      ...prev,
      ...updates,
    }));
    
    // Apply theme change if theme was updated
    if (updates.theme) {
      setTheme(updates.theme);
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
          Settings
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage your account preferences and system settings
        </p>
      </div>

      {/* Settings Form */}
      <SettingsForm settings={settings} onSave={handleSave} />
    </div>
  );
};
