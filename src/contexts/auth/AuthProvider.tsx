
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { AuthContext } from './AuthContext';

// Mock Auth Provider that bypasses all auth checks
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Create mock data 
  const mockUser = { id: '123', email: 'demo@example.com' } as User;
  const mockSession = { user: mockUser } as Session;
  
  const [session] = useState<Session | null>(mockSession);
  const [user] = useState<User | null>(mockUser);
  const [userRole] = useState<string | null>('Admin');
  const [isLoading] = useState(false);
  const navigate = useNavigate();

  console.log('Using mock auth provider - all auth checks bypassed');

  // Mock auth functions that do nothing significant
  const signIn = async () => {
    toast.success('Mock sign in successful');
    navigate('/');
    return mockUser;
  };

  const signUp = async () => {
    toast.success('Mock sign up successful');
    return { user: mockUser, session: mockSession };
  };

  const signOut = async () => {
    toast.success('Mock sign out successful');
    navigate('/login');
  };

  const createSuperAdmin = async () => {
    toast.success('Mock super admin created');
    return mockUser;
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userRole,
        isLoading,
        signIn,
        signUp,
        signOut,
        isAuthenticated: true, // Always authenticated
        createSuperAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
