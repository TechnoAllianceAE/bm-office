
import React, { ReactNode } from 'react';
import { Card } from '@/components/common/Card';
import { cn } from '@/lib/utils';

interface DashboardWidgetProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
  animationDelay?: number;
}

export const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title,
  icon,
  children,
  className,
  footer,
  animationDelay,
}) => {
  return (
    <Card 
      className={cn("flex flex-col h-full", className)} 
      style={animationDelay !== undefined ? { animationDelay: `${animationDelay}ms` } : undefined}
    >
      <div className="px-5 py-4 flex items-center justify-between border-b">
        <h3 className="font-medium flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </h3>
      </div>
      
      <div className="flex-1 p-5">
        {children}
      </div>
      
      {footer && (
        <div className="px-5 py-3 bg-secondary/30 border-t">
          {footer}
        </div>
      )}
    </Card>
  );
};

export default DashboardWidget;
