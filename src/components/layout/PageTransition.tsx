
import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.pathname}
        timeout={400}
        classNames="page"
        unmountOnExit
      >
        {() => (
          <div className="page">
            {children}
          </div>
        )}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PageTransition;
