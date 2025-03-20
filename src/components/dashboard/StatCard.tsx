
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  change?: {
    value: string;
    positive: boolean;
  };
  color: string;
  index?: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon: Icon, 
  title, 
  value, 
  change, 
  color,
  index = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden hover-lift">
        <CardContent className="p-6 relative">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
              <h3 className="text-2xl font-semibold">{value}</h3>
              
              {change && (
                <p className={cn(
                  "text-xs font-medium flex items-center mt-1",
                  change.positive ? "text-green-600" : "text-red-600"
                )}>
                  <span className="mr-1">
                    {change.positive ? '↑' : '↓'}
                  </span>
                  {change.value}
                </p>
              )}
            </div>
            
            <div className={cn(
              "rounded-full p-2",
              color
            )}>
              <Icon className="h-5 w-5" />
            </div>
          </div>
          
          <div 
            className={cn(
              "absolute bottom-0 left-0 h-1 w-full opacity-20",
              color.split(' ')[0]
            )}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
