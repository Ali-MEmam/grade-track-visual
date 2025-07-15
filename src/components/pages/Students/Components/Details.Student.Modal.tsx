import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

export const StudentDetails = ({ student }: { student: any }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-4">
      <Avatar className="w-16 h-16">
        <AvatarImage src={student.avatar} alt={student.name} />
        <AvatarFallback>
          {student.name
            .split(" ")
            .map((n: string) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div>
        <h3 className="text-lg font-semibold">{student.name}</h3>
        <p className="text-muted-foreground">{student.email}</p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label className="text-sm font-medium">Grade</Label>
        <p className="text-sm">{student.grade}</p>
      </div>
      <div>
        <Label className="text-sm font-medium">Status</Label>
        <Badge variant={student.status === "Active" ? "default" : "secondary"}>
          {student.status}
        </Badge>
      </div>
      <div>
        <Label className="text-sm font-medium">GPA</Label>
        <p className="text-sm">{student.gpa}</p>
      </div>
      <div>
        <Label className="text-sm font-medium">Enrollment Date</Label>
        <p className="text-sm">{student.enrollmentDate}</p>
      </div>
    </div>
  </div>
);
