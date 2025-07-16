import { SyllabusManager } from "./Components/SyllabusManager";

export const Syllabus = () => {
  return (
    <div className="space-y-6 lg:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
          Syllabus Management
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Upload, manage, and distribute course syllabi and curriculum documents
        </p>
      </div>

      {/* Syllabus Manager */}
      <SyllabusManager />
    </div>
  );
};
