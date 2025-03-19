
import { LoginCard } from '@/components/auth/LoginCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  // Skip authentication - instantly redirect to Dashboard
  useEffect(() => {
    // This will redirect to dashboard immediately
    navigate('/', { replace: true });
  }, [navigate]);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 backdrop-blur-lg p-4">
      <div className="text-center">
        <p>Redirecting to Dashboard...</p>
      </div>
    </div>
  );
  
  /* Original code commented out
  const { isLoading, isAuthenticated } = useAuth();
  const [showSkeleton, setShowSkeleton] = useState(true);
  
  useEffect(() => {
    console.log('Login page - auth state:', { isLoading, isAuthenticated });
    
    // Only show skeleton for a maximum of 3 seconds to prevent infinite loading
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [isLoading, isAuthenticated]);
  
  // If loading has taken too long or finished, show the login form
  const shouldShowLoginForm = !isLoading || !showSkeleton;
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 backdrop-blur-lg p-4">
      {isLoading && showSkeleton ? (
        <div className="w-full max-w-md">
          <Skeleton className="h-[450px] w-full rounded-lg" />
        </div>
      ) : (
        <LoginCard />
      )}
    </div>
  );
  */
}
