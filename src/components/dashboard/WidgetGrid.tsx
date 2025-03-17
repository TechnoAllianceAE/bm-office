
import React, { ReactNode } from 'react';

interface WidgetGridProps {
  children: ReactNode;
}

export const WidgetGrid: React.FC<WidgetGridProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  );
};

export default WidgetGrid;
