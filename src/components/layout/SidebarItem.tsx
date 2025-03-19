
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MenuItem } from '@/config/sidebar-menu';

interface SidebarItemProps {
  item: MenuItem;
  onItemClick?: () => void;
}

export const SidebarItem = ({ item, onItemClick }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;
  
  return (
    <Link
      to={item.path}
      className={cn(
        "group flex items-center space-x-2 rounded-md px-3.5 py-2 font-medium hover:bg-secondary hover:text-foreground",
        isActive ? "bg-secondary text-foreground" : "text-muted-foreground",
      )}
      onClick={onItemClick}
    >
      <item.icon className="h-4 w-4" />
      <span>{item.title}</span>
    </Link>
  );
};
