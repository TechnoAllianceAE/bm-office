
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

  // Function to fetch and set user role
  const getUserRole = async (userId: string) => {
    console.log('Fetching role for user:', userId);
    const role = await fetchUserRole(userId);
    console.log('User role retrieved:', role);
    setUserRole(role);
    return role;
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        getUserRole(session.user.id)
          .then(() => setIsLoading(false))
          .catch((error) => {
            console.error('Error fetching user role on init:', error);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
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

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { user } = await signInWithCredentials(email, password);
      
      if (user) {
        // Explicitly check for Super Admin status
        const userRole = await getUserRole(user.id);
        console.log('User role after sign in:', userRole);
        
        toast.success('Login successful', {
          description: userRole === 'Super Admin' 
            ? 'Welcome, Super Admin!' 
            : 'Welcome back!'
        });
      } else {
        toast.success('Login successful');
      }
      
      navigate('/');
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
      await signUpWithCredentials(email, password, fullName);
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
      
      // First, clear local state regardless of API call outcome
      setSession(null);
      setUser(null);
      setUserRole(null);
      
      // Then attempt to sign out from Supabase
      await signOutUser();
      
      // Return success - user is considered signed out locally regardless of API result
      return;
    } catch (error) {
      console.error('Error in signOut function:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createSuperAdmin = async (email: string, password: string, fullName: string) => {
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
