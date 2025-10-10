import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Label } from "@/components/ui/label";
import { Student } from "../types/student.types";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  BookOpen,
} from "lucide-react";

interface StudentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
}

export const StudentDetailsModal = ({
  isOpen,
  onClose,
  student,
}: StudentDetailsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Student Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Student Header */}
          <div className="flex items-start gap-4 pb-4 border-b">
            <img
              src={student.avatar}
              alt={student.fullName}
              className="w-20 h-20 rounded-full"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{student.fullName}</h3>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  variant={student.isActive ? "outline" : "destructive"}
                  className={
                    student.isActive
                      ? "border-green-500 text-green-700 dark:text-green-400"
                      : ""
                  }
                >
                  {student.isActive ? "Active" : "Inactive"}
                </Badge>
                <Badge variant="outline">{student.classId}</Badge>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">First Name</Label>
                <p className="font-medium">{student.firstName}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Last Name</Label>
                <p className="font-medium">{student.lastName}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Date of Birth</Label>
                <p className="font-medium">
                  {new Date(student.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Enrollment Date</Label>
                <p className="font-medium">
                  {new Date(student.enrollmentDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contact Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  Email
                </Label>
                <p className="font-medium">{student.email}</p>
              </div>
              <div>
                <Label className="text-muted-foreground flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  Phone
                </Label>
                <p className="font-medium">{student.phone}</p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Address Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {student.address.address && (
                <div>
                  <Label className="text-muted-foreground">Street Address</Label>
                  <p className="font-medium">{student.address.address}</p>
                </div>
              )}
              {student.address.area && (
                <div>
                  <Label className="text-muted-foreground">Area</Label>
                  <p className="font-medium">{student.address.area}</p>
                </div>
              )}
              {student.address.city && (
                <div>
                  <Label className="text-muted-foreground">City</Label>
                  <p className="font-medium">{student.address.city}</p>
                </div>
              )}
              {student.address.country && (
                <div>
                  <Label className="text-muted-foreground">Country</Label>
                  <p className="font-medium">{student.address.country}</p>
                </div>
              )}
            </div>
            {student.address.coordinates?.lat && student.address.coordinates?.long && (
              <div>
                <Label className="text-muted-foreground">Coordinates</Label>
                <p className="font-medium text-sm">
                  Lat: {student.address.coordinates.lat}, Long: {student.address.coordinates.long}
                </p>
              </div>
            )}
          </div>

          {/* Academic Information */}
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Academic Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Class ID</Label>
                <p className="font-medium">{student.classId}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">School ID</Label>
                <p className="font-medium">{student.schoolId}</p>
              </div>
              <div>
                <Label className="text-muted-foreground flex items-center gap-2">
                  <BookOpen className="h-3 w-3" />
                  Education Level ID
                </Label>
                <p className="font-medium">
                  {student.educationLevelId !== 0
                    ? student.educationLevelId
                    : "Not specified"}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground flex items-center gap-2">
                  <GraduationCap className="h-3 w-3" />
                  Education System ID
                </Label>
                <p className="font-medium">
                  {student.educationSystemId !== 0
                    ? student.educationSystemId
                    : "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="space-y-4 pt-4 border-t">
            <h4 className="font-semibold flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Record Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Created At</Label>
                <p className="font-medium text-sm">
                  {new Date(student.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Last Updated</Label>
                <p className="font-medium text-sm">
                  {new Date(student.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
