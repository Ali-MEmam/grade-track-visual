import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/atoms/Button/Button";
import { Loader2, Plus } from "lucide-react";
import { CreateSchoolRequest } from "../types/schools.types";

const createSchoolSchema = z.object({
  nameEn: z.string().min(1, "English name is required"),
  nameAr: z.string().min(1, "Arabic name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  area: z.string().min(1, "Area is required"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  educationSystemsIds: z.array(z.number()).default([]),
  logoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type CreateSchoolFormData = z.infer<typeof createSchoolSchema>;

interface CreateSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateSchoolRequest) => Promise<void>;
}

export const CreateSchoolModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateSchoolModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateSchoolFormData>({
    resolver: zodResolver(createSchoolSchema),
    defaultValues: {
      nameEn: "",
      nameAr: "",
      address: "",
      city: "",
      country: "",
      area: "",
      latitude: "",
      longitude: "",
      phone: "",
      email: "",
      website: "",
      educationSystemsIds: [],
      logoUrl: "",
    },
  });

  const handleSubmit = async (data: CreateSchoolFormData) => {
    try {
      setIsSubmitting(true);
      const submitData: CreateSchoolRequest = {
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        address: data.address,
        city: data.city,
        country: data.country,
        area: data.area,
        phone: data.phone,
        email: data.email,
        educationSystemsIds: data.educationSystemsIds,
        website: data.website || undefined,
        logoUrl: data.logoUrl || undefined,
        latitude: data.latitude || undefined,
        longitude: data.longitude || undefined,
      };
      await onSubmit(submitData);
      form.reset();
      onClose();
    } catch (error) {
      console.error("Error creating school:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Create New School</DialogTitle>
          <DialogDescription>
            Add a new school to the educational network
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col flex-1 overflow-hidden">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-4">
              <div className="space-y-6">
                {/* Name Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nameEn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name (English) *</FormLabel>
                        <FormControl>
                          <Input placeholder="School name in English" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nameAr"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name (Arabic) *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="اسم المدرسة بالعربية" 
                            dir="rtl"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Divider */}
                <div className="border-t" />

                {/* Address Section */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Education Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Area *</FormLabel>
                          <FormControl>
                            <Input placeholder="District/Area" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country *</FormLabel>
                          <FormControl>
                            <Input placeholder="Country" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="latitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Latitude (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 40.7128" {...field} />
                          </FormControl>
                          <FormDescription>
                            GPS latitude coordinate
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="longitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Longitude (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., -74.0060" {...field} />
                          </FormControl>
                          <FormDescription>
                            GPS longitude coordinate
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t" />

                {/* Contact Information */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone *</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="info@school.edu" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://www.school.edu" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Divider */}
                <div className="border-t" />

                {/* Additional Information */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="logoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Logo URL (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://example.com/logo.png" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          URL to the school's logo image
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="educationSystemsIds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Education System IDs</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter comma-separated IDs (e.g., 1,2,3)" 
                            onChange={(e) => {
                              const value = e.target.value;
                              const ids = value
                                .split(',')
                                .map(id => parseInt(id.trim()))
                                .filter(id => !isNaN(id));
                              field.onChange(ids);
                            }}
                            value={field.value.join(',')}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter education system IDs separated by commas
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Sticky Footer */}
            <div className="border-t px-6 py-4 bg-background">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="w-full"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Create School
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};