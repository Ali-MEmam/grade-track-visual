import { AnalyticsDashboard } from "./Components/AnalyticsDashboard";

export const Analysis = () => {
  return (
    <div className="space-y-6 lg:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
          Analytics
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Comprehensive performance insights and data analysis for your school
        </p>
      </div>

      {/* Analytics Dashboard */}
      <AnalyticsDashboard />
    </div>
  );
};
