
import React from 'react';

interface DraggableItemProps {
  item: {
    id: string;
    name: string;
    icon: React.FC<{ className?: string }>;
    description: string;
  };
}

const DraggableItem = ({ item }: DraggableItemProps) => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div 
      className="p-2 rounded-md bg-white/50 dark:bg-gray-800/50 cursor-grab border border-white/30 hover:border-primary/30 transition-colors mb-2 flex items-center gap-2"
      draggable
      onDragStart={(e) => onDragStart(e, item.id)}
    >
      <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center text-primary">
        <item.icon className="h-3.5 w-3.5" />
      </div>
      <span className="text-sm">{item.name}</span>
    </div>
  );
};

export default DraggableItem;
