import { Badge } from "@/components/atoms/Badge/Badge";
import { TableHeader } from "@/components/molecules/DataTable/DataTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Teacher = {
  avatar: string;
  email: string;
  hireDate: string;
  experience: number;
  subject: string;
  department: string;
  id: number;
  name: string;
  status: string;
};

export const TableCell = (teacher: Teacher, header: TableHeader) => {
  const {
    avatar,
    email,
    hireDate,
    experience,
    subject,
    department,
    name,
    status,
  } = teacher;
  switch (header.key) {
    case "teacher":
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
    case "subject":
      return (
        <Badge variant="outline" className="font-medium">
          {subject}
        </Badge>
      );
    case "department":
      return <span className="text-sm font-medium">{department}</span>;
    case "status":
      return (
        <Badge variant={status === "Active" ? "default" : "secondary"}>
          {status}
        </Badge>
      );
    case "experience":
      return <span className="text-sm">{experience} years</span>;
    default:
      return null;
  }
};
