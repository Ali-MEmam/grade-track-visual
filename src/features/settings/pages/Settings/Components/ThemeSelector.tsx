import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import { Button } from "@/components/atoms/Button/Button";
import { Label } from "@/components/ui/label";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export type Theme = "light" | "dark" | "system";

interface ThemeSelectorProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  className?: string;
}

const themeOptions = [
  {
    value: "light" as const,
    label: "Light",
    description: "Light mode with bright colors",
    icon: Sun,
  },
  {
    value: "dark" as const,
    label: "Dark",
    description: "Dark mode with muted colors",
    icon: Moon,
  },
  {
    value: "system" as const,
    label: "System",
    description: "Follow system preference",
    icon: Monitor,
  },
];

export const ThemeSelector = ({
  theme,
  onThemeChange,
  className,
}: ThemeSelectorProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Monitor className="h-5 w-5" />
          Theme Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Choose your preferred theme
          </Label>
          <div className="grid gap-3">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Button
                  key={option.value}
                  variant={theme === option.value ? "default" : "outline"}
                  className={cn(
                    "justify-start h-auto p-4 space-y-1",
                    theme === option.value && "ring-2 ring-ring ring-offset-2"
                  )}
                  onClick={() => onThemeChange(option.value)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <Icon className="h-5 w-5 shrink-0" />
                    <div className="text-left space-y-1">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {option.description}
                      </div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Theme changes will be applied immediately and remembered for future
            sessions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export type { ThemeSelectorProps };
