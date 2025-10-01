import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormInput } from "@/components/molecules/FormInput/FormInput";
import { Checkbox } from "@/components/ui/checkbox";
import { FormModal } from "@/components/molecules/FormModal";
import { CreateSchoolAdminRequest } from "../types/school-admin.types";

const createSchoolAdminSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  position: z.string().min(1, "Position is required"),
  isActive: z.boolean().default(true),
});

type CreateSchoolAdminFormData = z.infer<typeof createSchoolAdminSchema>;

interface AddSchoolAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<CreateSchoolAdminRequest, "schoolId">) => Promise<void>;
}

export const AddSchoolAdminModal = ({
  isOpen,
  onClose,
  onSubmit,
}: AddSchoolAdminModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateSchoolAdminFormData>({
    resolver: zodResolver(createSchoolAdminSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      isActive: true,
    },
  });

  const handleFormSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    const data = form.getValues();
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      form.reset();
      onClose();
    } catch (error) {
      console.error("Error creating school admin:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add School Administrator"
      description="Add a new administrator to manage school operations."
      onSubmit={handleFormSubmit}
      submitLabel="Add Administrator"
      isSubmitting={isSubmitting}
      maxWidth="700px"
    >
      <Form {...form}>
        <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field, fieldState }) => (
                    <FormInput
                      label="First Name"
                      placeholder="Enter first name"
                      isRequired
                      error={fieldState.error?.message}
                      {...field}
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field, fieldState }) => (
                    <FormInput
                      label="Last Name"
                      placeholder="Enter last name"
                      isRequired
                      error={fieldState.error?.message}
                      {...field}
                    />
                  )}
                />
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormInput
                      label="Email"
                      type="email"
                      placeholder="admin@school.edu"
                      isRequired
                      error={fieldState.error?.message}
                      {...field}
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field, fieldState }) => (
                    <FormInput
                      label="Phone"
                      placeholder="+1 (555) 000-0000"
                      isRequired
                      error={fieldState.error?.message}
                      {...field}
                    />
                  )}
                />
              </div>

              {/* Position Field */}
              <FormField
                control={form.control}
                name="position"
                render={({ field, fieldState }) => (
                  <FormInput
                    label="Position"
                    placeholder="e.g., Principal, Vice Principal, Academic Director"
                    isRequired
                    error={fieldState.error?.message}
                    {...field}
                  />
                )}
              />

              {/* Active Status */}
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0 cursor-pointer">
                      Active Administrator
                    </FormLabel>
                  </FormItem>
                )}
              />
        </div>
      </Form>
    </FormModal>
  );
};
