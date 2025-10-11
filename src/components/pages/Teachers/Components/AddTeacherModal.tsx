import { useState } from "react";
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
import { Badge } from "@/components/atoms/Badge/Badge";
import { X, Plus } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { FormModal } from "@/components/molecules/FormModal";
import { FormSelect } from "@/components/molecules/FormSelect";
import { useClasses } from "../../Schools/school/Classes/hooks/useClasses";
import { CreateTeacherRequest } from "../types/teacher.types";

interface AddTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<CreateTeacherRequest, "schoolId">) => Promise<void>;
  schoolId: string;
}

const COMMON_SUBJECTS = [
  "Mathematics",
  "English",
  "Science",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "Computer Science",
  "Art",
  "Music",
  "Physical Education",
  "French",
  "Spanish",
  "Drama",
  "Economics",
  "Psychology",
  "Philosophy",
];

export const AddTeacherModal = ({
  isOpen,
  onClose,
  onSubmit,
  schoolId,
}: AddTeacherModalProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    isActive: true,
  });

  const [subjects, setSubjects] = useState<string[]>([]);
  const [selectedClassIds, setSelectedClassIds] = useState<string[]>([]);
  const [newSubject, setNewSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch available classes
  const {
    data: classes = [],
    isLoading: isClassesLoading,
    error: classesError,
  } = useClasses(schoolId);

  const handleSubmit = async () => {
    if (subjects.length === 0) {
      alert("Please add at least one subject");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        subjects,
        classIds: selectedClassIds,
      });

      // Show success toast
      toast.success("Teacher added successfully!");

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        isActive: true,
      });
      setSubjects([]);
      setSelectedClassIds([]);
      setNewSubject("");
      onClose();
    } catch (error) {
      console.error("Failed to create teacher:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSubject = () => {
    if (newSubject.trim() && !subjects.includes(newSubject.trim())) {
      setSubjects([...subjects, newSubject.trim()]);
      setNewSubject("");
    }
  };

  const removeSubject = (subjectToRemove: string) => {
    setSubjects(subjects.filter((subject) => subject !== subjectToRemove));
  };

  const addCommonSubject = (subject: string) => {
    if (!subjects.includes(subject)) {
      setSubjects([...subjects, subject]);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Teacher"
      description="Add a new teacher to the school with their subjects and class assignments."
      onSubmit={handleSubmit}
      submitLabel="Add Teacher"
      isSubmitting={isSubmitting}
    >
      {/* Personal Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
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
          <Label htmlFor="lastName">Last Name</Label>
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
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
          <Label htmlFor="phone">Phone</Label>
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

      {/* Class Assignment */}
      <FormSelect
        label="Assigned Classes"
        items={classes.map(cls => ({ value: cls.id, label: cls.name }))}
        selected={selectedClassIds}
        onSelected={setSelectedClassIds}
        placeholder="Select classes to assign..."
        isLoading={isClassesLoading}
        error={classesError?.message}
      />

      {/* Subjects */}
      <div>
        <Label>Subjects</Label>
        <div className="space-y-3">
          {/* Current subjects */}
          {subjects.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <Badge key={subject} variant="secondary" className="text-xs">
                  {subject}
                  <button
                    type="button"
                    onClick={() => removeSubject(subject)}
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Add custom subject */}
          <div className="flex gap-2">
            <Input
              placeholder="Add custom subject..."
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addSubject())
              }
            />
            <Button type="button" onClick={addSubject} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Common subjects */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Common subjects:
            </p>
            <div className="flex flex-wrap gap-1">
              {COMMON_SUBJECTS.filter(
                (subject) => !subjects.includes(subject)
              ).map((subject) => (
                <Button
                  key={subject}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => addCommonSubject(subject)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {subject}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

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
