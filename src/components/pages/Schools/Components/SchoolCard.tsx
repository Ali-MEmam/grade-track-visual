import { Card, CardContent, CardHeader } from "@/components/atoms/Card/Card";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Button } from "@/components/atoms/Button/Button";
import { School } from "../types/schools.types";
import { 
  MapPin, 
  Users, 
  GraduationCap, 
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface SchoolCardProps {
  school: School;
  onView: (school: School) => void;
  onEdit: (school: School) => void;
  onDelete: (school: School) => void;
  className?: string;
}

export const SchoolCard = ({
  school,
  onView,
  onEdit,
  onDelete,
  className,
}: SchoolCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/schools/${school.id}`);
  };

  return (
    <Card 
      className={cn(
        "group hover:shadow-hover transition-all duration-300 animate-scale-in cursor-pointer",
        className
      )}
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {school.logoUrl ? (
              <img 
                src={school.logoUrl} 
                alt={school.nameEn}
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                {school.nameEn.substring(0, 2).toUpperCase()}
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-base">{school.nameEn}</h3>
              {school.nameAr && (
                <p className="text-sm text-muted-foreground" dir="rtl">{school.nameAr}</p>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={(e) => { 
                e.stopPropagation(); 
                navigate(`/schools/${school.id}`);
              }}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(school); }}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={(e) => { e.stopPropagation(); onDelete(school); }}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="truncate">
              {school.address.area}, {school.address.city}
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>{school.address.country}</p>
          </div>
        </div>

        <div className="pt-2 border-t space-y-1">
          <p className="text-sm text-muted-foreground">Contact</p>
          <p className="text-sm font-medium truncate">{school.email}</p>
          <p className="text-sm">{school.phone}</p>
        </div>

        {school.website && (
          <div className="pt-2">
            <a 
              href={school.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-sm text-primary hover:underline truncate block"
            >
              {school.website}
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};