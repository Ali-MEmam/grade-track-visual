import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SchoolSidebar } from "./Components/SchoolSidebar";
import { SchoolAdmins } from "./SchoolAdmin/SchoolAdmins";
import { Teachers } from "./Teachers/Teachers";
import { Classes } from "./Classes/Classes";
import { Students } from "./Students/Students";
import { EducationLevels } from "./EducationLevels/EducationLevels";
import { EducationSystems } from "./EducationSystems/EducationSystems";
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
  const [activeTab, setActiveTab] = useState("admins");

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

  const renderContent = () => {
    switch (activeTab) {
      case "admins":
        return <SchoolAdmins schoolId={school.id} />;
      case "teachers":
        return <Teachers schoolId={school.id} />;
      case "classes":
        return <Classes schoolId={school.id} />;
      case "students":
        return <Students schoolId={school.id} />;
      case "education-levels":
        return <EducationLevels schoolId={school.id} />;
      case "education-systems":
        return <EducationSystems schoolId={school.id} />;
      default:
        return <SchoolAdmins schoolId={school.id} />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-3">
        <SchoolSidebar 
          school={school} 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Content */}
      <div className="lg:col-span-9">
        {renderContent()}
      </div>
    </div>
  );
};
