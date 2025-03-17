import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Clock, Briefcase, Users, FileText, Settings, ChevronLeft, ChevronRight, Calendar, BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
  { name: 'Calendar', path: '/calendar', icon: Calendar },
  { name: 'Directory', path: '/directory', icon: Users },
];

const secondaryNavItems: NavItem[] = [
  { name: 'HR Portal', path: '/hr', icon: FileText },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 h-full bg-sidebar z-50 transition-all duration-300 ease-in-out",
          "border-r border-sidebar-border flex flex-col",
          isOpen ? "w-64" : "w-20",
          "transform lg:transform-none",
          !isOpen && "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "h-16 flex items-center px-4 border-b border-sidebar-border transition-all duration-300",
          isOpen ? "justify-between" : "justify-center"
        )}>
          {isOpen ? (
            <>
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-lg font-bold">G</span>
                </div>
                <span className="font-semibold text-lg">GlobalHub</span>
              </Link>
              <button 
                onClick={toggleSidebar}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-sidebar-accent transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </>
          ) : (
            <button 
              onClick={toggleSidebar}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-sidebar-accent transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
        
        {/* Main navigation */}
        <nav className="flex-1 pt-4 overflow-y-auto">
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
          "border-t border-sidebar-border p-3 transition-all duration-300",
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
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <item.icon className={cn("flex-shrink-0", isOpen ? "mr-3 h-5 w-5" : "h-5 w-5")} />
      {isOpen && <span className="truncate">{item.name}</span>}
    </Link>
  );
};

export default Sidebar;
