
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AuthContext } from './AuthContext';
import {
  fetchUserRole,
  signInWithCredentials,
  signUpWithCredentials,
  signOutUser,
  createSuperAdminUser,
  checkSuperAdminStatus
} from '@/utils/authUtils';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getUserRole = async (userId: string) => {
    console.log('Fetching role for user:', userId);
    try {
      const role = await fetchUserRole(userId);
      console.log('User role retrieved:', role);
      
      if (role) {
        setUserRole(role);
        return role;
      } else {
        console.warn('No role found for user:', userId);
        setUserRole('User'); // Default to User role
        return 'User';
      }
    } catch (error) {
      console.error('Error in getUserRole:', error);
      setUserRole('User'); // Default to User role
      return 'User';
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Initial session retrieved:', session?.user?.id);
        
        if (session?.user) {
          setSession(session);
          setUser(session.user);
          await getUserRole(session.user.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setIsLoading(true);
          try {
            await getUserRole(session.user.id);
          } catch (error) {
            console.error('Error fetching user role on auth change:', error);
          } finally {
            setIsLoading(false);
          }
        } else {
          setUserRole(null);
          setIsLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<User | null> => {
    try {
      setIsLoading(true);
      const { user } = await signInWithCredentials(email, password);
      
      if (user) {
        await getUserRole(user.id);
        
        toast.success('Login successful', {
          description: userRole === 'Super Admin' 
            ? 'Welcome, Super Admin!' 
            : 'Welcome back!'
        });
      } else {
        toast.success('Login successful');
      }
      
      navigate('/');
      return user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setIsLoading(true);
      const result = await signUpWithCredentials(email, password, fullName);
      return result;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await signOutUser();
      setSession(null);
      setUser(null);
      setUserRole(null);
      navigate('/login');
    } catch (error) {
      console.error('Error in signOut function:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createSuperAdmin = async (email: string, password: string, fullName: string): Promise<User> => {
    try {
      setIsLoading(true);
      return await createSuperAdminUser(email, password, fullName);
    } catch (error) {
      console.error('Error creating Super Admin:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  console.log('Current auth state:', { 
    isAuthenticated: !!user, 
    userRole, 
    isLoading 
  });

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
        isAuthenticated: !!user,
        createSuperAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
