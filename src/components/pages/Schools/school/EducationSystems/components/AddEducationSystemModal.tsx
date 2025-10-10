import { useState, useEffect } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { FormModal } from "@/components/molecules/FormModal";
import { CreateEducationSystemRequest, UpdateEducationSystemRequest, EducationSystem } from "../types/educationSystem.types";

interface AddEducationSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateEducationSystemRequest | UpdateEducationSystemRequest) => Promise<void>;
  educationSystem?: EducationSystem | null;
  mode?: "create" | "edit";
}

export const AddEducationSystemModal = ({
  isOpen,
  onClose,
  onSubmit,
  educationSystem,
  mode = "create",
}: AddEducationSystemModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (mode === "edit" && educationSystem) {
      setFormData({
        name: educationSystem.name,
      });
    } else {
      setFormData({
        name: "",
      });
    }
  }, [mode, educationSystem]);

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Please enter a name for the education system");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);

      // Show success toast
      toast.success(
        mode === "create"
          ? "Education system created successfully!"
          : "Education system updated successfully!"
      );

      // Reset form
      setFormData({
        name: "",
      });
      onClose();
    } catch (error) {
      console.error("Failed to save education system:", error);
      toast.error(
        mode === "create"
          ? "Failed to create education system"
          : "Failed to update education system"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "create" ? "Add New Education System" : "Edit Education System"}
      description={
        mode === "create"
          ? "Create a new education system for the school."
          : "Update the education system information."
      }
      onSubmit={handleSubmit}
      submitLabel={mode === "create" ? "Add Education System" : "Update Education System"}
      isSubmitting={isSubmitting}
    >
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
          placeholder="Enter education system name"
        />
      </div>
    </FormModal>
  );
};