# Dual Authentication System Design

## 🎯 System Overview

### Authentication Personas
```
┌─────────────────────────────────────────────┐
│                 SYSTEM ACCESS                │
├─────────────────────────────────────────────┤
│                                              │
│  ┌──────────────┐      ┌─────────────────┐  │
│  │  SUPERADMIN  │      │     SCHOOL      │  │
│  └──────┬───────┘      └────────┬────────┘  │
│         │                        │           │
│    ┌────▼────┐             ┌────▼────┐      │
│    │ Manages │             │ Manages │      │
│    │ Schools │             │Students │      │
│    └─────────┘             │Teachers │      │
│                            └─────────┘      │
└─────────────────────────────────────────────┘
```

### Core Principles (DRY, KISS, YAGNI)
- **DRY**: Shared components in atomic design, reusable hooks
- **KISS**: Simple role-based routing, clear separation of concerns
- **YAGNI**: Build only required features for School/SuperAdmin

## 📁 New Folder Structure

```
src/
├── components/
│   ├── atoms/              # Shared atomic components
│   ├── molecules/          # Shared molecular components
│   ├── organisms/          # Shared complex components
│   ├── templates/          # Layout templates
│   └── ui/                 # Shadcn components
│
├── domains/               # Domain-specific logic
│   ├── superadmin/
│   │   ├── pages/
│   │   │   ├── Dashboard/
│   │   │   ├── Schools/
│   │   │   │   ├── Schools.tsx
│   │   │   │   ├── components/
│   │   │   │   └── hooks/
│   │   │   ├── Reports/
│   │   │   └── Settings/
│   │   ├── components/    # SuperAdmin-specific components
│   │   ├── services/       # SuperAdmin API services
│   │   ├── hooks/          # SuperAdmin hooks
│   │   └── types/          # SuperAdmin types
│   │
│   └── school/
│       ├── pages/
│       │   ├── Dashboard/
│       │   ├── Students/
│       │   ├── Teachers/
│       │   ├── Classes/
│       │   ├── Syllabus/
│       │   ├── Calendar/
│       │   └── Settings/
│       ├── components/     # School-specific components
│       ├── services/       # School API services
│       ├── hooks/          # School hooks
│       └── types/          # School types
│
├── features/              # Shared features
│   ├── auth/
│   │   ├── pages/
│   │   │   ├── Login/
│   │   │   │   ├── Login.tsx
│   │   │   │   ├── components/
│   │   │   │   │   ├── LoginToggle.tsx
│   │   │   │   │   ├── SchoolLoginForm.tsx
│   │   │   │   │   └── SuperAdminLoginForm.tsx
│   │   │   │   └── hooks/
│   │   │   └── Register/
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── school-auth.service.ts
│   │   │   └── superadmin-auth.service.ts
│   │   ├── hooks/
│   │   └── types/
│   │
│   └── common/            # Shared business logic
│       ├── notifications/
│       └── analytics/
│
├── contexts/
│   ├── AuthContext.tsx    # Base auth context
│   ├── SchoolContext.tsx  # School-specific context
│   └── SuperAdminContext.tsx # SuperAdmin context
│
├── routes/
│   ├── Routes.tsx         # Main router
│   ├── SchoolRoutes.tsx   # School-specific routes
│   ├── SuperAdminRoutes.tsx # SuperAdmin routes
│   └── guards/
│       ├── PrivateRoute.tsx
│       ├── SchoolRoute.tsx
│       └── SuperAdminRoute.tsx
│
└── lib/
    ├── api/
    │   ├── endpoints/
    │   │   ├── school.endpoints.ts
    │   │   └── superadmin.endpoints.ts
    │   └── interceptors/
    └── utils/
```

## 🔐 Authentication Flow Design

### Login Page with Toggle
```typescript
interface LoginPageState {
  loginType: 'school' | 'superadmin';
  credentials: {
    email: string;
    password: string;
    schoolCode?: string; // Only for school login
  };
}
```

### Authentication Flow
```
┌──────────────┐     ┌─────────────────┐     ┌──────────────┐
│  Login Page  │────▶│  Toggle Switch  │────▶│  Login Form  │
└──────────────┘     └─────────────────┘     └──────┬───────┘
                                                      │
                            ┌─────────────────────────┴─────────────────────┐
                            │                                               │
                    ┌───────▼────────┐                           ┌─────────▼──────────┐
                    │  School Login  │                           │ SuperAdmin Login   │
                    └───────┬────────┘                           └─────────┬──────────┘
                            │                                               │
                    ┌───────▼────────┐                           ┌─────────▼──────────┐
                    │ /api/school/   │                           │ /api/superadmin/   │
                    │     login      │                           │       login        │
                    └───────┬────────┘                           └─────────┬──────────┘
                            │                                               │
                    ┌───────▼────────┐                           ┌─────────▼──────────┐
                    │ School Context │                           │SuperAdmin Context  │
                    └───────┬────────┘                           └─────────┬──────────┘
                            │                                               │
                    ┌───────▼────────┐                           ┌─────────▼──────────┐
                    │School Dashboard│                           │SuperAdmin Dashboard│
                    └────────────────┘                           └────────────────────┘
```

## 🏗️ Component Architecture

### Shared Components (Atomic Design)
```
atoms/
├── Button/
├── Input/
├── Card/
├── Badge/
└── Select/

molecules/
├── FormField/
├── StatCard/
├── NavigationItem/
└── DataTable/

organisms/
├── Header/
├── Footer/
├── Charts/
└── Forms/
```

### Domain-Specific Components
```
domains/superadmin/components/
├── SchoolCard/
├── SchoolList/
├── SchoolMetrics/
└── SchoolManagement/

domains/school/components/
├── StudentCard/
├── TeacherList/
├── ClassSchedule/
└── GradeEntry/
```

## 📊 Type System Design

### Base Types
```typescript
// Base User Type
interface BaseUser {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Authentication Types
type AuthType = 'school' | 'superadmin';

interface AuthState {
  isAuthenticated: boolean;
  authType: AuthType | null;
  user: SchoolUser | SuperAdminUser | null;
  tokens: {
    access: string;
    refresh: string;
  } | null;
}
```

### School Types
```typescript
interface SchoolUser extends BaseUser {
  type: 'school';
  schoolId: string;
  schoolName: string;
  role: 'admin' | 'teacher' | 'staff';
  permissions: SchoolPermission[];
}

interface School {
  id: string;
  name: string;
  code: string;
  address: string;
  adminEmail: string;
  studentCount: number;
  teacherCount: number;
  status: 'active' | 'inactive' | 'suspended';
}
```

### SuperAdmin Types
```typescript
interface SuperAdminUser extends BaseUser {
  type: 'superadmin';
  level: 'full' | 'read' | 'support';
  permissions: SuperAdminPermission[];
}

interface SuperAdminPermission {
  resource: 'schools' | 'reports' | 'settings' | 'billing';
  actions: ('create' | 'read' | 'update' | 'delete')[];
}
```

## 🚀 API Structure

### Endpoint Organization
```
/api/
├── /auth/
│   ├── /school/
│   │   ├── POST /login
│   │   ├── POST /register
│   │   └── POST /refresh
│   └── /superadmin/
│       ├── POST /login
│       └── POST /refresh
│
├── /school/
│   ├── GET    /dashboard
│   ├── GET    /students
│   ├── POST   /students
│   ├── GET    /teachers
│   └── POST   /teachers
│
└── /superadmin/
    ├── GET    /dashboard
    ├── GET    /schools
    ├── POST   /schools
    ├── PUT    /schools/:id
    └── DELETE /schools/:id
```

## 🎨 UI Components Design

### Login Toggle Component
```typescript
interface LoginToggleProps {
  value: 'school' | 'superadmin';
  onChange: (value: 'school' | 'superadmin') => void;
}

// Visual Design
// ┌─────────────────────────────────┐
// │         Login Portal            │
// │                                 │
// │  ┌─────────┐  ┌──────────────┐ │
// │  │ School  │  │  SuperAdmin  │ │
// │  └─────────┘  └──────────────┘ │
// │                                 │
// │  [Selected Form Shows Here]    │
// └─────────────────────────────────┘
```

### Navigation Structure
```typescript
// School Navigation
const schoolNavItems = [
  { icon: Home, label: 'Dashboard', path: '/school/dashboard' },
  { icon: Users, label: 'Students', path: '/school/students' },
  { icon: GraduationCap, label: 'Teachers', path: '/school/teachers' },
  { icon: BookOpen, label: 'Classes', path: '/school/classes' },
  { icon: Calendar, label: 'Calendar', path: '/school/calendar' },
];

// SuperAdmin Navigation
const superAdminNavItems = [
  { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Building, label: 'Schools', path: '/admin/schools' },
  { icon: ChartBar, label: 'Reports', path: '/admin/reports' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];
```

## 🔄 State Management

### Context Hierarchy
```
App
├── AuthProvider (Base authentication)
│   ├── SchoolProvider (School-specific state)
│   │   └── SchoolRoutes
│   └── SuperAdminProvider (SuperAdmin state)
│       └── SuperAdminRoutes
```

### Route Guards Implementation
```typescript
// SchoolRoute Guard
const SchoolRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { authType, isAuthenticated } = useAuth();
  
  if (!isAuthenticated || authType !== 'school') {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

// SuperAdminRoute Guard
const SuperAdminRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { authType, isAuthenticated } = useAuth();
  
  if (!isAuthenticated || authType !== 'superadmin') {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};
```

## 📝 Implementation Plan

### Phase 1: Authentication Infrastructure
1. Create dual authentication types
2. Implement login toggle component
3. Update auth context for dual support
4. Create separate auth services

### Phase 2: Folder Restructuring
1. Create domains folder structure
2. Move existing components to appropriate domains
3. Create shared features folder
4. Update import paths

### Phase 3: Routing & Navigation
1. Implement separate route files
2. Create route guards for each persona
3. Update navigation components
4. Implement role-based redirects

### Phase 4: UI Implementation
1. Create login toggle UI
2. Build separate dashboards
3. Implement domain-specific components
4. Update existing components for compatibility

### Phase 5: Testing & Validation
1. Test authentication flows
2. Validate route guards
3. Test component isolation
4. Verify permission boundaries

## 🔍 Migration Strategy

### From Current to New Structure
```bash
# Current
src/components/pages/Students/

# New
src/domains/school/pages/Students/

# Shared components remain in
src/components/atoms/
src/components/molecules/
src/components/organisms/
```

### Import Path Updates
```typescript
// Before
import { StudentList } from '@/components/pages/Students/Components/StudentList';

// After
import { StudentList } from '@/domains/school/pages/Students/components/StudentList';
```

## 🛡️ Security Considerations

1. **Token Isolation**: Separate token storage for different auth types
2. **Permission Boundaries**: Strict API endpoint separation
3. **Context Isolation**: No cross-context data access
4. **Route Protection**: Multiple layers of route guards
5. **API Validation**: Server-side role validation

## 📈 Benefits of This Design

1. **Clear Separation**: School and SuperAdmin logic completely isolated
2. **Scalability**: Easy to add new domains or auth types
3. **Maintainability**: Clear folder structure and naming conventions
4. **Type Safety**: Strong TypeScript definitions for each domain
5. **Reusability**: Shared atomic components across domains
6. **Security**: Clear permission boundaries and isolated contexts