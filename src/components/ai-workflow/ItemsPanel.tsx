
import React from 'react';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';
import DraggableItem from './DraggableItem';

interface ItemsPanelProps {
  title: string;
  items: Array<{
    id: string;
    name: string;
    icon: React.FC<{ className?: string }>;
    description: string;
  }>;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const ItemsPanel = ({ 
  title, 
  items, 
  searchValue, 
  onSearchChange 
}: ItemsPanelProps) => {
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Card className="page-content h-full p-4">
      <div className="mb-3">
        <h3 className="font-medium flex items-center gap-1 mb-2">
          <ArrowRight className="h-4 w-4 text-primary" />
          {title}
        </h3>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder={`Search ${title.toLowerCase()}...`} 
            className="pl-8 text-sm"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-1 overflow-y-auto max-h-[600px] pr-1">
        {filteredItems.map((item) => (
          <div key={item.id} className="mb-2">
            <DraggableItem item={item} />
          </div>
        ))}
        {filteredItems.length === 0 && (
          <div className="text-center p-4 text-muted-foreground text-sm">
            No {title.toLowerCase()} match your search
          </div>
        )}
      </div>
    </Card>
  );
};

export default ItemsPanel;
