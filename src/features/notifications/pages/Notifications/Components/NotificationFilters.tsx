import { Button } from "@/components/atoms/Button/Button";
import { cn } from "@/lib/utils";

export type NotificationFilter = "all" | "unread" | "read";

interface NotificationFiltersProps {
  activeFilter: NotificationFilter;
  onFilterChange: (filter: NotificationFilter) => void;
  unreadCount?: number;
  className?: string;
}

const filterOptions: { value: NotificationFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "read", label: "Read" },
];

export const NotificationFilters = ({
  activeFilter,
  onFilterChange,
  unreadCount = 0,
  className,
}: NotificationFiltersProps) => {
  return (
    <div className={cn("flex gap-2", className)}>
      {filterOptions.map((option) => (
        <Button
          key={option.value}
          variant={activeFilter === option.value ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(option.value)}
          className="relative"
        >
          {option.label}
          {option.value === "unread" && unreadCount > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
};

export type { NotificationFiltersProps };
