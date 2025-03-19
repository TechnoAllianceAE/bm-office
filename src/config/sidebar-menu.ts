
import { 
  Home, Calendar, User, Users, Settings, BookOpenCheck, 
  LayoutDashboard, ListChecks, FolderKanban, Mail, 
  BrainCircuit, FileSearch2, Package2, Activity, 
  HelpCircle, Shield, UserCog 
} from 'lucide-react';

export type MenuItem = {
  title: string;
  path: string;
  icon: React.ElementType;
  roles?: string[];
  category?: string;
};

// Sidebar menu configuration
export const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
    category: "Main"
  },
  {
    title: "Timesheet",
    path: "/timesheet",
    icon: ListChecks,
    category: "Main"
  },
  {
    title: "Projects",
    path: "/projects",
    icon: FolderKanban,
    category: "Main"
  },
  {
    title: "Calendar",
    path: "/calendar",
    icon: Calendar,
    category: "Main"
  },
  {
    title: "HR Portal",
    path: "/hr",
    icon: User,
    category: "Main"
  },
  {
    title: "Employee Directory",
    path: "/directory",
    icon: Users,
    category: "Main"
  },
  {
    title: "Mailbox",
    path: "/mailbox",
    icon: Mail,
    category: "Main"
  },
  {
    title: "AI Assistant",
    path: "/ai-assistant",
    icon: BrainCircuit,
    category: "Tools"
  },
  {
    title: "AI Workflow",
    path: "/ai-workflow",
    icon: Activity,
    category: "Tools"
  },
  {
    title: "DMS",
    path: "/dms",
    icon: FileSearch2,
    category: "Tools"
  },
  {
    title: "Handy Tools",
    path: "/tools",
    icon: Package2,
    category: "Tools"
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: Activity,
    category: "Tools"
  },
  {
    title: "MIS Dashboard",
    path: "/mis",
    icon: LayoutDashboard,
    category: "Tools"
  },
  {
    title: "Requisition",
    path: "/requisition",
    icon: Package2,
    category: "Tools"
  },
  {
    title: "Help Desk",
    path: "/helpdesk",
    icon: HelpCircle,
    category: "Tools"
  },
  {
    title: "LMS",
    path: "/lms",
    icon: BookOpenCheck,
    category: "Tools"
  },
  {
    title: "User Management",
    path: "/user-management",
    icon: UserCog,
    category: "System"
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
    category: "System"
  },
];

// Order for categories
export const categoryOrder = ["Main", "Tools", "System", "Other"];
