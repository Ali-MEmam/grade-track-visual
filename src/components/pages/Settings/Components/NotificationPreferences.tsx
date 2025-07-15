import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import { Button } from "@/components/atoms/Button/Button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NotificationPreferencesData {
  email: {
    enabled: boolean;
    newEnrollments: boolean;
    attendanceAlerts: boolean;
    systemUpdates: boolean;
    reports: boolean;
  };
  sms: {
    enabled: boolean;
    emergencyAlerts: boolean;
    attendanceAlerts: boolean;
    importantAnnouncements: boolean;
  };
  inApp: {
    enabled: boolean;
    allNotifications: boolean;
    mentions: boolean;
    reminders: boolean;
  };
}

interface NotificationPreferencesProps {
  preferences: NotificationPreferencesData;
  onSave: (data: NotificationPreferencesData) => void;
  className?: string;
}

const emailPreferences = [
  {
    key: "newEnrollments" as const,
    label: "New Student Enrollments",
    description: "Get notified when new students enroll",
  },
  {
    key: "attendanceAlerts" as const,
    label: "Attendance Alerts",
    description: "Low attendance warnings and reports",
  },
  {
    key: "systemUpdates" as const,
    label: "System Updates",
    description: "Important system maintenance and updates",
  },
  {
    key: "reports" as const,
    label: "Generated Reports",
    description: "When reports are ready for review",
  },
];

const smsPreferences = [
  {
    key: "emergencyAlerts" as const,
    label: "Emergency Alerts",
    description: "Critical school emergencies",
  },
  {
    key: "attendanceAlerts" as const,
    label: "Attendance Alerts",
    description: "Urgent attendance issues",
  },
  {
    key: "importantAnnouncements" as const,
    label: "Important Announcements",
    description: "School-wide important updates",
  },
];

const inAppPreferences = [
  {
    key: "allNotifications" as const,
    label: "All Notifications",
    description: "Receive all in-app notifications",
  },
  {
    key: "mentions" as const,
    label: "Mentions",
    description: "When someone mentions you",
  },
  {
    key: "reminders" as const,
    label: "Reminders",
    description: "Task and event reminders",
  },
];

export const NotificationPreferences = ({
  preferences,
  onSave,
  className,
}: NotificationPreferencesProps) => {
  const updatePreference = <T extends keyof NotificationPreferencesData>(
    category: T,
    key: keyof NotificationPreferencesData[T],
    value: boolean
  ) => {
    const newPreferences = {
      ...preferences,
      [category]: {
        ...preferences[category],
        [key]: value,
      },
    };
    onSave(newPreferences);
  };

  const toggleCategoryEnabled = <T extends keyof NotificationPreferencesData>(
    category: T,
    enabled: boolean
  ) => {
    const newPreferences = {
      ...preferences,
      [category]: {
        ...preferences[category],
        enabled,
      },
    };
    onSave(newPreferences);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Email Notifications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <h4 className="font-medium">Email Notifications</h4>
            </div>
            <Switch
              checked={preferences.email.enabled}
              onCheckedChange={(enabled) =>
                toggleCategoryEnabled("email", enabled)
              }
            />
          </div>

          {preferences.email.enabled && (
            <div className="space-y-3 pl-7 border-l-2 border-muted ml-2.5">
              {emailPreferences.map((pref) => (
                <div
                  key={pref.key}
                  className="flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">{pref.label}</Label>
                    <p className="text-xs text-muted-foreground">
                      {pref.description}
                    </p>
                  </div>
                  <Switch
                    checked={preferences.email[pref.key]}
                    onCheckedChange={(value) =>
                      updatePreference("email", pref.key, value)
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SMS Notifications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <h4 className="font-medium">SMS Notifications</h4>
            </div>
            <Switch
              checked={preferences.sms.enabled}
              onCheckedChange={(enabled) =>
                toggleCategoryEnabled("sms", enabled)
              }
            />
          </div>

          {preferences.sms.enabled && (
            <div className="space-y-3 pl-7 border-l-2 border-muted ml-2.5">
              {smsPreferences.map((pref) => (
                <div
                  key={pref.key}
                  className="flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">{pref.label}</Label>
                    <p className="text-xs text-muted-foreground">
                      {pref.description}
                    </p>
                  </div>
                  <Switch
                    checked={preferences.sms[pref.key]}
                    onCheckedChange={(value) =>
                      updatePreference("sms", pref.key, value)
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* In-App Notifications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <h4 className="font-medium">In-App Notifications</h4>
            </div>
            <Switch
              checked={preferences.inApp.enabled}
              onCheckedChange={(enabled) =>
                toggleCategoryEnabled("inApp", enabled)
              }
            />
          </div>

          {preferences.inApp.enabled && (
            <div className="space-y-3 pl-7 border-l-2 border-muted ml-2.5">
              {inAppPreferences.map((pref) => (
                <div
                  key={pref.key}
                  className="flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">{pref.label}</Label>
                    <p className="text-xs text-muted-foreground">
                      {pref.description}
                    </p>
                  </div>
                  <Switch
                    checked={preferences.inApp[pref.key]}
                    onCheckedChange={(value) =>
                      updatePreference("inApp", pref.key, value)
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export type { NotificationPreferencesProps };
