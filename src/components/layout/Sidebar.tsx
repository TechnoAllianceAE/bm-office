
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Calendar, User, Users, Settings, BookOpenCheck, LayoutDashboard, ListChecks, FolderKanban, Mail, BrainCircuit, FileSearch2, Package2, Activity, HelpCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

type MenuItem = {
  title: string;
  path: string;
  icon: React.ElementType;
  roles?: string[];
};

// Add a new menu item for User Management
const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Timesheet",
    path: "/timesheet",
    icon: ListChecks,
  },
  {
    title: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Calendar",
    path: "/calendar",
    icon: Calendar,
  },
  {
    title: "HR Portal",
    path: "/hr",
    icon: User,
  },
  {
    title: "Employee Directory",
    path: "/directory",
    icon: Users,
  },
  {
    title: "Mailbox",
    path: "/mailbox",
    icon: Mail,
  },
  {
    title: "AI Assistant",
    path: "/ai-assistant",
    icon: BrainCircuit,
  },
  {
    title: "AI Workflow",
    path: "/ai-workflow",
    icon: Activity,
  },
  {
    title: "DMS",
    path: "/dms",
    icon: FileSearch2,
  },
  {
    title: "Handy Tools",
    path: "/tools",
    icon: Package2,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: Activity,
  },
  {
    title: "MIS Dashboard",
    path: "/mis",
    icon: LayoutDashboard,
  },
  {
    title: "Requisition",
    path: "/requisition",
    icon: Package2,
  },
  {
    title: "Help Desk",
    path: "/helpdesk",
    icon: HelpCircle,
  },
  {
    title: "LMS",
    path: "/lms",
    icon: BookOpenCheck,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    title: "User Management",
    path: "/user-management",
    icon: Users,
    roles: ["Super Admin", "Admin"], // Only admins can access
  },
];

export const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { userRole } = useAuth(); // Add this to get the user's role
  
  const handleToggleSidebar = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };
  
  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => 
    !item.roles || item.roles.includes(userRole || "")
  );
  
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 flex h-full w-64 flex-col overflow-y-auto border-r border-r-white/5 bg-background transition-all duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}
    >
      <div className="flex h-16 shrink-0 items-center px-4">
        <Link to="/" className="font-semibold text-2xl">
          BM Office
        </Link>
      </div>
      
      <nav className="flex flex-1 flex-col space-y-1 p-2">
        {filteredMenuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={cn(
              "group flex items-center space-x-2 rounded-md px-3.5 py-2 font-medium hover:bg-secondary hover:text-foreground",
              location.pathname === item.path ? "bg-secondary text-foreground" : "text-muted-foreground",
            )}
            onClick={handleToggleSidebar}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
