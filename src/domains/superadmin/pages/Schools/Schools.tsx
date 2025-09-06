import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/Card/Card';
import { Button } from '@/components/atoms/Button/Button';
import { Input } from '@/components/ui/input';
import { 
  Building, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MoreVertical,
  Users,
  GraduationCap,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/atoms/Badge/Badge';

interface School {
  id: string;
  name: string;
  code: string;
  adminEmail: string;
  studentCount: number;
  teacherCount: number;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
}

export const SuperAdminSchools: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data - would come from API
  const schools: School[] = [
    {
      id: '1',
      name: 'Lincoln High School',
      code: 'LHS001',
      adminEmail: 'admin@lincoln.edu',
      studentCount: 450,
      teacherCount: 32,
      status: 'active',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Jefferson Academy',
      code: 'JFA002',
      adminEmail: 'admin@jefferson.edu',
      studentCount: 320,
      teacherCount: 24,
      status: 'active',
      createdAt: '2024-02-20',
    },
    {
      id: '3',
      name: 'Washington Elementary',
      code: 'WES003',
      adminEmail: 'admin@washington.edu',
      studentCount: 280,
      teacherCount: 18,
      status: 'inactive',
      createdAt: '2024-03-10',
    },
  ];

  const getStatusIcon = (status: School['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inactive':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'suspended':
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: School['status']) => {
    const variants = {
      active: 'default' as const,
      inactive: 'secondary' as const,
      suspended: 'destructive' as const,
    };
    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.adminEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Schools Management</h1>
          <p className="text-muted-foreground">Manage all registered schools in the system</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New School
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Schools</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search schools..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSchools.map((school) => (
              <div
                key={school.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{school.name}</h3>
                      {getStatusBadge(school.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Code: {school.code} • Admin: {school.adminEmail}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {school.studentCount} students
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-3 w-3" />
                        {school.teacherCount} teachers
                      </span>
                      <span>
                        Added {new Date(school.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        View Reports
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {school.status === 'active' ? 'Deactivate' : 'Activate'}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete School
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};