import { Badge } from "@/components/atoms/Badge/Badge";
import { TableHeader } from "@/components/molecules/DataTable/DataTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Student = {
  avatar: string;
  email: string;
  enrollmentDate: string;
  gpa: string;
  grade: string;
  id: number;
  name: string;
  status: string;
};

export const TableCell = (student: Student, header: TableHeader) => {
  const { avatar, email, enrollmentDate, gpa, grade, name, status } = student;
  switch (header.key) {
    case "student":
      return (
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-sm text-muted-foreground">{email}</div>
          </div>
        </div>
      );
    case "grade":
      return grade;
    case "status":
      return (
        <Badge variant={status === "Active" ? "default" : "secondary"}>
          {status}
        </Badge>
      );
    case "gpa":
      return gpa;
    case "enrollmentDate":
      return enrollmentDate;
    default:
      return null;
  }
};
