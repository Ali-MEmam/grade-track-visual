import { useState, useEffect } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { FormModal } from "@/components/molecules/FormModal";
import { CreateEducationLevelRequest, UpdateEducationLevelRequest, EducationLevel } from "../types/educationLevel.types";

interface AddEducationLevelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateEducationLevelRequest | UpdateEducationLevelRequest) => Promise<void>;
  educationLevel?: EducationLevel | null;
  mode?: "create" | "edit";
}

export const AddEducationLevelModal = ({
  isOpen,
  onClose,
  onSubmit,
  educationLevel,
  mode = "create",
}: AddEducationLevelModalProps) => {
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (mode === "edit" && educationLevel) {
      setFormData({
        id: parseInt(educationLevel.id),
        name: educationLevel.name,
      });
    } else {
      setFormData({
        id: 0,
        name: "",
      });
    }
  }, [mode, educationLevel]);

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Please enter a name for the education level");
      return;
    }

    if (mode === "create" && formData.id === 0) {
      toast.error("Please enter a valid ID for the education level");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);

      // Show success toast
      toast.success(
        mode === "create"
          ? "Education level created successfully!"
          : "Education level updated successfully!"
      );

      // Reset form
      setFormData({
        id: 0,
        name: "",
      });
      onClose();
    } catch (error) {
      console.error("Failed to save education level:", error);
      toast.error(
        mode === "create"
          ? "Failed to create education level"
          : "Failed to update education level"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "create" ? "Add New Education Level" : "Edit Education Level"}
      description={
        mode === "create"
          ? "Create a new education level for the system."
          : "Update the education level information."
      }
      onSubmit={handleSubmit}
      submitLabel={mode === "create" ? "Add Education Level" : "Update Education Level"}
      isSubmitting={isSubmitting}
    >
      {mode === "create" && (
        <div>
          <Label htmlFor="levelId">Level ID</Label>
          <Input
            id="levelId"
            type="number"
            value={formData.id}
            onChange={(e) =>
              setFormData({ ...formData, id: parseInt(e.target.value) || 0 })
            }
            required
            placeholder="Enter level ID (e.g., 1, 2, 3...)"
          />
        </div>
      )}

      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
          placeholder="Enter education level name"
        />
      </div>
    </FormModal>
  );
};
