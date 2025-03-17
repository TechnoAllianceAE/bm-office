
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'glass' | 'neomorphic' | 'default';
  animate?: boolean;
  animationDelay?: number;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  animate = true,
  animationDelay = 0,
  onClick,
}) => {
  const getCardClasses = (): string => {
    switch (variant) {
      case 'glass':
        return 'glass-card';
      case 'neomorphic':
        return 'neomorphic';
      default:
        return 'bg-card border shadow-sm';
    }
  };

  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden',
        getCardClasses(),
        animate && 'opacity-0 animate-scale-in',
        onClick && 'cursor-pointer',
        className
      )}
      style={animate ? { animationDelay: `${animationDelay}ms` } : undefined}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
