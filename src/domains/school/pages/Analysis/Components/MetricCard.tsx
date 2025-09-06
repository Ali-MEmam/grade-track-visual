import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import { Badge } from "@/components/atoms/Badge/Badge";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
    type: "increase" | "decrease" | "neutral";
  };
  className?: string;
  loading?: boolean;
}

export const MetricCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  loading = false,
}: MetricCardProps) => {
  if (loading) {
    return (
      <Card className={cn("animate-pulse", className)}>
        <CardHeader className="pb-2">
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="h-8 bg-muted rounded w-1/2"></div>
          <div className="h-3 bg-muted rounded w-full"></div>
        </CardContent>
      </Card>
    );
  }

  const getTrendIcon = () => {
    if (trend?.type === "increase") return TrendingUp;
    if (trend?.type === "decrease") return TrendingDown;
    return null;
  };

  const getTrendColor = () => {
    switch (trend?.type) {
      case "increase":
        return "text-green-600";
      case "decrease":
        return "text-red-600";
      default:
        return "text-muted-foreground";
    }
  };

  const TrendIcon = getTrendIcon();

  return (
    <Card className={cn("transition-all hover:shadow-md", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm font-medium text-muted-foreground">
          <span>{title}</span>
          {Icon && <Icon className="h-4 w-4" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-2xl font-bold text-foreground">{value}</div>

        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}

        {trend && (
          <div className="flex items-center gap-1">
            {TrendIcon && (
              <TrendIcon className={cn("h-3 w-3", getTrendColor())} />
            )}
            <span className={cn("text-xs font-medium", getTrendColor())}>
              {trend.value}% {trend.label}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export type { MetricCardProps };
