
import { LoginCard } from '@/components/auth/LoginCard';
import { useAuth } from '@/contexts/auth/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';

export default function Login() {
  const { isLoading, isAuthenticated } = useAuth();
  
  useEffect(() => {
    console.log('Login page - auth state:', { isLoading, isAuthenticated });
  }, [isLoading, isAuthenticated]);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 backdrop-blur-lg p-4">
      {isLoading ? (
        <div className="w-full max-w-md">
          <Skeleton className="h-[450px] w-full rounded-lg" />
        </div>
      ) : (
        <LoginCard />
      )}
    </div>
  );
}
