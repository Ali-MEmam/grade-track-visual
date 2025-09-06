import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import { NotificationItem, NotificationData } from "./NotificationItem";
import { NotificationFilters, NotificationFilter } from "./NotificationFilters";
import { BulkActions } from "./BulkActions";
import { Pagination } from "@/components/molecules/Pagination/Pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/atoms/Button/Button";
import { useToast } from "@/hooks/use-toast";

interface NotificationsListProps {
  notifications: NotificationData[];
  onNotificationUpdate: (
    id: string,
    updates: Partial<NotificationData>
  ) => void;
  onNotificationDelete: (ids: string[]) => void;
  className?: string;
}

const ITEMS_PER_PAGE = 10;

export const NotificationsList = ({
  notifications,
  onNotificationUpdate,
  onNotificationDelete,
  className,
}: NotificationsListProps) => {
  const [currentFilter, setCurrentFilter] = useState<NotificationFilter>("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();

  // Filter notifications based on current filter
  const filteredNotifications = useMemo(() => {
    switch (currentFilter) {
      case "unread":
        return notifications.filter((n) => !n.isRead);
      case "read":
        return notifications.filter((n) => n.isRead);
      default:
        return notifications;
    }
  }, [notifications, currentFilter]);

  // Group notifications by date
  const groupedNotifications = useMemo(() => {
    const groups: { [date: string]: NotificationData[] } = {};

    filteredNotifications.forEach((notification) => {
      const date = new Date(notification.timestamp).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(notification);
    });

    return Object.entries(groups).sort(
      ([a], [b]) => new Date(b).getTime() - new Date(a).getTime()
    );
  }, [filteredNotifications]);

  // Pagination
  const totalItems = filteredNotifications.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Get current page notifications
  const currentPageNotifications = filteredNotifications.slice(
    startIndex,
    endIndex
  );

  // Unread count
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleFilterChange = (filter: NotificationFilter) => {
    setCurrentFilter(filter);
    setCurrentPage(1);
    setSelectedIds(new Set());
  };

  const handleSelectionChange = (id: string, selected: boolean) => {
    const newSelected = new Set(selectedIds);
    if (selected) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedIds(newSelected);
  };

  const handleSelectAll = () => {
    const allIds = new Set(currentPageNotifications.map((n) => n.id));
    setSelectedIds(allIds);
  };

  const handleDeselectAll = () => {
    setSelectedIds(new Set());
  };

  const handleMarkAllAsRead = () => {
    selectedIds.forEach((id) => {
      onNotificationUpdate(id, { isRead: true });
    });
    setSelectedIds(new Set());
    toast({
      title: "Success",
      description: `Marked ${selectedIds.size} notifications as read.`,
    });
  };

  const handleDeleteSelected = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    onNotificationDelete(Array.from(selectedIds));
    setSelectedIds(new Set());
    setShowDeleteDialog(false);
    toast({
      title: "Success",
      description: `Deleted ${selectedIds.size} notifications.`,
    });
  };

  const handleNotificationClick = (id: string) => {
    const notification = notifications.find((n) => n.id === id);
    if (notification && !notification.isRead) {
      onNotificationUpdate(id, { isRead: true });
    }
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-lg font-semibold">
              Notifications ({totalItems})
            </CardTitle>
            <NotificationFilters
              activeFilter={currentFilter}
              onFilterChange={handleFilterChange}
              unreadCount={unreadCount}
            />
          </div>

          {totalItems > 0 && (
            <BulkActions
              selectedCount={selectedIds.size}
              totalCount={currentPageNotifications.length}
              onMarkAllAsRead={handleMarkAllAsRead}
              onDeleteSelected={handleDeleteSelected}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
            />
          )}
        </CardHeader>

        <CardContent className="p-0">
          {totalItems === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              {currentFilter === "all"
                ? "No notifications yet."
                : `No ${currentFilter} notifications.`}
            </div>
          ) : (
            <>
              {groupedNotifications.map(([date, dayNotifications]) => {
                const visibleNotifications = dayNotifications.filter(
                  (_, index) => {
                    const globalIndex = filteredNotifications.indexOf(
                      dayNotifications[index]
                    );
                    return globalIndex >= startIndex && globalIndex < endIndex;
                  }
                );

                if (visibleNotifications.length === 0) return null;

                return (
                  <div key={date} className="border-b last:border-b-0">
                    <div className="px-6 py-3 bg-muted/50 border-b">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        {date === new Date().toDateString() ? "Today" : date}
                      </h3>
                    </div>
                    <div className="divide-y">
                      {visibleNotifications.map((notification) => (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                          isSelected={selectedIds.has(notification.id)}
                          onSelectionChange={handleSelectionChange}
                          onClick={handleNotificationClick}
                          className="border-none"
                        />
                      ))}
                    </div>
                  </div>
                );
              })}

              {totalPages > 1 && (
                <div className="p-6 border-t">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Notifications</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedIds.size} notification
              {selectedIds.size === 1 ? "" : "s"}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export type { NotificationsListProps };
