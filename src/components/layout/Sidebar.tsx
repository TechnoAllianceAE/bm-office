
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Clock, Briefcase, Users, FileText, Settings, ChevronLeft, ChevronRight, Calendar, BarChart3,
  Sparkles, Database, Wrench, Building, ShoppingCart, LayoutDashboard, HeartHandshake, Share2, Mail,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

type NavItem = {
  name: string;
  path: string;
  icon: React.ElementType;
};

const mainNavItems: NavItem[] = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Timesheet', path: '/timesheet', icon: Clock },
  { name: 'Projects', path: '/projects', icon: Briefcase },
  { name: 'BM HR', path: '/hr', icon: FileText },
  { name: 'Calendar', path: '/calendar', icon: Calendar },
  { name: 'Email', path: '/email', icon: Mail },
  { name: 'AI Assistant', path: '/ai-assistant', icon: Sparkles },
  { name: 'AI Workflow', path: '/ai-workflow', icon: Share2 },
  { name: 'DMS', path: '/dms', icon: Database },
  { name: 'MIS', path: '/mis', icon: LayoutDashboard },
  { name: 'Requisition', path: '/requisition', icon: ShoppingCart },
  { name: 'HelpDesk', path: '/helpdesk', icon: HeartHandshake },
  { name: 'Claims', path: '/claims', icon: FileText },
];

const secondaryNavItems: NavItem[] = [
  { name: 'Directory', path: '/directory', icon: Users },
  { name: 'LMS', path: '/lms', icon: GraduationCap },
  { name: 'Utilities', path: '/tools', icon: Wrench },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar with glassmorphism */}
      <aside 
        className={cn(
          "fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-in-out",
          "sidebar-glassmorphism",
          isOpen ? "w-64" : "w-20",
          "transform",
          isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "h-16 flex items-center px-4 border-b border-white/30 transition-all duration-300",
          isOpen ? "justify-between" : "justify-center"
        )}>
          {isOpen ? (
            <>
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                  <Building className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-semibold text-lg">BM Office</span>
              </Link>
              <button 
                onClick={toggleSidebar}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="flex items-center justify-center">
                <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                  <Building className="h-5 w-5 text-primary-foreground" />
                </div>
              </Link>
              {!isMobile && (
                <button 
                  onClick={toggleSidebar}
                  className="absolute -right-3 top-7 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 z-10"
                >
                  <ChevronRight className="h-3 w-3" />
                </button>
              )}
            </>
          )}
        </div>
        
        {/* Main navigation - Make scrollable */}
        <nav className="flex-1 pt-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <div className="px-3 mb-6">
            {mainNavItems.map((item, index) => (
              <NavItem 
                key={item.path}
                item={item}
                isActive={location.pathname === item.path}
                isOpen={isOpen}
                animationDelay={index * 50}
              />
            ))}
          </div>
          
          <div className="px-3">
            {isOpen && <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground px-3 mb-2">System</div>}
            {secondaryNavItems.map((item, index) => (
              <NavItem 
                key={item.path}
                item={item}
                isActive={location.pathname === item.path}
                isOpen={isOpen}
                animationDelay={(mainNavItems.length + index) * 50}
              />
            ))}
          </div>
        </nav>
        
        {/* User profile */}
        <div className={cn(
          "border-t border-white/30 p-3 transition-all duration-300",
          isOpen ? "flex items-center space-x-3" : "flex flex-col items-center"
        )}>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Users className="h-5 w-5" />
          </div>
          {isOpen && (
            <div className="min-w-0">
              <p className="font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">Product Manager</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

interface NavItemProps {
  item: NavItem;
  isActive: boolean;
  isOpen: boolean;
  animationDelay: number;
}

const NavItem: React.FC<NavItemProps> = ({ item, isActive, isOpen, animationDelay }) => {
  return (
    <Link
      to={item.path}
      className={cn(
        "flex items-center h-10 rounded-md mb-1 transition-all duration-200",
        isOpen ? "px-3" : "justify-center",
        isActive 
          ? "bg-white/30 backdrop-blur-sm font-medium"
          : "text-sidebar-foreground hover:bg-white/20 hover:text-sidebar-accent-foreground"
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <item.icon className={cn("flex-shrink-0", isOpen ? "mr-3 h-5 w-5" : "h-5 w-5")} />
      {isOpen && <span className="truncate">{item.name}</span>}
    </Link>
  );
};

export default Sidebar;
