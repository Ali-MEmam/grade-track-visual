import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

export const TeacherDetails = ({ teacher }: { teacher: any }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-4">
      <Avatar className="w-16 h-16">
        <AvatarImage src={teacher.avatar} alt={teacher.name} />
        <AvatarFallback>
          {teacher.name
            .split(" ")
            .map((n: string) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div>
        <h3 className="text-lg font-semibold">{teacher.name}</h3>
        <p className="text-muted-foreground">{teacher.email}</p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label className="text-sm font-medium">Subject</Label>
        <p className="text-sm">{teacher.subject}</p>
      </div>
      <div>
        <Label className="text-sm font-medium">Department</Label>
        <p className="text-sm">{teacher.department}</p>
      </div>
      <div>
        <Label className="text-sm font-medium">Status</Label>
        <Badge variant={teacher.status === "Active" ? "default" : "secondary"}>
          {teacher.status}
        </Badge>
      </div>
      <div>
        <Label className="text-sm font-medium">Experience</Label>
        <p className="text-sm">{teacher.experience} years</p>
      </div>
      <div className="col-span-2">
        <Label className="text-sm font-medium">Hire Date</Label>
        <p className="text-sm">{teacher.hireDate}</p>
      </div>
    </div>
  </div>
);
