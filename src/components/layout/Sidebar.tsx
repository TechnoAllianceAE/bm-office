
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { menuItems, categoryOrder } from '@/config/sidebar-menu';
import { SidebarCategory } from './SidebarCategory';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const isMobile = useIsMobile();
  
  // TEMPORARILY REMOVED ROLE CHECKS
  // const { userRole } = useAuth();
  
  const handleToggleSidebar = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };
  
  // Display all menu items without role filtering
  const filteredMenuItems = menuItems;
  
  // Group menu items by category
  const groupedMenuItems = filteredMenuItems.reduce<Record<string, typeof menuItems>>((acc, item) => {
    const category = item.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});
  
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
        {categoryOrder.map(category => (
          <SidebarCategory 
            key={category}
            category={category}
            items={groupedMenuItems[category] || []}
            onItemClick={handleToggleSidebar}
          />
        ))}
      </nav>
    </aside>
  );
};
