import { Card, CardContent, CardHeader } from "@/components/atoms/Card/Card";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Button } from "@/components/atoms/Button/Button";
import { Plus, UserCog, Mail, Phone, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SchoolAdminsProps {
  schoolId: string;
}

// Mock data for demonstration
const mockAdmins = [
  {
    id: "1",
    name: "Dr. Sarah Williams",
    role: "Principal",
    email: "s.williams@school.edu",
    phone: "+1 (555) 123-4567",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahWilliams",
    status: "active",
    joinedDate: "2020-01-15",
  },
  {
    id: "2",
    name: "Mr. James Thompson",
    role: "Vice Principal",
    email: "j.thompson@school.edu",
    phone: "+1 (555) 234-5678",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JamesThompson",
    status: "active",
    joinedDate: "2021-03-22",
  },
  {
    id: "3",
    name: "Ms. Emily Johnson",
    role: "Academic Director",
    email: "e.johnson@school.edu",
    phone: "+1 (555) 345-6789",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=EmilyJohnson",
    status: "active",
    joinedDate: "2019-08-10",
  },
];

export const SchoolAdmins = ({ schoolId }: SchoolAdminsProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">School Administrators</h2>
          <p className="text-sm text-muted-foreground">
            Manage school administrative staff and their roles
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Admin
        </Button>
      </div>

      {/* Admins List */}
      <div className="grid gap-4">
        {mockAdmins.map((admin) => (
          <Card key={admin.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <img
                    src={admin.avatar}
                    alt={admin.name}
                    className="w-12 h-12 rounded-full"
                  />
                  
                  {/* Info */}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{admin.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {admin.role}
                      </Badge>
                      <Badge 
                        variant={admin.status === "active" ? "success" : "destructive"}
                        className="text-xs"
                      >
                        {admin.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        <span>{admin.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span>{admin.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UserCog className="h-3 w-3" />
                        <span>Since {new Date(admin.joinedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Admin</DropdownMenuItem>
                    <DropdownMenuItem>Change Role</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Remove Admin
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {mockAdmins.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <UserCog className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Administrators</h3>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              No administrators have been assigned to this school yet. Add administrators to manage the school.
            </p>
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Add First Admin
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};