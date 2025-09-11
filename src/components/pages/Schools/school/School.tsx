import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SchoolSidebar } from "./Components/SchoolSidebar";
import { SchoolAdmins } from "./Components/SchoolAdmins";
import { SchoolTeachers } from "./Components/SchoolTeachers";
import { SchoolStudents } from "./Components/SchoolStudents";
import { useSchoolDetails } from "./apis/useSchoolDetails";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/atoms/Button/Button";
import { useNavigate } from "react-router-dom";

export const School = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setCustomLabel, clearCustomLabel } = useBreadcrumb();
  const { data: school, isLoading, error } = useSchoolDetails(id || "");

  // Set the school name in breadcrumb when data is loaded
  useEffect(() => {
    if (school) {
      setCustomLabel(`/schools/${id}`, school.nameEn);
    }
    
    // Clean up when component unmounts
    return () => {
      clearCustomLabel(`/schools/${id}`);
    };
  }, [school, id, setCustomLabel, clearCustomLabel]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading school details...</p>
        </div>
      </div>
    );
  }

  if (error || !school) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <p className="text-destructive mb-4">Failed to load school details</p>
          <Button onClick={() => navigate("/schools")} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Schools
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <SchoolSidebar school={school} />
        </div>

        {/* Tabs Content */}
        <div className="lg:col-span-9 space-y-6">
          <Tabs defaultValue="admins" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="admins">School Admins</TabsTrigger>
              <TabsTrigger value="teachers">Teachers</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
            </TabsList>

            <TabsContent value="admins" className="mt-6">
              <SchoolAdmins schoolId={school.id} />
            </TabsContent>

            <TabsContent value="teachers" className="mt-6">
              <SchoolTeachers schoolId={school.id} />
            </TabsContent>

            <TabsContent value="students" className="mt-6">
              <SchoolStudents schoolId={school.id} />
            </TabsContent>
          </Tabs>
        </div>
    </div>
  );
};