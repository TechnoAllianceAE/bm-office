
import React from 'react';
import { MenuItem } from '@/config/sidebar-menu';
import { SidebarItem } from './SidebarItem';

interface SidebarCategoryProps {
  category: string;
  items: MenuItem[];
  onItemClick?: () => void;
}

export const SidebarCategory = ({ category, items, onItemClick }: SidebarCategoryProps) => {
  if (!items || items.length === 0) return null;
  
  return (
    <div className="space-y-1">
      <div className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {category}
      </div>
      {items.map((item, index) => (
        <SidebarItem 
          key={index} 
          item={item} 
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
};
