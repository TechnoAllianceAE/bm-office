
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Search, User, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const isMobile = useIsMobile();

  // Update page title based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setPageTitle('Dashboard');
    else if (path.includes('timesheet')) setPageTitle('Timesheet');
    else if (path.includes('projects')) setPageTitle('Projects');
    else if (path.includes('hr')) setPageTitle('HR Portal');
    else if (path.includes('directory')) setPageTitle('Employee Directory');
    else if (path.includes('email')) setPageTitle('Email');
    else if (path.includes('tools')) setPageTitle('Handy Tools');
    else if (path.includes('helpdesk')) setPageTitle('Help Desk');
    else if (path.includes('ai-workflow')) setPageTitle('AI Workflow');
    else if (path.includes('mis')) setPageTitle('MIS Dashboard');
    else if (path.includes('requisition')) setPageTitle('Requisition');
    else if (path.includes('crm')) setPageTitle('Customer Relationship Management');
    else if (path.includes('user-management')) setPageTitle('User Management');
    else setPageTitle('BM Enterprise');
  }, [location]);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 right-0 w-full z-40 transition-all duration-300 glassmorphic-navbar",
        isSidebarOpen ? "lg:pl-64" : "lg:pl-20",
        scrolled ? "shadow-sm" : ""
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-4">
          {isMobile && (
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
          <h1 className="text-xl font-semibold animate-fade-in">{pageTitle}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center h-9 w-64 rounded-full glassmorphic-input px-3 text-muted-foreground transition-all duration-300 focus-within:bg-white/70">
            <Search className="h-4 w-4 mr-2" />
            <input 
              type="search" 
              placeholder="Search..." 
              className="bg-transparent outline-none w-full text-sm" 
            />
          </div>
          
          <button className="relative p-2 rounded-full hover:bg-white/30 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <Link to="/profile" className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center overflow-hidden">
              <User className="h-4 w-4" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
