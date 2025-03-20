
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Activity, Clock, Briefcase, Receipt, Users, 
  LineChart, UserPlus, BarChart, Settings, ChevronLeft, ChevronRight, Menu,
  Bot, FileText, Wrench,ListChecks, Mail, UserRound,HelpCircle, BookOpenCheck, ClipboardList,
  Calendar, Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Clock, label: 'Timesheet', path: '/timesheet' },
  { icon: Briefcase, label: 'Projects', path: '/projects' },
  { icon: UserRound, label: 'Directory', path: '/directory' },
  { icon: Bot, label: 'AI Assistant', path: '/ai-assistant' },
  { icon: Activity, label: 'Workflow', path: '/ai-workflow' },
  { icon: FileText, label: 'Documents', path: '/document-manager' },
  { icon: Wrench, label: 'Utilities', path: '/handy-tools' },
  { icon: Users, label: 'HR Portal', path: '/hr' },
  { icon: UserPlus, label: 'Referrals', path: '/referrals' },
  { icon: ListChecks, label: 'Claims', path: '/claims' },
  { icon: BookOpenCheck, label: 'eLearning', path: '/lms' },
  { icon: UserPlus, label: 'HelpDesk', path: '/helpdesk' },
  { icon: Mail, label: 'Mail Box', path: '/mailbox' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: ClipboardList, label: 'Requisition', path: '/requisition' },
  { icon: LineChart, label: 'MIS', path: '/mis' },
  { icon: BarChart, label: 'Analytics', path: '/analytics' },
  { icon: HelpCircle, label: 'User management', path: '/usermanagement' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const AppSidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const handleNavigation = () => {
    if (isMobile) {
      setCollapsed(true);
    }
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {!collapsed && isMobile && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setCollapsed(true)}
        />
      )}
      
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full glass-panel border-r",
          "flex flex-col transition-all duration-300",
          collapsed ? "w-[80px]" : "w-[280px]"
        )}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="rounded-md bg-primary p-1.5 shrink-0">
              <img 
                src="/lovable-uploads/05305298-8812-4b79-9e2e-0f8fa2dc1d97.png" 
                alt="BM Office Logo" 
                width="24" 
                height="24" 
                className="h-6 w-6"
              />
            </div>
            {!collapsed && (
              <span className="font-display text-lg font-semibold whitespace-nowrap">BM Office</span>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8 shrink-0"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        
        <Separator className="bg-white/20 dark:bg-gray-800/20" />
        
        <div className="flex-1 overflow-y-auto py-3 px-3">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavigation}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                    "hover:bg-white/30 dark:hover:bg-gray-800/30 group relative",
                    isActive ? "bg-white/40 dark:bg-gray-800/40 text-primary font-medium" : "text-foreground",
                    collapsed && "justify-center px-2"
                  )}
                >
                  {isActive && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                    />
                  )}
                  <item.icon className={cn(
                    "h-5 w-5 shrink-0",
                    isActive ? "text-primary" : "text-foreground"
                  )} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
        
        {!collapsed && (
          <div className="mt-auto border-t border-white/20 dark:border-gray-800/20 p-3">
            <div className="flex items-center gap-3 rounded-lg p-2">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">Product Manager</span>
              </div>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="mt-auto border-t border-white/20 dark:border-gray-800/20 p-3 flex justify-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        )}
      </aside>

      {isMobile && collapsed && (
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-4 z-50 rounded-full shadow-md glass-panel"
          onClick={() => setCollapsed(false)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
    </>
  );
};

export default AppSidebar;
