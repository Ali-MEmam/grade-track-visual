import { useState, useEffect } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/components/ui/sonner";
import { FormModal } from "@/components/molecules/FormModal";
import { FormSelect } from "@/components/molecules/FormSelect";
import { useClasses } from "../../Schools/school/Classes/hooks/useClasses";
import { useEducationLevels } from "../../EducationLevels/hooks/useEducationLevels";
import { useEducationSystems } from "../../EducationSystems/hooks/useEducationSystems";
import { Student, UpdateStudentRequest } from "../types/student.types";

interface EditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateStudentRequest) => Promise<void>;
  student: Student;
  schoolId: string;
}

export const EditStudentModal = ({
  isOpen,
  onClose,
  onSubmit,
  student,
  schoolId,
}: EditStudentModalProps) => {
  const [formData, setFormData] = useState({
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    phone: student.phone,
    address: student.address,
    dateOfBirth: new Date(student.dateOfBirth),
    enrollmentDate: new Date(student.enrollmentDate),
    classId: student.classId,
    educationLevelId: student.educationLevelId,
    educationSystemId: student.educationSystemId,
    isActive: student.isActive,
  });

  const [selectedClassIds, setSelectedClassIds] = useState<string[]>([student.classId]);
  const [selectedEducationLevels, setSelectedEducationLevels] = useState<string[]>(
    student.educationLevelId !== 0 ? [student.educationLevelId.toString()] : []
  );
  const [selectedEducationSystems, setSelectedEducationSystems] = useState<string[]>(
    student.educationSystemId !== 0 ? [student.educationSystemId.toString()] : []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch available data
  const {
    data: classes = [],
    isLoading: isClassesLoading,
    error: classesError,
  } = useClasses(schoolId);

  const {
    data: educationLevels = [],
    isLoading: isEducationLevelsLoading,
    error: educationLevelsError,
  } = useEducationLevels();

  const {
    data: educationSystems = [],
    isLoading: isEducationSystemsLoading,
    error: educationSystemsError,
  } = useEducationSystems();

  // Update form data when student prop changes
  useEffect(() => {
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phone: student.phone,
      address: student.address,
      dateOfBirth: new Date(student.dateOfBirth),
      enrollmentDate: new Date(student.enrollmentDate),
      classId: student.classId,
      educationLevelId: student.educationLevelId,
      educationSystemId: student.educationSystemId,
      isActive: student.isActive,
    });
    setSelectedClassIds([student.classId]);
    setSelectedEducationLevels(
      student.educationLevelId !== 0 ? [student.educationLevelId.toString()] : []
    );
    setSelectedEducationSystems(
      student.educationSystemId !== 0 ? [student.educationSystemId.toString()] : []
    );
  }, [student]);

  const handleSubmit = async () => {
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.dateOfBirth || !formData.enrollmentDate) {
      toast.error("Please select date of birth and enrollment date");
      return;
    }

    if (selectedClassIds.length === 0) {
      toast.error("Please select at least one class");
      return;
    }

    setIsSubmitting(true);
    try {
      // Format dates to ISO 8601 with proper UTC handling
      const dateOfBirth = formData.dateOfBirth!;
      const enrollmentDate = formData.enrollmentDate!;

      // Create dates at midnight UTC to avoid timezone issues
      const dobISO = new Date(Date.UTC(
        dateOfBirth.getFullYear(),
        dateOfBirth.getMonth(),
        dateOfBirth.getDate()
      )).toISOString();

      const enrollmentISO = new Date(Date.UTC(
        enrollmentDate.getFullYear(),
        enrollmentDate.getMonth(),
        enrollmentDate.getDate()
      )).toISOString();

      await onSubmit({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        dateOfBirth: dobISO,
        enrollmentDate: enrollmentISO,
        schoolId: schoolId,
        classId: selectedClassIds[0], // Use first selected class
        educationLevelId: selectedEducationLevels.length > 0 ? parseInt(selectedEducationLevels[0]) : 0,
        educationSystemId: selectedEducationSystems.length > 0 ? parseInt(selectedEducationSystems[0]) : 0,
        isActive: formData.isActive,
      });

      // Show success toast
      toast.success("Student updated successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to update student:", error);
      toast.error("Failed to update student. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Student"
      description="Update student information and enrollment details."
      onSubmit={handleSubmit}
      submitLabel="Update Student"
      isSubmitting={isSubmitting}
    >
      {/* Personal Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            required
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
        </div>
      </div>

      {/* Address Information */}
      <div className="space-y-4">
        <Label>Address Information</Label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              placeholder="Street Address"
              value={formData.address.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, address: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Input
              placeholder="City"
              value={formData.address.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, city: e.target.value },
                })
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              placeholder="Area"
              value={formData.address.area}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, area: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Input
              placeholder="Country"
              value={formData.address.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, country: e.target.value },
                })
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              placeholder="Latitude (optional)"
              value={formData.address.coordinates?.lat || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    coordinates: {
                      ...formData.address.coordinates,
                      lat: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
          <div>
            <Input
              placeholder="Longitude (optional)"
              value={formData.address.coordinates?.long || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    coordinates: {
                      ...formData.address.coordinates,
                      long: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Date Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Date of Birth *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.dateOfBirth}
                onSelect={(date) =>
                  date && setFormData({ ...formData, dateOfBirth: date })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label>Enrollment Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.enrollmentDate ? format(formData.enrollmentDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.enrollmentDate}
                onSelect={(date) =>
                  date && setFormData({ ...formData, enrollmentDate: date })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Class Assignment */}
      <FormSelect
        label="Assigned Class"
        items={classes.map((cls) => ({ value: cls.id, label: cls.name }))}
        selected={selectedClassIds}
        onSelected={setSelectedClassIds}
        placeholder="Select a class..."
        isRequired
        isLoading={isClassesLoading}
        error={classesError?.message}
      />

      {/* Education Level Dropdown */}
      <FormSelect
        label="Education Level"
        items={educationLevels.map((level) => ({
          value: level.id.toString(),
          label: level.name,
        }))}
        selected={selectedEducationLevels}
        onSelected={setSelectedEducationLevels}
        placeholder="Select education level (optional)"
        isLoading={isEducationLevelsLoading}
        error={educationLevelsError?.message}
        info="Leave empty to send default value (0)"
      />

      {/* Education System Dropdown */}
      <FormSelect
        label="Education System"
        items={educationSystems.map((system) => ({
          value: system.id.toString(),
          label: system.name,
        }))}
        selected={selectedEducationSystems}
        onSelected={setSelectedEducationSystems}
        placeholder="Select education system (optional)"
        isLoading={isEducationSystemsLoading}
        error={educationSystemsError?.message}
        info="Leave empty to send default value (0)"
      />

      {/* Status */}
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.isActive ? "active" : "inactive"}
          onValueChange={(value) =>
            setFormData({ ...formData, isActive: value === "active" })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </FormModal>
  );
};
