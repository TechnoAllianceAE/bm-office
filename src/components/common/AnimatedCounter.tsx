
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1000,
  prefix = '',
  suffix = '',
  className,
  decimals = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const startTime = useRef<number | null>(null);
  const endValue = useRef(value);

  useEffect(() => {
    startTime.current = null;
    endValue.current = value;
    
    const animateCount = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = timestamp - startTime.current;
      
      if (progress < duration) {
        const currentCount = easeOutQuart(progress, 0, value, duration);
        setDisplayValue(currentCount);
        requestAnimationFrame(animateCount);
      } else {
        setDisplayValue(value);
      }
    };
    
    requestAnimationFrame(animateCount);
  }, [value, duration]);
  
  // Easing function for smooth animation
  const easeOutQuart = (t: number, b: number, c: number, d: number) => {
    t /= d;
    t--;
    return c * (t * t * t * t * t + 1) + b;
  };

  return (
    <span className={cn("inline-block", className)} ref={countRef}>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
