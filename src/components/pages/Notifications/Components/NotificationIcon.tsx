import {
  LucideIcon,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type NotificationType = "info" | "warning" | "success" | "error";

interface NotificationIconProps {
  type: NotificationType;
  className?: string;
}

const iconMap: Record<NotificationType, LucideIcon> = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: XCircle,
};

const colorMap: Record<NotificationType, string> = {
  info: "text-blue-500",
  warning: "text-amber-500",
  success: "text-green-500",
  error: "text-red-500",
};

export const NotificationIcon = ({
  type,
  className,
}: NotificationIconProps) => {
  const Icon = iconMap[type];

  return <Icon className={cn("h-4 w-4 shrink-0", colorMap[type], className)} />;
};

export type { NotificationIconProps };
