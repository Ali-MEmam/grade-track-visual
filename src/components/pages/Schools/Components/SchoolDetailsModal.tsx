import { School } from "../types/schools.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Button } from "@/components/atoms/Button/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  GraduationCap,
  Calendar,
  Award,
  Building,
  Edit,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SchoolDetailsModalProps {
  school: School | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (school: School) => void;
  className?: string;
}

export const SchoolDetailsModal = ({
  school,
  isOpen,
  onClose,
  onEdit,
  className,
}: SchoolDetailsModalProps) => {
  if (!school) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("max-w-3xl max-h-[85vh] overflow-y-auto", className)}>
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {school.logoUrl ? (
                <img 
                  src={school.logoUrl} 
                  alt={school.nameEn}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                  {school.nameEn.substring(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <DialogTitle className="text-2xl">{school.nameEn}</DialogTitle>
                {school.nameAr && (
                  <p className="text-lg text-muted-foreground mt-1" dir="rtl">{school.nameAr}</p>
                )}
                <DialogDescription className="mt-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                        <Award className="h-3 w-3 mr-1" />
                        {school.accreditation}
                      </Badge>
                    )}
                  </div>
                </DialogDescription>
              </div>
            </div>
            <div className="flex gap-2">
              {onEdit && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(school)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div>
              <h3 className="font-semibold mb-3">Location</h3>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p>{school.address.address}</p>
                  <p>{school.address.area}</p>
                  <p>{school.address.city}, {school.address.country}</p>
                  {school.address.coordinates && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Coordinates: {school.address.coordinates.lat}, {school.address.coordinates.long}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Education Systems</h3>
              <div className="flex flex-wrap gap-2">
                {school.educationSystemsIds.length > 0 ? (
                  school.educationSystemsIds.map(id => (
                    <Badge key={id} variant="outline">
                      System #{id}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No education systems assigned</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Metadata</h3>
              <div className="space-y-2 text-sm">
                <p>Created: {new Date(school.createdAt).toLocaleDateString()}</p>
                <p>Updated: {new Date(school.updatedAt).toLocaleDateString()}</p>
                <p>Status: {school.isDeleted ? 'Deleted' : 'Active'}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6 mt-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Statistics data not available</p>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6 mt-6">
            <div>
              <h3 className="font-semibold mb-3">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{school.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{school.email}</p>
                  </div>
                </div>
                {school.website && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Website</p>
                      <a 
                        href={school.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline"
                      >
                        {school.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Principal Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{school.principal.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{school.principal.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};