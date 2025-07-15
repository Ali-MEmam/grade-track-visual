import { Badge, BadgeProps } from "@/components/atoms/Badge/Badge";
import { cn } from "@/lib/utils";

interface NotificationBadgeProps extends Omit<BadgeProps, "variant"> {
  isRead: boolean;
}

export const NotificationBadge = ({
  isRead,
  className,
  ...props
}: NotificationBadgeProps) => {
  if (isRead) {
    return null;
  }

  return (
    <Badge
      variant="default"
      className={cn(
        "h-2 w-2 p-0 bg-blue-500 hover:bg-blue-600 rounded-full",
        className
      )}
      {...props}
    />
  );
};

export type { NotificationBadgeProps };
