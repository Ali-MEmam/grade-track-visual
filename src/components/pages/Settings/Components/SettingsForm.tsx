import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSection, ProfileData } from "./ProfileSection";
import {
  NotificationPreferences,
  NotificationPreferencesData,
} from "./NotificationPreferences";
import { ThemeSelector, Theme } from "./ThemeSelector";
import { useToast } from "@/hooks/use-toast";

interface SettingsData {
  profile: ProfileData;
  notifications: NotificationPreferencesData;
  theme: Theme;
}

interface SettingsFormProps {
  settings: SettingsData;
  onSave: (data: Partial<SettingsData>) => void;
  className?: string;
}

export const SettingsForm = ({
  settings,
  onSave,
  className,
}: SettingsFormProps) => {
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();

  const handleProfileSave = (
    profileData: ProfileData & {
      currentPassword?: string;
      newPassword?: string;
    }
  ) => {
    onSave({ profile: profileData });
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully.",
    });
  };

  const handleNotificationSave = (
    notificationData: NotificationPreferencesData
  ) => {
    onSave({ notifications: notificationData });
    toast({
      title: "Preferences Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleThemeChange = (theme: Theme) => {
    onSave({ theme });
    toast({
      title: "Theme Updated",
      description: `Theme changed to ${theme} mode.`,
    });
  };

  return (
    <div className={className}>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="text-sm">
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-sm">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="text-sm">
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-0">
          <ProfileSection
            profile={settings.profile}
            onSave={handleProfileSave}
          />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-0">
          <NotificationPreferences
            preferences={settings.notifications}
            onSave={handleNotificationSave}
          />
        </TabsContent>

        <TabsContent value="appearance" className="space-y-0">
          <ThemeSelector
            theme={settings.theme}
            onThemeChange={handleThemeChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export type { SettingsFormProps, SettingsData };
