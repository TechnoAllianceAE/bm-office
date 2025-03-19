import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Calendar, User, Users, Settings, BookOpenCheck, LayoutDashboard, ListChecks, FolderKanban, Mail, BrainCircuit, FileSearch2, Package2, Activity, HelpCircle, Shield, UserCog } from 'lucide-react';
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
  category?: string;
};

// Add a new category for system-related items
const menuItems: MenuItem[] = [
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

export const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { userRole } = useAuth();
  
  const handleToggleSidebar = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };
  
  // Filter menu items - now all items will be visible as we removed role restrictions from User Management
  const filteredMenuItems = menuItems;
  
  // Group menu items by category
  const groupedMenuItems = filteredMenuItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
    const category = item.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  // Order for categories
  const categoryOrder = ["Main", "Tools", "System", "Other"];
  
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
      
      <nav className="flex flex-1 flex-col space-y-4 p-2">
        {categoryOrder.map(category => {
          const items = groupedMenuItems[category];
          if (!items || items.length === 0) return null;
          
          return (
            <div key={category} className="space-y-1">
              <div className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {category}
              </div>
              {items.map((item, index) => (
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
            </div>
          );
        })}
      </nav>
    </aside>
  );
};
