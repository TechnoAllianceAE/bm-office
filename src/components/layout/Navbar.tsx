
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  isSidebarOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [pageTitle, setPageTitle] = useState('Dashboard');

  // Update page title based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setPageTitle('Dashboard');
    else if (path.includes('timesheet')) setPageTitle('Timesheet');
    else if (path.includes('projects')) setPageTitle('Projects');
    else if (path.includes('hr')) setPageTitle('HR Portal');
    else if (path.includes('directory')) setPageTitle('Employee Directory');
    else setPageTitle('GlobalHub');
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
        "fixed top-0 right-0 w-full z-40 transition-all duration-300",
        isSidebarOpen ? "lg:pl-64" : "lg:pl-20",
        scrolled ? "bg-white/70 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold animate-fade-in">{pageTitle}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center h-9 w-64 rounded-full bg-secondary/80 px-3 text-muted-foreground transition-all duration-300 hover:bg-secondary focus-within:bg-secondary">
            <Search className="h-4 w-4 mr-2" />
            <input 
              type="search" 
              placeholder="Search..." 
              className="bg-transparent outline-none w-full text-sm" 
            />
          </div>
          
          <button className="relative p-2 rounded-full hover:bg-secondary transition-colors">
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
