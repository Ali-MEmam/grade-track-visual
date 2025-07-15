import { NotificationIcon, NotificationType } from "./NotificationIcon";
import { NotificationBadge } from "./NotificationBadge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export interface NotificationData {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
}

interface NotificationItemProps {
  notification: NotificationData;
  isSelected?: boolean;
  onSelectionChange?: (id: string, selected: boolean) => void;
  onClick?: (id: string) => void;
  className?: string;
}

export const NotificationItem = ({
  notification,
  isSelected = false,
  onSelectionChange,
  onClick,
  className,
}: NotificationItemProps) => {
  const handleClick = () => {
    onClick?.(notification.id);
  };

  const handleSelectionChange = (checked: boolean) => {
    onSelectionChange?.(notification.id, checked);
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border transition-colors cursor-pointer",
        notification.isRead
          ? "bg-background hover:bg-accent/50"
          : "bg-blue-50/50 hover:bg-blue-50/80 border-blue-200/50",
        className
      )}
      onClick={handleClick}
    >
      <Checkbox
        checked={isSelected}
        onCheckedChange={handleSelectionChange}
        onClick={(e) => e.stopPropagation()}
        className="mt-1"
      />

      <NotificationIcon type={notification.type} className="mt-1" />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4
              className={cn(
                "text-sm leading-5 truncate",
                notification.isRead
                  ? "font-medium text-foreground"
                  : "font-semibold text-foreground"
              )}
            >
              {notification.title}
            </h4>
            <p className="text-sm text-muted-foreground mt-1 leading-5">
              {notification.description}
            </p>
            <span className="text-xs text-muted-foreground mt-2 block">
              {notification.timestamp}
            </span>
          </div>

          <NotificationBadge isRead={notification.isRead} />
        </div>
      </div>
    </div>
  );
};

export type { NotificationItemProps };
