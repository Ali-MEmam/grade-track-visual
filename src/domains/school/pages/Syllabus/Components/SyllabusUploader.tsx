import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/atoms/Card/Card";
import { Button } from "@/components/atoms/Button/Button";
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FileUpload {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "success" | "error";
  error?: string;
}

interface SyllabusUploaderProps {
  onUpload: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  className?: string;
}

export const SyllabusUploader = ({
  onUpload,
  maxFiles = 10,
  maxSize = 10,
  acceptedTypes = [".pdf", ".doc", ".docx", ".txt"],
  className,
}: SyllabusUploaderProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    handleFileSelection(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFileSelection(files);
  };

  const handleFileSelection = (files: File[]) => {
    const validFiles = files.filter((file) => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        return false;
      }

      // Check file type
      const extension = "." + file.name.split(".").pop()?.toLowerCase();
      if (!acceptedTypes.includes(extension || "")) {
        return false;
      }

      return true;
    });

    const limitedFiles = validFiles.slice(0, maxFiles - selectedFiles.length);
    setSelectedFiles((prev) => [...prev, ...limitedFiles]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      onUpload(selectedFiles);
      setSelectedFiles([]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Drop Zone */}
      <Card
        className={cn(
          "border-2 border-dashed transition-colors cursor-pointer",
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <Upload
            className={cn(
              "h-10 w-10 mb-4",
              isDragOver ? "text-primary" : "text-muted-foreground"
            )}
          />

          <h3 className="text-lg font-medium mb-2">
            {isDragOver ? "Drop files here" : "Upload Syllabus Files"}
          </h3>

          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop files here, or click to browse
          </p>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>Accepted formats: {acceptedTypes.join(", ")}</p>
            <p>Maximum file size: {maxSize}MB</p>
            <p>Maximum files: {maxFiles}</p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedTypes.join(",")}
            onChange={handleFileInput}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">
                Selected Files ({selectedFiles.length})
              </h4>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedFiles([])}
                >
                  Clear All
                </Button>
                <Button size="sm" onClick={handleUpload} className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Files
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <File className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="h-8 w-8 p-0 hover:bg-destructive/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export type { SyllabusUploaderProps };
