import { useState } from "react";
import { NotificationsList } from "./Components/NotificationsList";
import { NotificationData } from "./Components/NotificationItem";

// Mock notification data
const mockNotifications: NotificationData[] = [
  {
    id: "1",
    type: "info",
    title: "New Student Enrollment",
    description:
      "Sarah Johnson has been enrolled in Grade 10-A. Please review and approve the enrollment documentation.",
    timestamp: new Date().toISOString(),
    isRead: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Low Attendance Alert",
    description:
      "Grade 9-B has attendance below 85% threshold. Immediate action may be required.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    isRead: false,
  },
  {
    id: "3",
    type: "success",
    title: "Report Generated Successfully",
    description:
      "Monthly academic performance report for November has been generated and is ready for review.",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    isRead: true,
  },
  {
    id: "4",
    type: "error",
    title: "System Maintenance Required",
    description:
      "Critical system update required. Please schedule maintenance window within next 24 hours.",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    isRead: false,
  },
  {
    id: "5",
    type: "info",
    title: "Parent-Teacher Conference Scheduled",
    description:
      "Conference for Grade 8-C scheduled for December 15th at 2:00 PM in Conference Room A.",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    isRead: true,
  },
  {
    id: "6",
    type: "warning",
    title: "Fee Payment Overdue",
    description:
      "Multiple students have overdue fee payments. Finance department requires immediate attention.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    isRead: false,
  },
  {
    id: "7",
    type: "success",
    title: "Teacher Onboarding Complete",
    description:
      "Dr. Emily Davis has successfully completed the onboarding process and is ready to start classes.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    isRead: true,
  },
  {
    id: "8",
    type: "info",
    title: "Exam Schedule Published",
    description:
      "Final examination schedule for Grade 12 has been published and distributed to all concerned parties.",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    isRead: true,
  },
  {
    id: "9",
    type: "error",
    title: "Server Downtime Alert",
    description:
      "Unexpected server downtime detected in the student portal. IT team has been notified for immediate resolution.",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    isRead: false,
  },
  {
    id: "10",
    type: "warning",
    title: "Library Book Return Reminder",
    description:
      "Several students have overdue library books. Please send reminder notices to improve return rates.",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    isRead: true,
  },
];

export const Notifications = () => {
  const [notifications, setNotifications] =
    useState<NotificationData[]>(mockNotifications);

  const handleNotificationUpdate = (
    id: string,
    updates: Partial<NotificationData>
  ) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, ...updates } : notification
      )
    );
  };

  const handleNotificationDelete = (ids: string[]) => {
    setNotifications((prev) =>
      prev.filter((notification) => !ids.includes(notification.id))
    );
  };

  return (
    <div className="space-y-6 lg:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
          Notifications
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Stay updated with important school notifications and alerts
        </p>
      </div>

      {/* Notifications List */}
      <NotificationsList
        notifications={notifications}
        onNotificationUpdate={handleNotificationUpdate}
        onNotificationDelete={handleNotificationDelete}
      />
    </div>
  );
};
