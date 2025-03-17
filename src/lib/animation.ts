
/**
 * Animation utility functions for the GlobalHub intranet system
 */

type StaggerConfig = {
  /** The base delay in milliseconds */
  baseDelay?: number;
  /** The increment in milliseconds between each item */
  increment?: number;
  /** The maximum delay in milliseconds */
  maxDelay?: number;
};

/**
 * Creates staggered animation delay values for a list of items
 */
export function createStaggeredDelay(
  index: number, 
  { baseDelay = 50, increment = 50, maxDelay = 500 }: StaggerConfig = {}
): string {
  const delay = Math.min(baseDelay + (index * increment), maxDelay);
  return `${delay}ms`;
}

/**
 * Hook to track elements in viewport for triggering animations
 */
export const animateOnScroll = (element: HTMLElement | null, animationClass: string): void => {
  if (!element) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(animationClass);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(element);
};

/**
 * Easing functions for animations
 */
export const easings = {
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  easeOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
  easeOutExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
  easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  easeInOutQuart: 'cubic-bezier(0.77, 0, 0.175, 1)',
  easeInOutQuint: 'cubic-bezier(0.86, 0, 0.07, 1)',
  easeInOutExpo: 'cubic-bezier(0.87, 0, 0.13, 1)',
};
