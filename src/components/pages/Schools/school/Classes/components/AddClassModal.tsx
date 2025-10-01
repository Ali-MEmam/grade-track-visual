import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { FormModal } from "@/components/molecules/FormModal";
import { CreateClassRequest } from "../types/class.types";

interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<CreateClassRequest, 'schoolId'>) => Promise<void>;
}

export const AddClassModal = ({ isOpen, onClose, onSubmit }: AddClassModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert("Please enter a class name");
      return;
    }
    if (!formData.description.trim()) {
      alert("Please enter a class description");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        name: formData.name.trim(),
        description: formData.description.trim(),
      });
      
      // Show success toast
      toast.success("Class created successfully!");
      
      // Reset form
      setFormData({
        name: "",
        description: "",
      });
      onClose();
    } catch (error) {
      console.error("Failed to create class:", error);
      toast.error("Failed to create class. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Class"
      description="Create a new class for this school."
      onSubmit={handleSubmit}
      submitLabel="Create Class"
      isSubmitting={isSubmitting}
    >
      <div className="space-y-4">
        {/* Class Name */}
        <div>
          <Label htmlFor="className">Class Name</Label>
          <Input
            id="className"
            placeholder="e.g., Mathematics Grade 10, Physics Advanced"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        {/* Class Description */}
        <div>
          <Label htmlFor="classDescription">Description</Label>
          <Textarea
            id="classDescription"
            placeholder="Describe the class content, objectives, or any important details..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            required
          />
        </div>
      </div>
    </FormModal>
  );
};