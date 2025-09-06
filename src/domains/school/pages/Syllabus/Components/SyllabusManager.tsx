import { useState } from "react";
import { SyllabusUploader } from "./SyllabusUploader";
import { SyllabusTable, SyllabusFile } from "./SyllabusTable";
import { Button } from "@/components/atoms/Button/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock syllabus files data
const mockSyllabusFiles: SyllabusFile[] = [
  {
    id: "1",
    fileName: "Mathematics_Advanced_Syllabus_2024.pdf",
    subject: "Mathematics",
    class: "Grade 12 Advanced",
    uploadedBy: "Dr. Sarah Johnson",
    uploadedDate: new Date("2024-01-15"),
    effectiveDate: new Date("2024-02-01"),
    fileSize: 2456789,
    fileType: "pdf",
    status: "active",
  },
  {
    id: "2",
    fileName: "Physics_Fundamentals_Course_Outline.docx",
    subject: "Physics",
    class: "Grade 11",
    uploadedBy: "Prof. Michael Brown",
    uploadedDate: new Date("2024-01-10"),
    effectiveDate: new Date("2024-01-15"),
    fileSize: 1234567,
    fileType: "docx",
    status: "active",
  },
  {
    id: "3",
    fileName: "English_Literature_Curriculum.pdf",
    subject: "English",
    class: "Grade 10",
    uploadedBy: "Ms. Emily Davis",
    uploadedDate: new Date("2024-01-08"),
    effectiveDate: new Date("2024-01-20"),
    fileSize: 3456789,
    fileType: "pdf",
    status: "active",
  },
  {
    id: "4",
    fileName: "Chemistry_Lab_Manual_2024.pdf",
    subject: "Chemistry",
    class: "Grade 12",
    uploadedBy: "Mrs. Jennifer Lee",
    uploadedDate: new Date("2024-01-05"),
    effectiveDate: new Date("2024-01-10"),
    fileSize: 5678901,
    fileType: "pdf",
    status: "pending",
  },
  {
    id: "5",
    fileName: "World_History_Syllabus_2023.doc",
    subject: "History",
    class: "Grade 11",
    uploadedBy: "Dr. Robert Wilson",
    uploadedDate: new Date("2023-12-20"),
    effectiveDate: new Date("2024-01-01"),
    fileSize: 2345678,
    fileType: "doc",
    status: "archived",
  },
  {
    id: "6",
    fileName: "Art_Design_Course_Guide.pdf",
    subject: "Art",
    class: "Grade 9-12",
    uploadedBy: "Ms. Anna Garcia",
    uploadedDate: new Date("2024-01-12"),
    effectiveDate: new Date("2024-02-01"),
    fileSize: 4567890,
    fileType: "pdf",
    status: "active",
  },
];

interface SyllabusManagerProps {
  className?: string;
}

export const SyllabusManager = ({ className }: SyllabusManagerProps) => {
  const [files, setFiles] = useState<SyllabusFile[]>(mockSyllabusFiles);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("files");
  const { toast } = useToast();

  const handleUpload = async (uploadFiles: File[]) => {
    setIsUploadModalOpen(false);

    // Simulate upload process
    for (const file of uploadFiles) {
      try {
        // Simulate API upload delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newFile: SyllabusFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          fileName: file.name,
          subject: "General", // In a real app, this would be selected by user
          class: "General", // In a real app, this would be selected by user
          uploadedBy: "Current User",
          uploadedDate: new Date(),
          effectiveDate: new Date(),
          fileSize: file.size,
          fileType: file.name.split(".").pop() || "unknown",
          status: "pending",
        };

        setFiles((prev) => [newFile, ...prev]);

        toast({
          title: "Upload Successful",
          description: `${file.name} has been uploaded successfully.`,
        });
      } catch (error) {
        toast({
          title: "Upload Failed",
          description: `Failed to upload ${file.name}. Please try again.`,
          variant: "destructive",
        });
      }
    }
  };

  const handleDownload = (id: string) => {
    const file = files.find((f) => f.id === id);
    if (file) {
      // In a real app, this would download the actual file
      toast({
        title: "Download Started",
        description: `Downloading ${file.fileName}...`,
      });
    }
  };

  const handlePreview = (id: string) => {
    const file = files.find((f) => f.id === id);
    if (file) {
      // In a real app, this would open a preview modal or new tab
      toast({
        title: "Preview",
        description: `Opening preview for ${file.fileName}...`,
      });
    }
  };

  const handleDelete = (id: string) => {
    const file = files.find((f) => f.id === id);
    if (file) {
      setFiles((prev) => prev.filter((f) => f.id !== id));
      toast({
        title: "File Deleted",
        description: `${file.fileName} has been deleted successfully.`,
      });
    }
  };

  return (
    <div className={className}>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList className="grid w-full sm:w-auto grid-cols-2">
            <TabsTrigger value="files" className="gap-2">
              <FileText className="h-4 w-4" />
              Files
            </TabsTrigger>
            <TabsTrigger value="upload" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </TabsTrigger>
          </TabsList>

          <Button onClick={() => setIsUploadModalOpen(true)} className="gap-2">
            <Upload className="h-4 w-4" />
            Quick Upload
          </Button>
        </div>

        <TabsContent value="files" className="space-y-0">
          <SyllabusTable
            files={files}
            onDownload={handleDownload}
            onPreview={handlePreview}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="upload" className="space-y-0">
          <SyllabusUploader onUpload={handleUpload} />
        </TabsContent>
      </Tabs>

      {/* Upload Modal */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Syllabus Files
            </DialogTitle>
          </DialogHeader>

          <SyllabusUploader onUpload={handleUpload} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export type { SyllabusManagerProps };
