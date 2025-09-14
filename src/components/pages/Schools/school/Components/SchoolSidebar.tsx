import { Card, CardContent, CardHeader } from "@/components/atoms/Card/Card";
import { Badge } from "@/components/atoms/Badge/Badge";
import { School } from "../../types/schools.types";
import { MapPin, Phone, Mail, Globe, Calendar, BookOpen } from "lucide-react";

interface SchoolSidebarProps {
  school: School;
}

export const SchoolSidebar = ({ school }: SchoolSidebarProps) => {
  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-4">
        <div className="flex flex-col items-center gap-3">
          {school.logoUrl ? (
            <img
              src={school.logoUrl}
              alt={school.nameEn}
              className="w-24 h-24 rounded-lg object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-3xl">
              {school.nameEn.substring(0, 2).toUpperCase()}
            </div>
          )}
          <div className="text-center">
            <h2 className="text-lg font-semibold">{school.nameEn}</h2>
            {school.nameAr && (
              <p className="text-sm text-muted-foreground mt-1" dir="rtl">
                {school.nameAr}
              </p>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Contact Information */}
        <div className="space-y-3 border-t pt-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Contact Information
          </h3>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">{school.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground break-all">
                  {school.email}
                </p>
              </div>
            </div>

            {school.website && (
              <div className="flex items-start gap-3">
                <Globe className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Website</p>
                  <a
                    href={school.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline break-all"
                  >
                    {school.website}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="space-y-3 border-t pt-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Address
          </h3>

          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="flex-1 space-y-1">
              <p className="text-sm">{school.address.address}</p>
              <p className="text-sm">{school.address.area}</p>
              <p className="text-sm">
                {school.address.city}, {school.address.country}
              </p>
              {school.address.coordinates && (
                <p className="text-xs text-muted-foreground mt-2">
                  Lat: {school.address.coordinates.lat}, Long:{" "}
                  {school.address.coordinates.long}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Education Systems */}
        <div className="space-y-3 border-t pt-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Education Systems
          </h3>

          <div className="flex items-start gap-3">
            <BookOpen className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              {school.educationSystemsIds.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {school.educationSystemsIds.map((id) => (
                    <Badge key={id} variant="secondary" className="text-xs">
                      System #{id}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No education systems assigned
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="space-y-3 border-t pt-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Information
          </h3>

          <div className="flex items-start gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="flex-1 space-y-1">
              <p className="text-sm">
                <span className="font-medium">Created:</span>{" "}
                {new Date(school.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="font-medium">Updated:</span>{" "}
                {new Date(school.updatedAt).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="font-medium">Status:</span>{" "}
                <Badge
                  variant={school.isDeleted ? "destructive" : "outline"}
                  className={`text-xs ml-1 ${!school.isDeleted ? "border-green-500 text-green-700 dark:text-green-400" : ""}`}
                >
                  {school.isDeleted ? "Deleted" : "Active"}
                </Badge>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
